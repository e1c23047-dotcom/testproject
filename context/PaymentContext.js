"use client";

import { createContext, useContext, useState } from "react";

const PaymentContext = createContext(null);

export function PaymentProvider({ children }) {
  // 決済タイプ
  const [paymentType, setPaymentType] = useState(null); // "credit" | "code"

  // 表示用ブランド（UI用）
  const [codeBrand, setCodeBrand] = useState(null); // "pay" | "au" | "rakuten"

  // クレジット情報
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  const clearPayment = () => {
    setPaymentType(null);
    setCodeBrand(null);
    setCardInfo({ number: "", expiry: "", cvc: "" });
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentType,
        setPaymentType,
        codeBrand,
        setCodeBrand,
        cardInfo,
        setCardInfo,
        clearPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) {
    throw new Error("usePayment must be used inside PaymentProvider");
  }
  return ctx;
}
