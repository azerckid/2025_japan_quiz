import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

async function fetchWrongAnswers(userId: number) {
  if (!userId) return [];
  const res = await fetch(`/api/wrong-answers?userId=${userId}`);
  return await res.json();
}

export default function QuizSetEnd({
  wrongList,
  retryMode,
  setIndex,
  words,
  handleRetryWrong,
  handleNextSet,
  handleRestart,
  SET_SIZE,
}: {
  wrongList: any[];
  retryMode: boolean;
  setIndex: number;
  words: any[];
  handleRetryWrong: () => void;
  handleNextSet: () => void;
  handleRestart: () => void;
  SET_SIZE: number;
}) {
  const [alwaysWrongList, setAlwaysWrongList] = useState<any[]>(wrongList);
  useEffect(() => {
    const userId = Number(typeof window !== "undefined" ? localStorage.getItem("userId") : 0);
    fetchWrongAnswers(userId).then((data) => setAlwaysWrongList(data.map((a: any) => a.word)));
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-6 mt-10">
      <h2 className="text-3xl font-bold">세트 완료!</h2>
      <div>오답 개수: {alwaysWrongList.length}</div>
      <div className="flex gap-4 mt-4">
        {!retryMode && alwaysWrongList.length > 0 && (
          <Button onClick={handleRetryWrong} className="btn-primary">오답만 다시 풀기</Button>
        )}
        {!retryMode && (setIndex + 1) * SET_SIZE < words.length && (
          <Button onClick={handleNextSet} className="btn-primary">다음 세트</Button>
        )}
        {(retryMode || (setIndex + 1) * SET_SIZE >= words.length) && (
          <Button onClick={handleRestart} className="btn-primary">처음부터 다시</Button>
        )}
      </div>
      {alwaysWrongList.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          오답 목록: {alwaysWrongList.map(w => w.korean).join(", ")}
        </div>
      )}
    </div>
  );
} 