import { useEffect, useState } from "react";
import { playSound, speakJapanese } from "./ttsUtils";

const SET_SIZE = 10;

// 오답 저장
async function saveWrongAnswer({ userId, wordId, hintUsed = false }: { userId: number, wordId: number, hintUsed?: boolean }) {
    if (!userId || !wordId) {
        console.warn("[saveWrongAnswer] userId 또는 wordId가 유효하지 않음", { userId, wordId });
        return;
    }
    console.log("[saveWrongAnswer] 호출", { userId, wordId, hintUsed });
    const res = await fetch("/api/wrong-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, wordId, hintUsed }),
    });
    const data = await res.json().catch(() => ({}));
    console.log("[saveWrongAnswer] API 응답:", data);
}
// 오답 복습 데이터 불러오기
async function fetchWrongAnswers(userId: number) {
    if (!userId) return [];
    const res = await fetch(`/api/wrong-answers?userId=${userId}`);
    return await res.json();
}
// 오답 복습에서 맞추면 정정
async function correctWrongAnswer(wrongAnswerId: number) {
    if (!wrongAnswerId) return;
    await fetch(`/api/wrong-answer/${wrongAnswerId}`, { method: "PATCH" });
}

export function useQuiz() {
    const [words, setWords] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);
    const [input, setInput] = useState("");
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [setIndex, setSetIndex] = useState(0);
    const [wrongList, setWrongList] = useState<any[]>([]);
    const [retryMode, setRetryMode] = useState(false);
    const [showSetEnd, setShowSetEnd] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(true);
    const [dayList, setDayList] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [filteredWords, setFilteredWords] = useState<any[]>([]);
    const [wrongAnswerMap, setWrongAnswerMap] = useState<Record<number, number>>({}); // wordId -> wrongAnswerId
    const [showHint, setShowHint] = useState(false);

    const userId = Number(typeof window !== "undefined" ? localStorage.getItem("userId") : 0);

    useEffect(() => {
        fetchWords().then((data) => {
            setWords(data);
            const days = Array.from(
                new Set(
                    data
                        .map((w: any) => {
                            const match = w.title.match(/DAY \d+/);
                            return match ? match[0] : null;
                        })
                        .filter(Boolean)
                )
            ) as string[];
            setDayList(days);
            setSelectedDay(days[0] ?? "");
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (selectedDay) {
            setFilteredWords(words.filter((w) => w.title.includes(selectedDay)));
            setCurrent(0);
            setSetIndex(0);
            setWrongList([]);
            setRetryMode(false);
            setShowSetEnd(false);
            setInput("");
            setCorrect(null);
        }
    }, [selectedDay, words]);

    useEffect(() => {
        if (retryMode && wrongList.length === 0) {
            setShowSetEnd(true);
        }
    }, [retryMode, wrongList]);

    const totalSets = Math.ceil(filteredWords.length / SET_SIZE);
    const setWordsArr = retryMode
        ? wrongList
        : filteredWords.slice(setIndex * SET_SIZE, (setIndex + 1) * SET_SIZE);
    const word = setWordsArr[current];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!word) return;
        const isCorrect = word.japanese.includes(input.trim());
        if (isCorrect) {
            setCorrect(true);
            playSound("correct");
            // 힌트로 맞춘 경우 오답 저장
            if (showHint) {
                await saveWrongAnswer({ userId, wordId: word.id, hintUsed: true });
            }
            // 오답 복습에서 맞추면 정정
            if (retryMode && word.wrongAnswerId) {
                await correctWrongAnswer(word.wrongAnswerId);
                setWrongList((prev) => prev.filter((w) => w.korean !== word.korean));
            }
            // 마지막 문제일 때만 TTS 3회 (세트 완료 직전)
            if (ttsEnabled && current + 1 < setWordsArr.length) {
                setTimeout(() => {
                    let count = 0;
                    function repeatTTS() {
                        if (count < 3) {
                            speakJapanese(word.japanese[0], () => {
                                count++;
                                if (count < 2) {
                                    setTimeout(repeatTTS, 100);
                                }
                            });
                        }
                    }
                    repeatTTS();
                }, 1000);
            }
            setTimeout(() => {
                setInput("");
                setCorrect(null);
                setShowHint(false);
                if (current + 1 < setWordsArr.length) {
                    setCurrent((prev) => prev + 1);
                } else {
                    if (ttsEnabled) {
                        setTimeout(() => {
                            let count = 0;
                            function repeatTTSAndEnd() {
                                if (count < 3) {
                                    speakJapanese(word.japanese[0], () => {
                                        count++;
                                        if (count < 3) {
                                            setTimeout(repeatTTSAndEnd, 500);
                                        } else {
                                            setShowSetEnd(true);
                                        }
                                    });
                                }
                            }
                            repeatTTSAndEnd();
                        }, 1000);
                    } else {
                        setShowSetEnd(true);
                    }
                }
            }, 800);
        } else {
            setCorrect(false);
            playSound("wrong");
            setWrongList((prev) =>
                prev.some((w) => w.korean === word.korean) ? prev : [...prev, word]
            );
            // 오답 저장
            console.log("[handleSubmit] 오답 저장 시도", { userId, wordId: word.id, hintUsed: false });
            await saveWrongAnswer({ userId, wordId: word.id, hintUsed: false });
        }
    }

    async function handleRetryWrong() {
        setCurrent(0);
        setShowSetEnd(false);
        setRetryMode(true);
        // 오답 복습용 데이터 불러오기
        const wrongAnswers = await fetchWrongAnswers(userId);
        // wrongAnswers: [{ id, word, ... }]
        setWrongList(wrongAnswers.map((a: any) => ({ ...a.word, wrongAnswerId: a.id })));
    }

    function handleNextSet() {
        setCurrent(0);
        setShowSetEnd(false);
        setSetIndex((prev) => prev + 1);
        setWrongList([]);
        setRetryMode(false);
    }

    function handleRestart() {
        setCurrent(0);
        setSetIndex(0);
        setWrongList([]);
        setRetryMode(false);
        setShowSetEnd(false);
    }

    function handleGoToSet(idx: number) {
        setSetIndex(idx);
        setCurrent(0);
        setWrongList([]);
        setRetryMode(false);
        setShowSetEnd(false);
    }

    const progressValue = (current / setWordsArr.length) * 100;

    return {
        words,
        filteredWords,
        setWords,
        current,
        setCurrent,
        input,
        setInput,
        correct,
        setCorrect,
        loading,
        setIndex,
        setSetIndex,
        wrongList,
        setWrongList,
        retryMode,
        setRetryMode,
        showSetEnd,
        setShowSetEnd,
        totalSets,
        setWordsArr,
        word,
        handleSubmit,
        handleNextSet,
        handleRetryWrong,
        handleRestart,
        handleGoToSet,
        progressValue,
        SET_SIZE,
        ttsEnabled,
        setTtsEnabled,
        dayList,
        setDayList,
        selectedDay,
        setSelectedDay,
        showHint,
        setShowHint,
    };
}

async function fetchWords() {
    const res = await fetch("/api/quiz-words");
    if (!res.ok) throw new Error("Failed to fetch words");
    return res.json();
} 