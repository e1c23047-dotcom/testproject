"use client";

import { useEffect, useState, useRef } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const eventSourceRef = useRef(null);

  // ---------------- 状態変更 API ----------------
  const updateOrder = async (id, update) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });

      if (!res.ok) return;

      // 即時UI反映
      setOrders((prev) =>
        prev.map((o) =>
          String(o.id) === String(id) ? { ...o, ...update } : o
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- 初回読み込み & SSE ----------------
  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data || []);
        setLoading(false);
      });

    const es = new EventSource("/api/orders/stream");
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      try {
        const order = JSON.parse(e.data);
        setOrders((prev) => [order, ...prev]);
      } catch {}
    };

    return () => es.close();
  }, []);

  if (loading) return <p className="p-6">読み込み中...</p>;

  // ---------------- 当日の開始時刻 ----------------
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // ---------------- 状態別配列 ----------------
  const activeOrders = orders.filter((o) => !o.served);

  const servedOrdersToday = orders.filter((o) => {
    if (!o.served) return false;
    const createdAt = new Date(o.createdAt);
    return createdAt >= startOfToday;
  });

  // 提供待ち件数
  const activeCount = activeOrders.length;

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        注文一覧（管理者）
      </h1>

      {/* ---------------- タブ ---------------- */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSelectedStatus("all")}
          className={`px-4 py-2 rounded ${
            selectedStatus === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          すべて
        </button>

        <button
          onClick={() => setSelectedStatus("active")}
          className={`px-4 py-2 rounded ${
            selectedStatus === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          提供待ち ({activeCount})
        </button>

        <button
          onClick={() => setSelectedStatus("served")}
          className={`px-4 py-2 rounded ${
            selectedStatus === "served"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          提供済み（当日）
        </button>
      </div>

      {/* ---------------- 表示切替 ---------------- */}
      {selectedStatus === "all" ? (
        <>
          {/* 提供待ち */}
          <h2 className="text-xl font-bold mb-2">
            提供待ち ({activeCount})
          </h2>
          <OrderList
            list={activeOrders}
            onCookFinish={(id) => updateOrder(id, { completed: true })}
            onServeFinish={(id) => updateOrder(id, { served: true })}
            disabled={false}
          />

          {/* 提供済み（当日） */}
          <h2 className="text-xl font-bold mt-10 mb-2">
            提供済み（当日）
          </h2>
          <OrderList list={servedOrdersToday} disabled />
        </>
      ) : selectedStatus === "active" ? (
        <OrderList
          list={activeOrders}
          onCookFinish={(id) => updateOrder(id, { completed: true })}
          onServeFinish={(id) => updateOrder(id, { served: true })}
          disabled={false}
        />
      ) : (
        <OrderList list={servedOrdersToday} disabled />
      )}
    </div>
  );
}

// ---------------- 注文リスト ----------------
function OrderList({ list, onCookFinish, onServeFinish, disabled }) {
  if (list.length === 0) return <p>なし</p>;

  return (
    <div className="space-y-4">
      {list.map((o) => (
        <div key={o.id} className="p-4 rounded shadow border bg-white">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">受取番号: {o.pickupNumber}</p>
              <p className="text-sm text-gray-600">
                {new Date(o.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="font-bold">合計 ¥{o.total}</p>
          </div>

          <div className="mt-2">
            {o.cart.map((i) => (
              <div key={i.id} className="flex justify-between">
                <span>
                  {i.name} × {i.quantity}
                </span>
                <span>¥{i.price * i.quantity}</span>
              </div>
            ))}
          </div>

          {!disabled && (
            <div className="mt-3 text-right space-x-2">
              {!o.completed && (
                <button
                  onClick={() => onCookFinish(o.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  調理完了
                </button>
              )}

              {o.completed && !o.served && (
                <button
                  onClick={() => onServeFinish(o.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
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
