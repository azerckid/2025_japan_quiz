"use client";
import QuizForm from "./QuizForm";
import QuizSetEnd from "./QuizSetEnd";
import { Progress } from "@/components/ui/progress";
import { useQuiz } from "./useQuiz";
import SetPagination from "./SetPagination";

async function fetchWords() {
  const res = await fetch("/api/quiz-words");
  if (!res.ok) throw new Error("Failed to fetch words");
  return res.json();
}

const SET_SIZE = 10;

export default function Quiz() {
  const quiz = useQuiz();

  if (quiz.loading) return <div>Loading...</div>;
  if (!quiz.words.length) return <div>단어가 없습니다.</div>;

  // 세트 종료 화면
  if (quiz.showSetEnd) {
    return (
      <>
        <QuizSetEnd
          wrongList={quiz.wrongList}
          retryMode={quiz.retryMode}
          setIndex={quiz.setIndex}
          words={quiz.words}
          handleRetryWrong={quiz.handleRetryWrong}
          handleNextSet={quiz.handleNextSet}
          handleRestart={quiz.handleRestart}
          SET_SIZE={quiz.SET_SIZE}
        />
        {!quiz.retryMode && <SetPagination {...quiz} />}
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen gap-4 mt-10">
      {/* Progress bar */}
      {!quiz.retryMode && (
        <div className="w-80 mb-2">
          <Progress value={quiz.progressValue} />
        </div>
      )}
      <QuizForm
        word={quiz.word}
        input={quiz.input}
        setInput={quiz.setInput}
        handleSubmit={quiz.handleSubmit}
        correct={quiz.correct}
        ttsEnabled={quiz.ttsEnabled}
        setTtsEnabled={quiz.setTtsEnabled}
      />
      <div className="mt-8 text-gray-400 text-sm">
        {quiz.retryMode
          ? `오답 재도전 ${quiz.current + 1} / ${quiz.setWordsArr.length}`
          : `세트 ${quiz.setIndex + 1} - ${quiz.current + 1} / ${quiz.setWordsArr.length}`}
      </div>
      {!quiz.retryMode && <SetPagination {...quiz} />}
    </div>
  );
}