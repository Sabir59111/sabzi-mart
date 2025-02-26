import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function GET() {
  try {
    let res = await prisma.product.findMany();
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to Fetch Products" },
      { status: 500 }
    );
  }
}
