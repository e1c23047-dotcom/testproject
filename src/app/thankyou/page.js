"use client";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>ご注文ありがとうございました！</h1>
        <p style={styles.message}>注文が正常に完了しました。</p>

        <Link href="/order" style={styles.button}>
          ホームへ戻る
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#ffffff", // ←青背景
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  box: {
    backgroundColor: "white",
    borderRadius: "14px",
    padding: "30px 40px",
    textAlign: "center",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#000", // ←黒文字
    marginBottom: "14px",
  },
  message: {
    fontSize: "18px",
    color: "#000", // ←黒文字
    marginBottom: "25px",
  },
  button: {
    display: "inline-block",
    background: "linear-gradient(87deg,#326dfa 0%,#5a98f9 90%)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
};
