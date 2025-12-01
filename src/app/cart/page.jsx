"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // localStorage から読み込み
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

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

        {/* 戻るリンク */}
        <div style={{ marginBottom: "1rem" }}>
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

        {cart.length === 0 ? (
          <div
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
              color: "#777",
              marginTop: "2rem",
            }}
          >
            カートは空です
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "white",
                    padding: "0.7rem 1rem",
                    borderRadius: 12,
                    boxShadow: "0 2px 15px rgba(0,0,0,0.06)",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "#34418e" }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: "1.1rem", color: "#555" }}>
                    ¥{item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "2rem",
                textAlign: "right",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#2e3a8c",
              }}
            >
              合計：¥{total.toLocaleString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
