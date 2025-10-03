import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token" });
    }

   

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const is_user = await prisma.user.findMany({
      where: { id: token_data.id },
    });

    if (!is_user) {
      return NextResponse.json({
        success: false,
        message: "no such user found",
      });
    }

    const payments = await prisma.payment.findMany({
      include: {
        purchases: true,
      },
    });

    if (!payments || payments.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "no payments made!",
      });
    }

    return NextResponse.json({ success: true, message: "ok", data: payments });
  } catch (error) {
    console.log("ERROR WHILE GETTING PURCHASE: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
