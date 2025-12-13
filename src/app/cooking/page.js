"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";

export default function CookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const orderId = Number(params.get("orderId"));

  // ⭐ ① cooking に入った瞬間にカートを空にする
  useEffect(() => {
    if (!orderId || cart.length === 0) return;
    clearCart();
  }, [orderId]);

  // ⭐ ② 調理完了ポーリング
  useEffect(() => {
    if (!orderId) return;

    const timer = setInterval(async () => {
      const res = await fetch("/api/orders");
      const orders = await res.json();

      const order = orders.find((o) => o.id === orderId);
      if (order && order.completed) {
        router.push(`/thanks?pickupNumber=${order.pickupNumber}`);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [orderId, router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold">調理中です…</h1>
      <p>料理が完成するまでしばらくお待ちください。</p>
    </div>
  );
}
