"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Payment() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // カートを localStorage から取得
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    // 合計金額を計算
    const sum = savedCart.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>決済画面</h1>

      <div style={styles.box}>
        <p style={styles.text}>ご注文内容を確認してください</p>
        <p style={styles.total}>合計金額：¥{total.toLocaleString()}</p>
      </div>

      <Link href="/thankyou" style={styles.payButton}>
        注文を確定する
      </Link>

      <Link href="/cart" style={styles.backButton}>
        カートに戻る
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "20px",
  },
  box: {
    backgroundColor: "#f5f5f5",
    width: "320px",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    color: "#000",
  },
  total: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#000",
    marginTop: "10px",
  },

  // ← 青色に変更（注文画面のボタンと同じ系統）
  payButton: {
    display: "inline-block",
    background: "linear-gradient(87deg,#326dfa 0%,#5a98f9 90%)",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    marginBottom: "10px",
    fontWeight: "600",
    transition: "0.2s",
  },

  backButton: {
    display: "inline-block",
    backgroundColor: "#ddd",
    color: "#000",
    padding: "10px 16px",
    borderRadius: "8px",
    textDecoration: "none",
  },
};
