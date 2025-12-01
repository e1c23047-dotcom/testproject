"use client";

import { useState } from "react";

export default function OrderPage() {
  const [message, setMessage] = useState("");

  const handleOrder = () => {
    setMessage("購入しました！");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6">注文画面</h1>

      <button
        onClick={handleOrder}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-700"
      >
        購入
      </button>

      {message && (
        <p className="mt-6 text-2xl text-green-600 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}
