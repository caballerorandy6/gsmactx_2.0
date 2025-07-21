import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //Create Response with token and admin data
    const response = NextResponse.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });

    // Set token in response headers
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
