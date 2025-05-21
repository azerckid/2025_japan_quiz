"use client";
import QuizForm from "./QuizForm";
import QuizSetEnd from "./QuizSetEnd";
import { Progress } from "@/components/ui/progress";
import { useQuiz } from "./useQuiz";
import SetPagination from "./SetPagination";

function WrongList({ wrongList }: { wrongList: any[] }) {
  if (!wrongList.length) return null;
  return (
    <div className="mt-6 w-full max-w-xl mx-auto">
      <div className="font-bold text-gray-700 mb-2">현재 오답 목록 ({wrongList.length}):</div>
      <div className="flex flex-wrap gap-2">
        {wrongList.map((w, i) => (
          <span key={w.id || w.korean || i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
            {w.korean} {w.english?.[0] ? `(${w.english[0]})` : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Quiz() {
  const quiz = useQuiz();

  if (quiz.loading) return <div>Loading...</div>;
  if (!quiz.filteredWords.length) return <div>단어가 없습니다.</div>;

  // DAY 선택 버튼 UI
  const DaySelector = () => (
    <div className="flex gap-2 mb-4 justify-center">
      {quiz.dayList.map((day: string) => (
        <button
          key={day}
          className={`px-4 py-2 rounded font-bold transition ${quiz.selectedDay === day
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          onClick={() => quiz.setSelectedDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );

  // 세트 종료 화면
  if (quiz.showSetEnd) {
    return (
      <>
        <DaySelector />
        <QuizSetEnd
          wrongList={quiz.wrongList}
          retryMode={quiz.retryMode}
          setIndex={quiz.setIndex}
          words={quiz.filteredWords}
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
      <DaySelector />
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
        showHint={quiz.showHint}
        setShowHint={quiz.setShowHint}
      />
      {/* 오답 목록 항상 표시 */}
      <WrongList wrongList={quiz.wrongList} />
      <div className="mt-8 text-gray-400 text-sm">
        {quiz.retryMode
          ? `오답 재도전 ${quiz.current + 1} / ${quiz.setWordsArr.length}`
          : `세트 ${quiz.setIndex + 1} - ${quiz.current + 1} / ${quiz.setWordsArr.length}`}
      </div>
      {!quiz.retryMode && <SetPagination {...quiz} />}
    </div>
  );
}