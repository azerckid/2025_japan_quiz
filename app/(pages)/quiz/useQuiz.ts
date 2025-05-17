import { useEffect, useState } from "react";
import { playSound, speakJapanese } from "./ttsUtils";

const SET_SIZE = 10;

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

    useEffect(() => {
        fetchWords().then((data) => {
            setWords(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (retryMode && wrongList.length === 0) {
            setShowSetEnd(true);
        }
    }, [retryMode, wrongList]);

    const totalSets = Math.ceil(words.length / SET_SIZE);
    const setWordsArr = retryMode
        ? wrongList
        : words.slice(setIndex * SET_SIZE, (setIndex + 1) * SET_SIZE);
    const word = setWordsArr[current];

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (word.japanese.includes(input.trim())) {
            setCorrect(true);
            playSound("correct");
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
        }
    }

    function handleNextSet() {
        setCurrent(0);
        setShowSetEnd(false);
        setSetIndex((prev) => prev + 1);
        setWrongList([]);
        setRetryMode(false);
    }

    function handleRetryWrong() {
        setCurrent(0);
        setShowSetEnd(false);
        setRetryMode(true);
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
    };
}

async function fetchWords() {
    const res = await fetch("/api/quiz-words");
    if (!res.ok) throw new Error("Failed to fetch words");
    return res.json();
} 