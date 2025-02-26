import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    let res = await prisma.offers.findMany();
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to Fetch Deals" },
      { status: 500 }
    );
  }
}
