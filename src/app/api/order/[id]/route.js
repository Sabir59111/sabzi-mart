import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
    try {
      const { id } =  params;
      const { status } = await req.json();
  
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status },
      });
  
      return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
      console.error("Error updating order:", error);
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
  }