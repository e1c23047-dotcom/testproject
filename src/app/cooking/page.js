"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";

export default function CookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const movedRef = useRef(false);

  const orderId = params.get("orderId");

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

      if (order && order.completed && !movedRef.current) {
        movedRef.current = true;
        router.push(`/thanks?pickupNumber=${order.pickupNumber}`);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [orderId, router]);

  return (
  <div className="min-h-screen bg-[#e8f6ff] flex items-center justify-center text-center">
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a8a]">
        調理中です…
      </h1>
      <p className="text-lg text-[#3c4f76] mt-2">
        料理が完成するまでしばらくお待ちください。
      </p>
    </div>
  </div>
 );
}
