"use client";
import { useState } from "react";
import MenuItem from "../components/MenuItem";
import menuData from "../data/menu.json";
import { useRouter } from "next/navigation";

export default function Home() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const addToCart = (item) => setCart([...cart, item]);

  const goToCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>メニュー</h1>
      {menuData.map((item) => (
        <MenuItem key={item.id} item={item} addToCart={addToCart} />
      ))}
      {cart.length > 0 && (
        <button onClick={goToCart}>
          カートを見る ({cart.length})
        </button>
      )}
    </div>
  );
}
