"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";

export default function CookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const movedRef = useRef(false);

  const orderId = params.get("orderId"); // ★ string

  useEffect(() => {
    if (!orderId || cart.length === 0) return;
    clearCart();
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;

    const timer = setInterval(async () => {
      const res = await fetch("/api/orders", { cache: "no-store" });
      const orders = await res.json();

      const order = orders.find(
        (o) => String(o.id) === String(orderId)
      );
      console.log("orderId:", orderId);
      console.log("found order:", order);

      if (order && order.completed && !movedRef.current) {
        movedRef.current = true;
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
