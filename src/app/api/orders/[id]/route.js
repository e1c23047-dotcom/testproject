import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// JSON ファイルへのパス
function getFile() {
  const fp = path.join(process.cwd(), "data", "orders.json");
  if (!fs.existsSync(fp)) fs.writeFileSync(fp, "[]", "utf8");
  return fp;
}

export async function PATCH(req, { params }) {
  try {
    // 確実な修正方法:
    // エラーメッセージに忠実に従い、params を await でアンラップします。
    // Next.js の仕様変更や環境固有の問題を回避するために、
    // Promise が解決されたオブジェクトから id を取得します。
    // Route Handler の引数は本来 Promise ではないですが、エラーが出ているため対応します。
    
    // params が Promise だと仮定し、id を取得
    // ここで await を使用することで、Next.js の警告を回避し、id を正しく取得します。
    const { id } = await params; 

    const body = await req.json();

    const fp = getFile();
    const orders = JSON.parse(fs.readFileSync(fp, "utf8"));

    const target = orders.find((o) => String(o.id) === String(id));
    if (!target) {
      return NextResponse.json(
        { error: "not found" },
        { status: 404 }
      );
    }

    // 調理完了 / 提供完了 を更新
    if (body.completed !== undefined) target.completed = body.completed;
    if (body.served !== undefined) target.served = body.served;

    fs.writeFileSync(fp, JSON.stringify(orders, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}