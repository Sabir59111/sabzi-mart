import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
    try {
      const body = await req.json();
      const {id} =await  params; 
  
      console.log("body", body);
      if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
      }
  
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name: body.name,
          image: body.image,
          price: body.price,
          category: body.category,
          oldPrice: body.oldPrice,
          isSoldOut: body.isSoldOut,
        },
      });
  
      return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
      console.error("Error updating product:", error);
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
  }



export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
