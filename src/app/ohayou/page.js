"use client";
import { useRouter } from "next/navigation";

export default function Ohayou() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <h1 className="text-6xl font-bold text-black dark:text-white mb-10">
        おはよう
      </h1>
      <button
        onClick={() => router.push("/")}
        className="rounded-full bg-green-500 px-6 py-3 text-white text-lg font-semibold hover:bg-green-600 transition"
      >
        ← 次へ
      </button>
    </div>
  );
}
