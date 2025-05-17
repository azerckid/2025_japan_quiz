export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      {children}
    </div>
  );
}
