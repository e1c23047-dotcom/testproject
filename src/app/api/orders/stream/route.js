export const runtime = "nodejs";

import { NextResponse } from "next/server";

class OrderStream {
  constructor() {
    this.clients = new Set();
  }

  add(client) {
    this.clients.add(client);
  }

  remove(client) {
    this.clients.delete(client);
  }

  send(data) {
    const msg = `data: ${JSON.stringify(data)}\n\n`;

    for (const client of this.clients) {
      try {
        client.write(msg);
      } catch (e) {
        // 壊れた接続は削除
        this.clients.delete(client);
      }
    }
  }
}

if (!globalThis.orderStream) {
  globalThis.orderStream = new OrderStream();
}

export async function GET() {
  let client;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      client = {
        write(msg) {
          controller.enqueue(encoder.encode(msg));
        },
      };

      globalThis.orderStream.add(client);

      // 接続確認
      controller.enqueue(
        encoder.encode(`event: connect\ndata: ok\n\n`)
      );
    },

    // ★ ここが重要：クライアント切断時に呼ばれる
    cancel() {
      if (client) {
        globalThis.orderStream.remove(client);
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
