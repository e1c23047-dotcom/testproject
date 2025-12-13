"use client";

import Link from "next/link";
import { useCart } from "../../../context/CartContext";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, decreaseQuantityCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const decreaseQuantity = (itemId) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(itemId);
    } else {
      decreaseQuantityCart(itemId);
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-blue-700">カート</h1>

      {cart.length === 0 ? (
        <>
          <p className="text-blue-700">カートは空です。</p>

          <div className="mt-4">
            <Link
              href="/"
              className="block w-full bg-blue-500 text-white py-3 text-center rounded-lg hover:bg-blue-600"
            >
              ホームに戻る
            </Link>
          </div>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow mb-2"
            >
              <div>
                <p className="font-medium text-blue-800">{item.name}</p>
                <p className="text-sm text-blue-600">
                  ¥{item.price} × {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b border-blue-200">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-r"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-blue-600 ml-2 hover:underline"
                >
                  削除
                </button>
              </div>
            </div>
          ))}

          <p className="font-bold text-lg mt-4 text-blue-800">
            合計：¥{total}
          </p>

          <div className="flex gap-4 mt-4">
            <Link
              href="/"
              className="flex-1 bg-blue-500 text-white py-3 text-center rounded-lg hover:bg-blue-600"
            >
              ホームに戻る
            </Link>

            <Link
              href="/payment"
              className="flex-1 bg-blue-500 text-white py-3 text-center rounded-lg hover:bg-blue-600"
            >
              決済方法の選択へ進む
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
