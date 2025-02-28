import { NextResponse,NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.order.findMany();
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to Fetch Products" },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.orders || !Array.isArray(body.orders) || body.orders.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    console.log("Received orders:", body.orders);

    const res = await prisma.order.createMany({
      data: body.orders,
    });

    return NextResponse.json({ message: "Orders created successfully", count: res.count }, { status: 201 });
  } catch (e: any) {
    console.error("Error in API route:", e.message);
    return NextResponse.json({ error: "Failed to create order", details: e.message }, { status: 500 });
  }
}


