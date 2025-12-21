"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThanksPage() {
  const searchParams = useSearchParams();
  const pickupNumber = searchParams.get("pickupNumber");

  return (
    <div className="p-6 text-center bg-[#e8f6ff] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#1e3a8a]">
        ご注文ありがとうございました！
      </h1>

      {pickupNumber ? (
        <p className="mb-4 text-lg text-[#3c4f76]">
          受け取り番号:{" "}
          <span className="font-bold text-[#2563eb] text-xl bg-white px-3 py-1 rounded-md shadow">
            {pickupNumber}
          </span>
        </p>
      ) : null}

      <p className="mb-6 text-[#3c4f76]">
        料理が完成しました。食堂で商品をお受け取りください。
      </p>

      <Link
        href="/"
        className="block w-full bg-[#3da9fc] hover:bg-[#0f8be6] text-white py-3 text-center rounded-lg"
      >
        ホームに戻る
      </Link>
    </div>
  );
}