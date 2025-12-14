// src/app/api/orders/route.js
export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// SSE クライアント用のグローバル（モジュールスコープ）
// 同一サーバーインスタンス内で接続されている EventSource のレスポンスに書き込むために使う
// 注意: サーバーが複数インスタンスで動く場合は外部 Pub/Sub が必要 (Redis, Supabase Realtime 等)
const sseClients = new Set();

function notifySseClients(order) {
  const payload = `data: ${JSON.stringify(order)}\n\n`;
  for (const res of sseClients) {
    try {
      res.write(payload);
    } catch (e) {
      // クライアント切断などの例外が出る場合は削除
      try { res.end(); } catch (_) {}
      sseClients.delete(res);
    }
  }
}

function ensureOrdersFile() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  const fp = path.join(dataDir, "orders.json");
  if (!fs.existsSync(fp)) fs.writeFileSync(fp, "[]", "utf8");
  return fp;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, cart, total, pickupNumber } = body;

    if (!id) {
      return NextResponse.json({ error: "orderId がありません" }, { status: 400 });
    }

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "カートが空です" }, { status: 400 });
    }

    const fp = ensureOrdersFile();
    const raw = fs.readFileSync(fp, "utf8");
    const orders = JSON.parse(raw || "[]");

    const order = {
      id, // ⭐ 受け取った id をそのまま使う
      pickupNumber: pickupNumber ?? Math.floor(Math.random() * 900) + 100,
      cart,
      total,
      createdAt: new Date().toISOString(),
      completed: false,
    };

    orders.push(order);
    fs.writeFileSync(fp, JSON.stringify(orders, null, 2), "utf8");

    notifySseClients(order);

    return NextResponse.json({
      success: true,
      orderId: id,
      pickupNumber: order.pickupNumber,
    });
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const fp = ensureOrdersFile();
    const raw = fs.readFileSync(fp, "utf8");
    const orders = JSON.parse(raw || "[]");
    return NextResponse.json(orders);
  } catch (err) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json([], { status: 200 });
  }
}

// エクスポートして stream ルートからアクセスできるようにする
export { sseClients, notifySseClients };
