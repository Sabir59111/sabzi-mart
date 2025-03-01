import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  try {
    const { id } = params; 
    const { status, userId } = await req.json();

    console.log("Updating Order:", { id, userId, status });

    const order = await prisma.order.update({
      where: {
        id: id,
        userId: userId, // Ensure order belongs to the user
      },
      data: { status },
      include: { items: true }, // Include order items
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
