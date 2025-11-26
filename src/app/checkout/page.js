"use client";

import Link from "next/link";
import { useCart } from "../../../context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const pickupNumber = Math.floor(Math.random()*900)+100;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">注文内容の確認</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-3">
          <p>{item.name} × {item.quantity}</p>
          <p>¥{item.quantity * item.price}</p>
        </div>
      ))}

      <p className="font-bold text-lg mt-4">合計：¥{total}</p>

      <div className="flex gap-4 mt-6">

  {/* 左側：ホームに戻る */}
  <Link
    href="/"
    className="flex-1 bg-red-500 text-white py-3 text-center rounded-lg"
  >
    ホームに戻る
  </Link>

  {/* 右側：注文を確定する */}
  <Link
    href={{
      pathname: "/thanks",
      query: { pickupNumber }
    }}
    onClick={() => clearCart()}
    className="flex-1 bg-red-500 text-white text-center py-3 rounded-lg"
  >
    注文を確定する
  </Link>
  </div>

    </div>
  );
}
