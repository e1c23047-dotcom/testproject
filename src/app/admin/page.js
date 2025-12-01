"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ログインチェック
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (!loggedIn) router.push("/admin/login");
  }, [router]);

  // 注文取得
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  if (loading) return <p className="text-blue-700 p-6">注文情報を読み込み中...</p>;

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">注文一覧（管理者用）</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          ログアウト
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-blue-700">まだ注文はありません。</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.pickupNumber}
            className="mb-4 p-4 bg-white rounded-lg shadow border border-blue-200"
          >
            <p className="font-bold text-blue-800 mb-2">
              受付番号: {order.pickupNumber}
            </p>
            <p className="text-sm text-blue-600 mb-2">
              注文日時: {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className="mb-2">
              {order.cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>¥{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <p className="font-bold text-blue-700">合計：¥{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}
