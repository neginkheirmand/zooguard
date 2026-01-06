import { NextResponse } from "next/server";

const GATEWAY = process.env.ZOOGUARD_GATEWAY_URL ?? "http://localhost:8084";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cluster = searchParams.get("cluster");
  const path = searchParams.get("path");

  if (!cluster || !path) {
    return NextResponse.json(
      { error: "Missing required query params: cluster, path" },
      { status: 400 }
    );
  }

  const upstream = `${GATEWAY}/api/v1/zk/node?cluster=${encodeURIComponent(
    cluster
  )}&path=${encodeURIComponent(path)}`;

  const res = await fetch(upstream, { cache: "no-store" });
  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const cluster = searchParams.get("cluster");
  if (!cluster) {
    return NextResponse.json({ error: "Missing query param: cluster" }, { status: 400 });
  }

  const body = await req.text();

  const upstream = `${GATEWAY}/api/v1/zk/node?cluster=${encodeURIComponent(cluster)}`;
  const res = await fetch(upstream, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const cluster = searchParams.get("cluster");
  if (!cluster) {
    return NextResponse.json({ error: "Missing query param: cluster" }, { status: 400 });
  }

  const body = await req.text();

  const upstream = `${GATEWAY}/api/v1/zk/node?cluster=${encodeURIComponent(cluster)}`;
  const res = await fetch(upstream, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body,
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}
