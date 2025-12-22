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

  if (loading) return <p className="p-6 text-black">読み込み中...</p>;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const activeOrders = orders
    .filter((o) => !o.served)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const servedOrdersToday = orders
    .filter((o) => o.served && new Date(o.createdAt) >= startOfToday)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const activeCount = activeOrders.length;

  return (
    <div className="p-6 bg-blue-50 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">
        注文一覧（管理者）
      </h1>

      {/* タブ */}
      <div className="flex gap-3 mb-6">
        {[
          { key: "all", label: "すべて" },
          { key: "active", label: `提供待ち (${activeCount})` },
          { key: "served", label: "提供済み（当日）" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setSelectedStatus(t.key)}
            className={`px-4 py-2 rounded ${
              selectedStatus === t.key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {selectedStatus === "all" ? (
        <>
          <h2 className="text-xl font-bold mb-2">
            提供待ち ({activeCount})
          </h2>
          <OrderList
            list={activeOrders}
            onCookFinish={(id) => updateOrder(id, { completed: true })}
            onServeFinish={(id) => updateOrder(id, { served: true })}
          />

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
        />
      ) : (
        <OrderList list={servedOrdersToday} disabled />
      )}
    </div>
  );
}

// ---------------- 注文リスト ----------------
function OrderList({ list, onCookFinish, onServeFinish, disabled }) {
  if (list.length === 0) return <p className="text-black">なし</p>;

  return (
    <div className="space-y-4">
      {list.map((o) => (
        <div
          key={o.id}
          className="p-4 rounded shadow border bg-white text-black"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-bold">
                受取番号: {o.pickupNumber}
              </p>
              <p className="text-sm text-black">
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
            <p className="mt-3 text-right font-bold text-black">
              提供済み
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
