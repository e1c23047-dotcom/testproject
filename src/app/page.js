"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const { addToCart } = useCart();
  const [addedProduct, setAddedProduct] = useState(null);

  const products = [
    { id: "bigmac", name: "ハンバーガー", price: 450, image: "/menu-burger.png" },
    { id: "potato-m", name: "ポテト M", price: 290, image: "/menu-potato.png" },
  ];

  // 数量管理用 state
  const [quantities, setQuantities] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const handleAdd = (product) => {
  addToCart(product, quantities[product.id]);
  setAddedProduct(product.id);

  toast.success(`${product.name} を ${quantities[product.id]} 個カートに追加しました`);

  //  追加後に数量を1に戻す
  setQuantities((prev) => ({
    ...prev,
    [product.id]: 1
  }));

  // ボタン表示を2秒後にもどす
  setTimeout(() => setAddedProduct(null), 2000);
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5ebdc] font-sans">
      <Toaster position="top-right" />

      <main className="flex min-h-screen w-full max-w-md flex-col items-center py-10 px-6">
        {/* Header */}
        <div className="flex w-full items-center justify-between mb-8">
          <Image src="/mc-logo.png" alt="Logo" width={50} height={50} />
          <Link
            href="/cart"
            className="rounded-full bg-red-500 px-4 py-2 text-white text-sm font-semibold"
          >
            カート
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-4">モバイルオーダー</h1>
        <p className="text-zinc-700 text-center text-base mb-10">
          商品を選んでカートに追加できます。
        </p>

        {/* Product List */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {products.map((p) => (
            <div key={p.id} className="rounded-lg bg-white p-3 shadow">
              <Image src={p.image} alt={p.name} width={200} height={200} className="rounded-md" />
              <p className="font-medium mt-2 text-zinc-900">{p.name}</p>
              <p className="text-sm text-zinc-600 mb-2">¥{p.price}</p>

              {/* 数量選択 */}
              <div className="flex items-center mb-2">
                <button
                  onClick={() =>
                    setQuantities((prev) => ({ ...prev, [p.id]: Math.max(1, prev[p.id] - 1) }))
                  }
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">{quantities[p.id]}</span>
                <button
                  onClick={() =>
                    setQuantities((prev) => ({ ...prev, [p.id]: prev[p.id] + 1 }))
                  }
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAdd(p)}
                className={`w-full py-2 mt-2 rounded-lg transition ${
                  addedProduct === p.id ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {addedProduct === p.id ? "追加されました！" : "カートに追加"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
