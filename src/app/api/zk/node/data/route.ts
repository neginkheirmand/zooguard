import { NextResponse } from "next/server";

const GATEWAY = process.env.ZOOGUARD_GATEWAY_URL ?? "http://localhost:8084";

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const cluster = searchParams.get("cluster");
  if (!cluster) {
    return NextResponse.json({ error: "Missing query param: cluster" }, { status: 400 });
  }

  const body = await req.text();

  const upstream = `${GATEWAY}/api/v1/zk/node/data?cluster=${encodeURIComponent(cluster)}`;
  const res = await fetch(upstream, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body,
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}
