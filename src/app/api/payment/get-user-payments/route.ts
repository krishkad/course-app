import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const userId = req.nextUrl.searchParams.get("userId");

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!userId) {
      return NextResponse.json({ success: false, message: "missing userId!" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id ) {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const payments = await prisma.payment.findMany({
      where: { userId: token_data.id },
    });

    if (!payments || payments.length <= 0) {
      return NextResponse.json({ success: false, message: "no payment found" });
    }

    return NextResponse.json({ success: true, message: "ok", data: payments });
  } catch (error) {
    console.log("error getting user payments: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
