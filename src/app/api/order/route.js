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


export async function POST(req) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ["userId", "email", "name", "image", "price", "category"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Create the order in the database
    const res = await prisma.order.create({
      data: {
        userId: body.userId,     
        email: body.email,
        name: body.name,
        image: body.image,
        price: body.price,
        customQty: body.customQty || 1,
        regularQty: body.regularQty || 1,
        InRupess: body.InRupess || 0,
        category: body.category,
      },
    });

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error("Error in API route:", e);
    return NextResponse.json({ error: "Failed to create order", details: e.message }, { status: 500 });
  }
}

