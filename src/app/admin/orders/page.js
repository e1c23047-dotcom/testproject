// src/app/admin/orders/page.js
"use client";

import { useEffect, useState, useRef } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    // 初回一覧取得
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

    // SSE 接続
    const es = new EventSource("/api/orders/stream");
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data);
        // 新着注文を先頭に追加
        setOrders((prev) => [parsed, ...prev]);
      } catch (err) {
        // サーバーからの簡易メッセージ（接続確認など）は JSON でない場合あり
        // console.log("SSE msg:", e.data);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
      // 接続が切れたら自動リトライされるのが EventSource の仕様
    };

    return () => {
      es.close();
    };
  }, []);

  if (loading) return <p className="p-6">注文を読み込み中...</p>;

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">注文一覧（管理者）</h1>

      {orders.length === 0 ? (
        <p>まだ注文はありません。</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="p-4 bg-white rounded shadow border">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">受取番号: {o.pickupNumber}</p>
                  <p className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">合計 ¥{o.total}</p>
                </div>
              </div>

              <div className="mt-2">
                {o.cart.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>{i.name} × {i.quantity}</span>
                    <span>¥{i.price * i.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
