import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.product.findMany();
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to Fetch Products" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.image || !body.price || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const res = await prisma.product.create({
      data: {
        name: body.name,
        image: body.image,
        price: Number(body.price),
        category: body.category,
        oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
        isSoldOut: body.isSoldOut,
      },
    });

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error("Error in API route:", e);
    return NextResponse.json({ error: "Failed to Create Product", details: e.message }, { status: 500 });
  }
}
