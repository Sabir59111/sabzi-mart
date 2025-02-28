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
   

    const order = await req.json();
    console.log(order.orders);


   

    const res = await prisma.order.createMany({
      data: order.orders,
    });

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error("Error in API route:", e);
    return NextResponse.json({ error: "Failed to create order", details: "" }, { status: 500 });
  }
}

