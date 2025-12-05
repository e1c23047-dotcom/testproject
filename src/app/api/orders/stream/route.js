export const runtime = "nodejs";

import { NextResponse } from "next/server";

class OrderStream {
  constructor() {
    this.clients = new Set();
  }

  add(res) {
    this.clients.add(res);
  }

  remove(res) {
    this.clients.delete(res);
  }

  send(data) {
    const msg = `data: ${JSON.stringify(data)}\n\n`;
    for (const client of this.clients) {
      client.write(msg);
    }
  }
}

if (!globalThis.orderStream) {
  globalThis.orderStream = new OrderStream();
}

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const write = (msg) => controller.enqueue(encoder.encode(msg));

      const client = {
        write,
      };

      globalThis.orderStream.add(client);

      write(`event: connect\ndata: ok\n\n`);

      controller.onclose = () => {
        globalThis.orderStream.remove(client);
      };
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
