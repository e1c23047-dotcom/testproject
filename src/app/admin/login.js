"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 簡易管理者認証（固定値）
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin/orders");
    } else {
      setError("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          管理者ログイン
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2 text-blue-800">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-blue-300 rounded"
        />

        <label className="block mb-2 text-blue-800">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-6 border border-blue-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
