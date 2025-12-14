"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // 受け取り番号（ランダム）
  const pickupNumber = Math.floor(Math.random() * 900) + 100;

  const handleConfirm = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          total,
          pickupNumber,
          date: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("注文送信エラー:", data?.error);
        return;
      }

      // ← POST から返ってきた orderId を使用！
      const orderId = data.id;

      // カートを空にする
      clearCart();

      // cooking ページに遷移
      router.push(`/cooking?orderId=${orderId}`);

    } catch (err) {
      console.error("注文送信エラー:", err);
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-blue-700">注文内容の確認</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-3">
          <p>{item.name} × {item.quantity}</p>
          <p>¥{item.quantity * item.price}</p>
        </div>
      ))}

      <p className="font-bold text-lg mt-4 text-blue-800">
        合計：¥{total}
      </p>

      <div className="flex gap-4 mt-6">

        {/* ホームに戻る */}
        <Link
          href="/"
          className="flex-1 bg-blue-500 text-white py-3 text-center rounded-lg"
        >
          ホームに戻る
        </Link>

        {/* 注文確定ボタン */}
        <button
          onClick={handleConfirm}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg"
        >
          注文を確定する
        </button>

      </div>
    </div>
  );
}
