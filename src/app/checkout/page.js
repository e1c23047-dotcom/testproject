"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { usePayment } from "../../../context/PaymentContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { paymentType, codeBrand, cardInfo } = usePayment();

  const [ready, setReady] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const pickupNumber = Math.floor(Math.random() * 900) + 100;

  // --- ガード ---
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
      return;
    }
    if (!paymentType) {
      router.push("/payment");
      return;
    }
    if (paymentType === "code" && !codeBrand) {
      router.push("/payment");
      return;
    }
    if (paymentType === "credit" && !cardInfo?.number) {
      router.push("/payment");
      return;
    }
    setReady(true);
  }, [cart, paymentType, codeBrand, cardInfo, router]);

  if (!ready) {
    return <p className="p-6">読み込み中...</p>;
  }

  // --- 表示用 ---
  const paymentLabel =
    paymentType === "credit" ? "クレジットカード" : "コード決済";

  const codeLabelMap = {
    pay: "PayPay",
    au: "au PAY",
    rakuten: "楽天Pay",
  };

  const maskedCardNumber = cardInfo?.number
    ? `**** **** **** ${cardInfo.number.slice(-4)}`
    : "";

  // --- 注文確定 ---
  const handleConfirm = async () => {
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          total,
          paymentType,
          codeBrand,
          cardLast4: cardInfo?.number?.slice(-4),
          pickupNumber,
          date: new Date().toISOString(),
        }),
      });

    } catch (err) {
      console.error("注文送信エラー:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h1 className="text-xl font-bold mb-6">注文内容の確認</h1>

      {/* --- 商品一覧 --- */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-bold mb-3">商品</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-1 text-sm"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>¥{item.price * item.quantity}</span>
          </div>
        ))}

        <p className="font-bold text-right mt-3">
          合計：¥{total}
        </p>
      </div>

      {/* --- 支払い方法 --- */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-bold mb-3">支払い方法</h2>

        <p className="mb-1">
          <span className="font-semibold">方法：</span>
          {paymentLabel}
        </p>

        {paymentType === "code" && (
          <p>
            <span className="font-semibold">種類：</span>
            {codeLabelMap[codeBrand]}
          </p>
        )}

        {paymentType === "credit" && (
          <p>
            <span className="font-semibold">カード番号：</span>
            {maskedCardNumber}
          </p>
        )}
      </div>

      {/* --- ボタン（※あなた指定の構成を維持） --- */}
      <div className="flex gap-4 mt-6">
        {/* 左：ホームに戻る */}
        <Link
          href="/"
          className="flex-1 bg-blue-500 text-white py-3 text-center rounded-lg hover:bg-blue-600"
        >
          ホームに戻る
        </Link>

        {/* 右：注文確定 */}
        <Link
          href={{
            pathname: "/cooking",
            query: { orderId: Date.now() },
          }}
          onClick={handleConfirm}
          className="flex-1 bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600"
        >
          注文を確定する
        </Link>
      </div>
    </div>
  );
}
