// pages/index.jsx
"use client"

import Image from "next/image";

const headingStyle = {
  fontSize: "2.7rem",
  fontWeight: 800,
  color: "#326dfa",
  margin: "2.2rem 0 1rem 0",
  textAlign: "center",
  letterSpacing: ".02em",
}

const sentenceStyle = {
  fontSize: "1.18rem",
  color: "#616A87",
  marginBottom: "2.0rem",
  textAlign: "center",
  lineHeight: 1.8,
  maxWidth: 520,
}

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "sans-serif" }}>
      {/* ヘッダー */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.2rem 2.5vw",
          background: "#fff",
          boxShadow: "0 1px 6px rgba(100,150,200,0.08)",
        }}
      >
        <a href="/" style={{ fontWeight: 700, fontSize: "1.5rem", color: "#326dfa" }}>
          大阪工業大学 モバイルオーダー
        </a>
        <nav>
          <a href="/" style={{ marginRight: 24, color: "#326dfa", textDecoration: "none", fontWeight: 600 }}>ホーム</a>
          <a href="/contact" style={{ marginRight: 24, color: "#eb1d50ff", textDecoration: "none", fontWeight: 600 }}>お問い合わせ</a>
          <a href="/login" style={{ color: "#357e04ff", textDecoration: "none", fontWeight: 600 }}>ログイン</a>
        </nav>
      </header>

      {/* メイン */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          minHeight: "75vh",
        }}
      >
        <p style={{ margin: "5rem 0" }}></p>


        <h1
          style={
            headingStyle
          }
        >
          遠隔で料理を注文しよう
        </h1>

        <p style={sentenceStyle}>
          モバイルオーダーはご自身のスマホから注文することで，<br />混雑や待ち時間を緩和することができます．
        </p>

        <a
          href="/login"
          style={{
            display: "inline-block",
            padding: "0.85rem 2rem",
            background: "linear-gradient(88deg, #326dfa 0%, #5a98f9 100%)",
            color: "#fff",
            borderRadius: 11,
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: ".03em",
            textDecoration: "none",
            boxShadow: "0 2px 12px rgba(50,109,250,.10)",
            transition: "background .18s, box-shadow .21s",
            marginTop: "0.7rem"
          }}
          onMouseOver={e =>
          (e.target.style.background =
            "linear-gradient(88deg, #264dbd 0%, #326dfa 100%)")
          }
          onMouseOut={e =>
          (e.target.style.background =
            "linear-gradient(88deg, #326dfa 0%, #5a98f9 100%)")
          }
        >
          注文をする
        </a>




        <p style={{ margin: "10rem 0" }}></p>

        <h1 style={headingStyle}>
          What is this?
        </h1>

        <p style={sentenceStyle}>
          モバイルオーダーではご自身のスマホから注文をすることができます．そして注文した料理が完成するとご自身のスマホに通知を送らせていただきます．<br />
          これにより，提供口の前で待つことや券売機に並ぶ必要が無くなります．
        </p>




      </main>

      {/* フッター */}
      <footer
        style={{
          background: "#eef5ff",
          textAlign: "center",
          padding: "1rem",
          fontSize: "1.03rem",
          color: "#888",
          marginTop: "2rem",
        }}
      >
        &copy; 2025 大阪工業大学 モバイルオーダー
      </footer>
    </div>
  );
}