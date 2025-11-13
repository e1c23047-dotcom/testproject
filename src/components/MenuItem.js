"use client";

export default function MenuItem({ item, addToCart }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h2>{item.name}</h2>
        <p>{item.price}円</p>
      </div>
      <button onClick={() => addToCart(item)}>カートに追加</button>
    </div>
  );
}
