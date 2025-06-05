"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { playSound, speakJapanese } from "./ttsUtils";

export default function QuizForm({ word, input, setInput, handleSubmit, correct, ttsEnabled, setTtsEnabled, showHint, setShowHint }: {
  word: any;
  input: string;
  setInput: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  correct: boolean | null;
  ttsEnabled: boolean;
  setTtsEnabled: (v: boolean) => void;
  showHint: boolean;
  setShowHint: (v: boolean) => void;
}) {

  // word가 바뀔 때마다 힌트 숨기기
  useEffect(() => {
    setShowHint(false);
  }, [word, setShowHint]);

  if (!word) return <div className="text-center text-gray-500 text-xl">오답이 없습니다.</div>;

  return (
    <>
      <h2 className="text-9xl mb-4"><b>{word.kanzi[0]}</b></h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="flex flex-row items-center w-[36rem]">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="px-4 py-3 text-6xl w-[36rem] text-center focus:outline-none"
            placeholder=""
            style={{ borderBottom: "2px solid #000", fontFamily: "Noto Sans JP", fontWeight: "bold", color: "pink" }}

          />
          {/* <Button type="submit" className="btn-primary ml-2">제출</Button> */}
        </div>
        {correct === true && <div className="text-green-600 mt-2">정답!： {word.korean}</div>}
        {correct === false && <div className="text-red-600 mt-2">오답입니다.</div>}
        {showHint && (
          <div className="mt-2 text-blue-600 text-xl">정답: {word.japanese.join(", ")}</div>
        )}
        {!showHint && (
          <>
            {/* <div className="mt-2 text-blue-600 text-xl">타이틀: {word.title}</div>
            <div className="mt-2 text-blue-600 text-xl">챕터: {word.chapter}</div>
            <div className="mt-2 text-blue-600 text-xl">난이도: {word.level}</div>
            <div className="mt-2 text-blue-600 text-xl">품사: {word.wordClass}</div> */}
          </>
        )}
        <div className="flex gap-2">
          {/* <Button
            type="button"
            variant={ttsEnabled ? "default" : "outline"}
            onClick={() => setTtsEnabled(!ttsEnabled)}
          >
            {ttsEnabled ? "🔊 TTS ON" : "🔇 TTS OFF"}
          </Button> */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "힌트 닫기" : "힌트 보기"}
          </Button>
        </div>
      </form>

    </>
  );
} 