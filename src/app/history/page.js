"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function History() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedHistory = localStorage.getItem("history");
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  }, []);

  const goToMenu = () => {
    router.push("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>注文履歴</h1>
      {history.length === 0 ? (
        <p>注文履歴はありません</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item.name} - {item.price}円</li>
          ))}
        </ul>
      )}
      <button onClick={goToMenu}>メニューに戻る</button>
    </div>
  );
}
