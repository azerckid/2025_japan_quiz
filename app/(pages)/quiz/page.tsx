"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

async function fetchWords() {
  const res = await fetch("/api/quiz-words");
  if (!res.ok) throw new Error("Failed to fetch words");
  return res.json();
}

export default function Quiz() {
  const [words, setWords] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWords().then((data) => {
      setWords(data);
      setLoading(false);
    });
    
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!words.length) return <div>단어가 없습니다.</div>;

  const word = words[current];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (word.japanese.includes(input.trim())) {
      setCorrect(true);
      setTimeout(() => {
        setInput("");
        setCorrect(null);
        setCurrent((prev) => (prev + 1 < words.length ? prev + 1 : 0));
      }, 800);
    } else {
      setCorrect(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4"><b>{word.korean}</b></h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border px-2 py-1 rounded"
          placeholder="일본어로 입력하세요"
        />
        <Button type="submit" className="btn-primary">제출</Button>
      </form>
      {correct === true && <div className="text-green-600 mt-2">정답!</div>}
      {correct === false && <div className="text-red-600 mt-2">오답입니다.</div>}
      <div className="mt-8 text-gray-400 text-sm">{current + 1} / {words.length}</div>
    </div>
  );
}