import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const user = await getCurrentUser(cookieStore.get("token")?.value);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        subject: true,
        content: true,
        imageUrl: true,
        sent: true,
        createdAt: true,
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
