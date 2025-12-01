// pages/login.jsx
"use client"

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // 仮認証例
    if (email === "user@example.com" && password === "password123") {
      alert("ログイン成功！");
      // リダイレクト等も可能
    } else {
      setError("メールアドレスもしくはパスワードが間違っています！");
    }
  };

  return (
    // Google Fonts推奨：inter
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(120deg, #e0eaff 0%, #ffffff 100%)",
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%", maxWidth: 370,
          background: "#fff", borderRadius: 18,
          boxShadow: "0 6px 32px rgba(50,109,250,0.08)",
          padding: "2rem 2.3rem", boxSizing: "border-box",
          display: "flex", flexDirection: "column", gap: "1.2rem"
        }}
      >
        <div style={{
          textAlign: "center", fontWeight: 700,
          fontSize: "1.6rem", letterSpacing: ".02em",
          marginBottom: ".2rem"
        }}>
          <span style={{ color: "#326dfa" }}>Sign in</span>
        </div>
        <div style={{ textAlign: "center", fontSize: ".92rem", color: "#868e96", marginBottom: "1rem" }}>
          アカウントにログインしてください
        </div>
        <label style={{ fontWeight: 500, color: "#4752a5" }}>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
            style={{
              width: "100%", marginTop: "0.4rem",
              padding: "0.8rem", fontSize: "1rem",
              borderRadius: 11, border: "1.7px solid #d5dbff",
              background: "#f7f9ff", color: "#264dbd",
              outline: "none", boxSizing: "border-box",
              transition: ".22s border",
            }}
            onFocus={e => e.target.style.border = "1.7px solid #326dfa"}
            onBlur={e => e.target.style.border = "1.7px solid #d5dbff"}
            placeholder="you@example.com"
          />
        </label>
        <label style={{ fontWeight: 500, color: "#4752a5" }}>
          パスワード
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: "100%", marginTop: "0.4rem",
              padding: "0.8rem", fontSize: "1rem",
              borderRadius: 11, border: "1.7px solid #d5dbff",
              background: "#f7f9ff", color: "#264dbd",
              outline: "none", boxSizing: "border-box",
              transition: ".22s border",
            }}
            onFocus={e => e.target.style.border = "1.7px solid #326dfa"}
            onBlur={e => e.target.style.border = "1.7px solid #d5dbff"}
            placeholder="パスワード"
          />
        </label>
        {error && <div style={{
          color: "#e84150", background: "#fff7f7",
          borderRadius: 7, padding: ".6rem .85rem",
          fontSize: ".97rem", textAlign: "center",
          boxShadow: "0 0 0.5px #e84150"
        }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.88rem",
            background: "linear-gradient(87deg, #326dfa 0%, #5a98f9 90%)",
            color: "#fff",
            border: "none",
            borderRadius: "13px",
            fontWeight: 700, fontSize: "1.09rem",
            letterSpacing: ".03em",
            boxShadow: "0 1.5px 8px rgba(50,109,250,.13)",
            cursor: "pointer",
            transition: "background .21s, box-shadow .19s"
          }}
          onMouseOver={e => e.target.style.background = "linear-gradient(87deg, #2b59c3 0%, #326dfa 90%)"}
          onMouseOut={e => e.target.style.background = "linear-gradient(87deg, #326dfa 0%, #5a98f9 90%)"}
        >
          ログイン
        </button>
        <div style={{
          textAlign: "center", fontSize: ".93rem", color: "#9fb2db", marginTop: "1rem"
        }}>
          <a href="#" style={{ color: "#326dfa", textDecoration: "none", fontWeight: "bold" }}>パスワードを忘れましたか？</a>
        </div>
      </form>
    </div>
  );
}