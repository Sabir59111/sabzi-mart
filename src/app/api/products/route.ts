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

export async function POST(req: NextRequest) {
      const body = await req.json();

  try {

    if (!body.name || !body.image || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields", missingFields: ["name", "image", "price", "category"].filter(f => !body[f]) },
        { status: 400 }
      );
    }

    const price = Number(body.price);
    const oldPrice = body.oldPrice ? Number(body.oldPrice) : null;

    if (isNaN(price) || (oldPrice !== null && isNaN(oldPrice))) {
      return NextResponse.json(
        { error: "Invalid price or oldPrice format. Must be a number." },
        { status: 400 }
      );
    }

    const res = await prisma.product.create({
      data: {
        name: body.name,
        image: body.image,
        price,
        category: body.category,
        oldPrice,
        isSoldOut: body.isSoldOut || false,
        discription: body.discription || null,
      },
    });

    return NextResponse.json(res, { status: 201 });

  } catch (error: any) {
    console.error("Error in API route:", error);

    // ✅ Handle Prisma errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A product with this name already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create product", details: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
