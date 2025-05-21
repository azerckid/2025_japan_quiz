"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("userId")) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 >Tango Time</h1>
      <Link href="/quiz">
        <Button variant="outline">
          start
        </Button>
      </Link>
    </div>
  );
}
