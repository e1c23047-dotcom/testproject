"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // カート読み込み
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);

    const sum = saved.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7ff",
        padding: "2rem",
        fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "white",
          borderRadius: 18,
          padding: "2rem 2.2rem",
          boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#2e3a8c",
            marginBottom: "1.8rem",
          }}
        >
          カート
        </div>

        {/* 注文画面に戻る */}
        <div style={{ marginBottom: "1.2rem" }}>
          <Link
            href="/order"
            style={{
              color: "#326dfa",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← 注文画面に戻る
          </Link>
        </div>

        {/* カートが空の場合 */}
        {cart.length === 0 && (
          <div
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              color: "#666",
              padding: "2rem 0",
            }}
          >
            カートは空です
          </div>
        )}

        {/* 商品一覧 */}
        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem 0",
              borderBottom: "1px solid #e5e7f3",
            }}
          >
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />

            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#000" }}>
                {item.name}
              </div>
              <div style={{ color: "#555" }}>¥{item.price.toLocaleString()}</div>
            </div>
          </div>
        ))}

        {/* 合計金額 */}
        {cart.length > 0 && (
          <div
            style={{
              textAlign: "right",
              fontSize: "1.3rem",
              fontWeight: 700,
              marginTop: "1.5rem",
              color: "#2e3a8c",
            }}
          >
            合計：¥{total.toLocaleString()}
          </div>
        )}

        {cart.length > 0 && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link
              href="/checkout"
              style={{
                display: "inline-block",
                background: "linear-gradient(87deg,#326dfa 0%,#5a98f9 90%)",
                color: "white",
                padding: "0.9rem 2rem",
                borderRadius: 12,
                fontSize: "1.1rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 2px 10px rgba(50,109,250,0.25)",
                transition: "0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.background =
                  "linear-gradient(87deg,#2b59c3 0%,#326dfa 90%)")
              }
              onMouseOut={(e) =>
                (e.target.style.background =
                  "linear-gradient(87deg,#326dfa 0%,#5a98f9 90%)")
              }
            >
              決済画面へ進む
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
