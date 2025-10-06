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
      return NextResponse.json({ success: false, message: "missing userId" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.id !== userId) {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const lessons_progresses = await prisma.lessonProgress.findMany({
      where: { userId: token_data.id },
    });

    if (!lessons_progresses || lessons_progresses.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "no progress found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      data: lessons_progresses,
    });
  } catch (error) {
    console.log("error getting all lessons progress: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
