"use client";

import { useEffect, useState, useRef } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventSourceRef = useRef(null);

  // --- 状態変更 API ---
  const updateOrder = async (id, update) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });

      if (!res.ok) {
        console.error("completeOrder failed");
        return;
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...update } : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // --- 初回データ読み込み ---
  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });

    const es = new EventSource("/api/orders/stream");
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data);
        setOrders((prev) => [parsed, ...prev]);
      } catch (_) {}
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
    };

    return () => es.close();
  }, []);

  if (loading) return <p className="p-6 text-gray-700">読み込み中...</p>;

  const active = orders.filter((o) => !o.served);
  const served = orders.filter((o) => o.served);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        注文一覧（管理者）
      </h1>

      {/* -------------------- 提供待ち -------------------- */}
      <h2 className="text-xl font-bold mb-2 text-gray-900">提供待ち</h2>
      <OrderList
        list={active}
        onCookFinish={(id) => updateOrder(id, { completed: true })}
        onServeFinish={(id) => updateOrder(id, { served: true })}
      />

      {/* -------------------- 提供済み -------------------- */}
      <h2 className="text-xl font-bold mt-10 mb-2 text-gray-900">
        提供済み
      </h2>
      <OrderList list={served} disabled />
    </div>
  );
}

function OrderList({ list, onCookFinish, onServeFinish, disabled }) {
  if (list.length === 0)
    return <p className="text-gray-700">なし</p>;

  return (
    <div className="space-y-4">
      {list.map((o) => (
        <div
          key={o.id}
          className="p-4 rounded shadow border bg-white text-gray-800"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-gray-900">
                受取番号: {o.pickupNumber}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(o.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="font-bold text-gray-900">
              合計 ¥{o.total}
            </p>
          </div>

          <div className="mt-2">
            {o.cart.map((i) => (
              <div
                key={i.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {i.name} × {i.quantity}
                </span>
                <span className="text-gray-900">
                  ¥{i.price * i.quantity}
                </span>
              </div>
            ))}
          </div>

          {!disabled && (
            <div className="mt-3 text-right space-x-2">
              {!o.completed && (
                <button
                  onClick={() => onCookFinish(o.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  調理完了
                </button>
              )}

              {o.completed && !o.served && (
                <button
                  onClick={() => onServeFinish(o.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  提供完了
                </button>
              )}
            </div>
          )}

          {disabled && (
            <p className="mt-3 text-right text-green-700 font-bold">
              提供済み
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
