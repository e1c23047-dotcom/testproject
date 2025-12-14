import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

function getFile() {
  const fp = path.join(process.cwd(), "data", "orders.json");
  if (!fs.existsSync(fp)) fs.writeFileSync(fp, "[]", "utf8");
  return fp;
}

export async function POST(req) {
  const { orderId } = await req.json();

  const fp = getFile();
  const orders = JSON.parse(fs.readFileSync(fp, "utf8"));

  const target = orders.find(o => o.id === orderId);
  if (!target) return NextResponse.json({ error: "注文がありません" }, { status: 404 });

  target.completed = true;

  fs.writeFileSync(fp, JSON.stringify(orders, null, 2), "utf8");

  return NextResponse.json({ success: true });
}
