"use client";

import Link from "next/link";
import { useCart } from "../../../context/CartContext";

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  // カート内合計
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 数量を減らす関数
  const decreaseQuantity = (itemId) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    if (item.quantity === 1) {
      // 1個の場合は削除
      removeFromCart(itemId);
    } else {
      // 1以上の場合は1個減らす
      removeFromCart(itemId);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">カート</h1>

      {cart.length === 0 ? (
        <p>カートは空です。</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow mb-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-zinc-600">¥{item.price} × {item.quantity}</p>
              </div>

              {/* 数量操作 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 ml-2"
                >
                  削除
                </button>
              </div>
            </div>
          ))}

          <p className="font-bold text-lg mt-4">合計：¥{total}</p>

          <Link
            href="/checkout"
            className="block w-full bg-red-500 text-white py-3 mt-4 text-center rounded-lg"
          >
            注文へ進む
          </Link>
        </>
      )}
    </div>
  );
}
