"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [addedProduct, setAddedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [viewMode, setViewMode] = useState("card");

  // 🔹 ログインチェック
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
    }
  }, [router]);

  // 🔹 商品読み込み
  useEffect(() => {
    fetch("/products.json")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        const initial = data.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {});
        setQuantities(initial);
      });
  }, []);

  // 🔹 カート追加
  const handleAdd = (product) => {
    addToCart(product, quantities[product.id]);
    setAddedProduct(product.id);

    toast.success(
      `${product.name} を ${quantities[product.id]} 個カートに追加しました`
    );

    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    setTimeout(() => setAddedProduct(null), 2000);
  };

  // 🔹 ログアウト
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e8f6ff] font-sans">
      <Toaster position="top-right" />

      <main className="flex min-h-screen w-full max-w-md flex-col items-center py-10 px-6">
        {/* Header */}
        <div className="flex w-full items-center justify-between mb-8">
          <Image src="/mc-logo.png" alt="Logo" width={50} height={50} />
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="rounded-full bg-[#3da9fc] hover:bg-[#0f8be6] px-4 py-2 text-white text-sm font-semibold shadow"
            >
              カート
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full bg-red-500 hover:bg-red-600 px-4 py-2 text-white text-sm font-semibold shadow"
            >
              ログアウト
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-4">
          モバイルオーダー
        </h1>
        <p className="text-[#3c4f76] text-center text-base mb-6">
          商品をカテゴリーから選べます。
        </p>

        {/* ================= カテゴリタブ（修正済み） ================= */}
        <div className="flex gap-3 mb-4 flex-wrap justify-center">
          {[
            { key: "all", label: "すべて" },
            { key: "recommendation", label: "おすすめ" },
            { key: "noodle", label: "麺類" },
            { key: "rice", label: "ご飯もの" },
            { key: "large", label: "大盛り" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded whitespace-nowrap min-w-[90px] text-center ${
                selectedCategory === cat.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 表示モード切替 */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded ${
              viewMode === "card"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            カード表示
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded ${
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            リスト表示
          </button>
        </div>

        {/* 商品リスト */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-2 gap-4 w-full">
            {products
              .filter(
                (p) =>
                  selectedCategory === "all" ||
                  p.category === selectedCategory
              )
              .map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg bg-white p-3 shadow-md border border-[#cce8ff]"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                  <p className="font-medium mt-2 text-[#1e3a8a]">
                    {p.name}
                  </p>
                  <p className="text-sm text-[#3c4f76] mb-2">
                    ¥{p.price}
                  </p>

                  <div className="flex items-center mb-2">
                    <button
                      onClick={() =>
                        setQuantities((prev) => ({
                          ...prev,
                          [p.id]: Math.max(1, prev[p.id] - 1),
                        }))
                      }
                      className="px-2 py-1 bg-[#dff1ff] rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border">
                      {quantities[p.id]}
                    </span>
                    <button
                      onClick={() =>
                        setQuantities((prev) => ({
                          ...prev,
                          [p.id]: prev[p.id] + 1,
                        }))
                      }
                      className="px-2 py-1 bg-[#dff1ff] rounded-r"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleAdd(p)}
                    className={`w-full py-2 rounded-lg text-white ${
                      addedProduct === p.id
                        ? "bg-green-500"
                        : "bg-[#3da9fc]"
                    }`}
                  >
                    {addedProduct === p.id
                      ? "追加されました！"
                      : "カートに追加"}
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {products
              .filter(
                (p) =>
                  selectedCategory === "all" ||
                  p.category === selectedCategory
              )
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-[#1e3a8a]">
                      {p.name}
                    </p>
                    <p className="text-sm text-[#3c4f76]">
                      ¥{p.price}
                    </p>
                  </div>

                  <button
                   onClick={() => handleAdd(p)}
                   className={`px-4 py-2 rounded text-white ${
                     addedProduct === p.id
                      ? "bg-green-500"
                      : "bg-[#3da9fc]"
                   }`}
                  >
                    {addedProduct === p.id ? "追加済" : "追加"}
                  </button>

                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
