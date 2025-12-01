"use client";

import { useState } from "react";
import Link from "next/link";

function Toast({ message }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "12px 18px",
        borderRadius: "10px",
        fontSize: "0.9rem",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}

export default function OrderPage() {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const menu = [
    {
      name: "かつ丼",
      price: 780,
      img: "/foods/katsudon.jpg",
    },
    {
      name: "うどん",
      price: 450,
      img: "/foods/udon.jpg",
    },
    {
      name: "ラーメン",
      price: 680,
      img: "/foods/ramen.jpg",
    },
    {
      name: "焼肉定食",
      price: 980,
      img: "/foods/yakiniku.jpg",
    },
  ];

  const handleAddToCart = (item) => {
    const newCart = [...cart, item];   // ← ここで newCart を定義
    setCart(newCart);                  // ← 正しく更新
    localStorage.setItem("cart", JSON.stringify(newCart)); // ここで保存
  
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7ff",
        padding: "2rem",
        fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif",
      }}
    >
      {showToast && <Toast message="カートに追加しました！" />}

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
          注文ページ
        </div>

        {/* カート画面リンク */}
        <div style={{ textAlign: "right", marginBottom: "1rem" }}>
          <Link
            href="/cart"
            style={{
              color: "#326dfa",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            カートを見る（{cart.length}）
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {menu.map((item) => (
            <div
              key={item.name}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "1rem",
                boxShadow: "0 2px 18px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "100%",
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />

              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#34418e",
                  marginTop: "0.3rem",
                }}
              >
                {item.name}
              </div>

              <div
                style={{
                  fontSize: "1rem",
                  color: "#555",
                  marginBottom: "0.4rem",
                }}
              >
                ¥{item.price.toLocaleString()}
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                style={{
                  marginTop: "0.5rem",
                  background: "linear-gradient(87deg,#326dfa 0%,#5a98f9 90%)",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "0.6rem 1rem",
                  width: "100%",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
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
                カートに入れる
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
