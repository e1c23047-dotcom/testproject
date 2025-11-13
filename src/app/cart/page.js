"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const confirmOrder = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    localStorage.setItem("history", JSON.stringify([...history, ...cart]));
    localStorage.removeItem("cart");
    router.push("/history");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>カート</h1>
      {cart.length === 0 ? (
        <p>カートは空です</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - {item.price}円</li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={confirmOrder}>注文確定</button>
      )}
    </div>
  );
}
