"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThanksPage() {
  // URLクエリから受け取り番号を取得
  const searchParams = useSearchParams();
  const pickupNumber = searchParams.get("pickupNumber");

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">ご注文ありがとうございました！</h1>

      {pickupNumber ? (
        <p className="mb-4 text-lg">
          受け取り番号: <span className="font-bold text-blue-500">{pickupNumber}</span>
        </p>
      ) : null}

      <p className="mb-6">
        注文が完了しました。食堂で商品をお受け取りください。
      </p>

      <Link
        href="/"
        className="block w-full bg-blue-500 text-white py-3 text-center rounded-lg"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
