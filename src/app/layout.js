"use client";

import "./globals.css"; // ← これが超重要
import { CartProvider } from "../../context/CartContext";
import { PaymentProvider } from "../../context/PaymentContext";

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-[#e8f6ff] font-sans">
        <CartProvider>
          <PaymentProvider>
            {children}
          </PaymentProvider>
        </CartProvider>
      </body>
    </html>
  );
}
