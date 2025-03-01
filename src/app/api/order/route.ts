import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET: Fetch all orders with items
 */
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (e) {
    console.error("Error fetching orders:", e);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

/**
 * POST: Create an order with items
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.userId || !body.email || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const order = await prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId: body.userId,
          email: body.email,
          status: "pending",
          total: body.total || 0, // Calculate dynamically if needed
          items: {
            create: body.items.map((item: any) => ({
              offerId: item.offerId || null,
              name: item.name,
              image: item.image,
              price: item.price,
              Qty: item.Qty || 1,
              category: item.category,
            })),
          },
        },
        include: { items: true },
      });

      return newOrder;
    });

    return NextResponse.json({ message: "Order created", order }, { status: 201 });
  } catch (e: any) {
    console.error("Error creating order:", e.message);
    return NextResponse.json(
      { error: "Failed to create order", details: e.message },
      { status: 500 }
    );
  }
}

