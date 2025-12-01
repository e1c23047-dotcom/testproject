// src/app/api/orders/stream/route.js
import { NextResponse } from "next/server";
import { sseClients } from "../route";

export async function GET() {
  const encoder = new TextEncoder();

  // Node の低レベルレスポンスを取得できるかどうか確認するための実装。
  // Next.js のバージョン差で動かない場合は、代替で pages/api を使うか
  // サーバーとして別途 Express / Fastify を立てる必要があることを注意。
  const stream = new ReadableStream({
    start(controller) {
      // 初期の心拍（接続維持のため）
      controller.enqueue(encoder.encode("retry: 10000\n\n"));

      // 空の placeholder。実際に writing はモジュールスコープの res.write を利用する方式にするため
      // ここでは管理用に閉じることなくストリームを保持する実装は難しい場合がある。
      // より確実なのは pages/api での SSE 実装か、外部サーバーを使うこと。
      controller.enqueue(encoder.encode("data: connected\n\n"));
    },
    cancel() {
      // クライアント切断時の処理（必要なら）
    },
  });

  // NOTE: 上の orders/route.js と同じ Node プロセス内で動作していれば、
  // sseClients を使用して ServerResponse に直接書き込み可能です。
  // しかし App Router の Response オブジェクトの扱いによっては
  // 直接 write() ができないことがあるため、最も確実な方法は pages/api を利用した SSE です。

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
