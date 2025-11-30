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

  // 🔹 追加：表示モード ("card" or "list")
  const [viewMode, setViewMode] = useState("card");
  
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
    }
  }, [router]);
  
  // 🔹 JSON から商品を読み込む
  useEffect(() => {
    fetch("/products.json")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);

        const initial = data.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {});
        setQuantities(initial);
      });
  }, []);

  const [quantities, setQuantities] = useState({});

  const handleAdd = (product) => {
    addToCart(product, quantities[product.id]);
    setAddedProduct(product.id);

    toast.success(`${product.name} を ${quantities[product.id]} 個カートに追加しました`);

    setQuantities((prev) => ({
      ...prev,
      [product.id]: 1,
    }));

    setTimeout(() => setAddedProduct(null), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e8f6ff] font-sans">
      <Toaster position="top-right" />

      <main className="flex min-h-screen w-full max-w-md flex-col items-center py-10 px-6">
        {/* Header */}
        <div className="flex w-full items-center justify-between mb-8">
          <Image src="/mc-logo.png" alt="Logo" width={50} height={50} />
          <Link
            href="/cart"
            className="rounded-full bg-[#3da9fc] hover:bg-[#0f8be6] px-4 py-2 text-white text-sm font-semibold shadow"
          >
            カート
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-4">モバイルオーダー</h1>
        <p className="text-[#3c4f76] text-center text-base mb-6">
          商品をカテゴリーから選べます。
        </p>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-4">
          {[
            { key: "all", label: "すべて" },
            { key: "burgers", label: "ハンバーガー" },
            { key: "sides", label: "サイド" },
            { key: "drinks", label: "ドリンク" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat.key ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 🔄 表示モード切り替えボタン */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded ${
              viewMode === "card" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            カード表示
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded ${
              viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            リスト表示
          </button>
        </div>

        {/* Product List */}
        {viewMode === "card" ? (
          /* 🔷 カード表示（2列） */
          <div className="grid grid-cols-2 gap-4 w-full">
            {products
              .filter(
                (p) => selectedCategory === "all" || p.category === selectedCategory
              )
              .map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg bg-white p-3 shadow-md border border-[#cce8ff] hover:shadow-lg transition"
                >
                  <Image src={p.image} alt={p.name} width={200} height={200} className="rounded-md" />
                  <p className="font-medium mt-2 text-[#1e3a8a]">{p.name}</p>
                  <p className="text-sm text-[#3c4f76] mb-2">¥{p.price}</p>

                  {/* 数量選択 */}
                  <div className="flex items-center mb-2">
                    <button
                      onClick={() =>
                        setQuantities((prev) => ({
                          ...prev,
                          [p.id]: Math.max(1, prev[p.id] - 1),
                        }))
                      }
                      className="px-2 py-1 bg-[#dff1ff] text-[#1e3a8a] rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b border-[#cce8ff]">{quantities[p.id]}</span>
                    <button
                      onClick={() =>
                        setQuantities((prev) => ({
                          ...prev,
                          [p.id]: prev[p.id] + 1,
                        }))
                      }
                      className="px-2 py-1 bg-[#dff1ff] text-[#1e3a8a] rounded-r"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleAdd(p)}
                    className={`w-full py-2 mt-2 rounded-lg transition shadow ${
                      addedProduct === p.id ? "bg-green-500" : "bg-[#3da9fc] hover:bg-[#0f8be6]"
                    } text-white`}
                  >
                    {addedProduct === p.id ? "追加されました！" : "カートに追加"}
                  </button>
                </div>
              ))}
          </div>
        ) : (
          /* 🔶 リスト表示（1列） */
          <div className="flex flex-col gap-4 w-full">
            {products
              .filter(
                (p) => selectedCategory === "all" || p.category === selectedCategory
              )
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md border border-[#cce8ff]"
                >
                  {/* 商品画像 */}
                  <Image src={p.image} alt={p.name} width={80} height={80} className="rounded" />

                  <div className="flex-1">
                    <p className="font-bold text-[#1e3a8a]">{p.name}</p>
                    <p className="text-sm text-[#3c4f76]">¥{p.price}</p>

                    {/* 数量選択 */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [p.id]: Math.max(1, prev[p.id] - 1),
                          }))
                        }
                        className="px-2 py-1 bg-[#dff1ff] text-[#1e3a8a] rounded-l"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b border-[#cce8ff]">{quantities[p.id]}</span>
                      <button
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [p.id]: prev[p.id] + 1,
                          }))
                        }
                        className="px-2 py-1 bg-[#dff1ff] text-[#1e3a8a] rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(p)}
                    className={`px-4 py-2 rounded-lg shadow text-white ${
                      addedProduct === p.id ? "bg-green-500" : "bg-[#3da9fc] hover:bg-[#0f8be6]"
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
