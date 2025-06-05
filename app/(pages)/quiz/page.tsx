"use client";

import { Progress } from "@/components/ui/progress";
import { useQuiz } from "./components/useQuiz";
import SetPagination from "./components/SetPagination";
import QuizForm from "./components/QuizForm";
import QuizSetEnd from "./components/QuizSetEnd";

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
      {quiz.dayList.map((day: string) => {
        const hasWrong = (quiz.dayWrongCount?.[day] ?? 0) > 0;
        return (
          <div key={day} className="flex items-center gap-1">
            <button
              className={`px-4 py-2 rounded font-bold transition ${quiz.selectedDay === day
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
              onClick={() => quiz.setSelectedDay(day)}
            >
              {day}
            </button>
            <button
              className="px-3 py-2 rounded font-bold bg-red-200 text-red-700 hover:bg-red-300 disabled:opacity-50"
              onClick={async () => {
                await quiz.handleRetryWrongByDay(day);
                if ((quiz.dayWrongCount?.[day] ?? 0) === 0) {
                  alert('해당 DAY에 오답이 없습니다.');
                }
              }}
              disabled={!hasWrong}
            >
              오답풀기
            </button>
          </div>
        );
      })}
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
          selectedDay={quiz.selectedDay}
        />
        {!quiz.retryMode && <SetPagination {...quiz} />}
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen gap-4 mt-10">
      <DaySelector />
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
      {/* Progress bar */}
      {!quiz.retryMode && (
        <div className="w-80 mb-2">
          <Progress value={quiz.progressValue} />
        </div>
      )}
      {!quiz.retryMode && <SetPagination {...quiz} />}
    </div>
  );
}