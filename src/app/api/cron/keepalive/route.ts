import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simple query to keep database connection alive
    await prisma.$queryRaw`SELECT 1`;

    const timestamp = new Date().toISOString();

    console.log(`[Keep-Alive] Database ping successful at ${timestamp}`);

    return NextResponse.json({
      success: true,
      message: "Database is alive and healthy",
      timestamp,
    });
  } catch (error) {
    console.error("[Keep-Alive] Database ping failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database ping failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
