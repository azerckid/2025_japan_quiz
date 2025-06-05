"use client";

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
    const [hintSavedForWord, setHintSavedForWord] = useState<Record<number, boolean>>({});
    const [dayWrongCount, setDayWrongCount] = useState<{ [day: string]: number }>({});

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

    // 힌트가 열릴 때 오답 저장
    useEffect(() => {
        if (showHint && word && userId && !hintSavedForWord[word.id]) {
            saveWrongAnswer({ userId, wordId: word.id, hintUsed: true });
            setHintSavedForWord((prev) => ({ ...prev, [word.id]: true }));
        }
    }, [showHint, word, userId, hintSavedForWord]);

    // 단어가 바뀌면 힌트 저장 플래그 초기화
    useEffect(() => {
        setShowHint(false);
        if (word && hintSavedForWord[word.id]) {
            setHintSavedForWord((prev) => {
                const copy = { ...prev };
                delete copy[word.id];
                return copy;
            });
        }
    }, [word]);

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
            setTimeout(() => {
                setInput("");
                setCorrect(null);
                setShowHint(false);
                if (retryMode) {
                    // 오답 재도전 모드에서는 wrongList가 갱신되므로 current를 0으로
                    setCurrent(0);
                } else if (current + 1 < setWordsArr.length) {
                    setCurrent((prev) => prev + 1);
                } else {
                    setShowSetEnd(true);
                }
            }, 800);
        } else {
            setCorrect(false);
            playSound("wrong");
            if (!retryMode) {
                setWrongList((prev) =>
                    prev.some((w) => w.korean === word.korean) ? prev : [...prev, word]
                );
            }
            // 오답 저장
            console.log("[handleSubmit] 오답 저장 시도", { userId, wordId: word.id, hintUsed: false });
            await saveWrongAnswer({ userId, wordId: word.id, hintUsed: false });
            setTimeout(() => {
                setInput("");
                setCorrect(null);
                setShowHint(false);
                if (retryMode) {
                    // 오답 재도전 모드에서는 다음 오답으로 이동
                    if (current + 1 < setWordsArr.length) {
                        setCurrent((prev) => prev + 1);
                    } else {
                        setCurrent(0); // 마지막까지 풀었으면 다시 처음부터 남은 오답 반복
                    }
                } else if (current + 1 < setWordsArr.length) {
                    setCurrent((prev) => prev + 1);
                } else {
                    setShowSetEnd(true);
                }
            }, 800);
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

    async function handleRetryWrongByDay(day: string) {
        setCurrent(0);
        setShowSetEnd(false);
        setRetryMode(true);
        // 오답 복습용 데이터 불러오기
        const wrongAnswers = await fetchWrongAnswers(userId);
        // 해당 DAY의 오답만 필터링
        const filtered = wrongAnswers.filter((a: any) => a.word.title.includes(day));
        setWrongList(filtered.map((a: any) => ({ ...a.word, wrongAnswerId: a.id })));
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

    async function fetchDayWrongCounts() {
        const wrongAnswers = await fetchWrongAnswers(userId);
        const counts: { [day: string]: number } = {};
        wrongAnswers.forEach((a: any) => {
            const match = a.word.title.match(/DAY \d+/);
            if (match) {
                const day = match[0];
                counts[day] = (counts[day] || 0) + 1;
            }
        });
        setDayWrongCount(counts);
    }

    useEffect(() => {
        if (userId) fetchDayWrongCounts();
    }, [userId]);

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
        handleRetryWrong,
        handleRetryWrongByDay,
        handleNextSet,
        handleRestart,
        handleGoToSet,
        progressValue: retryMode ? (current / (setWordsArr.length || 1)) * 100 : ((setIndex * SET_SIZE + current) / (filteredWords.length || 1)) * 100,
        SET_SIZE,
        ttsEnabled,
        setTtsEnabled,
        dayList,
        setDayList,
        selectedDay,
        setSelectedDay,
        showHint,
        setShowHint,
        dayWrongCount,
        fetchDayWrongCounts,
    };
}

async function fetchWords() {
    const res = await fetch("/api/quiz-words");
    if (!res.ok) throw new Error("Failed to fetch words");
    return res.json();
} 