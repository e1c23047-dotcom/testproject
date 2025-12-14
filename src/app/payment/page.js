"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePayment } from "../../../context/PaymentContext";

export default function PaymentPage() {
  const router = useRouter();
  const {
    paymentType,
    setPaymentType,
    codeBrand,
    setCodeBrand,
    cardInfo,
    setCardInfo,
  } = usePayment();

  const handleNext = () => {
    if (!paymentType) {
      alert("決済方法を選択してください");
      return;
    }
    if (paymentType === "code" && !codeBrand) {
      alert("コード決済の種類を選択してください");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h1 className="text-xl font-bold mb-4 text-black">決済方法の選択</h1>

      {/* 決済タイプ */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => {
            setPaymentType("credit");
            setCodeBrand(null);
          }}
          className={`w-full py-4 rounded-lg text-white ${
            paymentType === "credit" ? "bg-blue-700" : "bg-blue-500"
          }`}
        >
          クレジットカード
        </button>

        <button
          onClick={() => {
            setPaymentType("code");
            setCodeBrand(null);
          }}
          className={`w-full py-4 rounded-lg text-white ${
            paymentType === "code" ? "bg-green-700" : "bg-green-500"
          }`}
        >
          コード決済
        </button>
      </div>

      {/* コード決済の種類 */}
      {paymentType === "code" && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <p className="font-bold mb-2 text-black">コード決済を選択</p>

          <div className="space-y-2">
            {[
              { key: "pay", label: "PayPay", color: "bg-red-500" },
              { key: "au", label: "au PAY", color: "bg-orange-500" },
              { key: "rakuten", label: "楽天Pay", color: "bg-rose-500" },
            ].map((b) => (
              <button
                key={b.key}
                onClick={() => setCodeBrand(b.key)}
                className={`w-full py-3 rounded-lg text-white ${
                  codeBrand === b.key ? "ring-4 ring-green-300" : ""
                } ${b.color}`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* クレジットカード入力 */}
      {paymentType === "credit" && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2 text-black">カード情報</h2>

          <input
            className="w-full border p-2 mb-2 rounded text-black"
            placeholder="カード番号"
            value={cardInfo.number}
            onChange={(e) =>
              setCardInfo({ ...cardInfo, number: e.target.value })
            }
          />

          <div className="flex gap-2">
            <input
              className="flex-1 border p-2 rounded text-black"
              placeholder="MM/YY"
              value={cardInfo.expiry}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, expiry: e.target.value })
              }
            />
            <input
              className="flex-1 border p-2 rounded text-black"
              placeholder="CVC"
              value={cardInfo.cvc}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, cvc: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {/* ボタン */}
      <div className="flex gap-4 mt-6">
        <Link
          href="/"
          className="flex-1 bg-blue-500 text-white py-3 text-center rounded-lg hover:bg-blue-600"
        >
          ホームに戻る
        </Link>

        <button
          onClick={handleNext}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          確認へ進む
        </button>
      </div>
    </div>
  );
}
