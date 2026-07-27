import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { assetId } = await req.json();

  const res = await fetch(`https://api.mux.com/video/v1/assets/${assetId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(process.env.MUX_TOKEN_ID + ":" + process.env.MUX_TOKEN_SECRET).toString("base64"),
    },
    body: JSON.stringify({
      mp4_support: "standard",
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
