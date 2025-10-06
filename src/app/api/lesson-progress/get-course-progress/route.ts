import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const userId = req.nextUrl.searchParams.get("userId");
    const courseId = req.nextUrl.searchParams.get("courseId");

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!userId || !courseId) {
      return NextResponse.json({
        success: false,
        message: "missing required fields",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.id !== userId) {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const course_progresses = await prisma.lessonProgress.findMany({
      where: { courseId, userId },
    });

    if (!course_progresses || course_progresses.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "progress not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      data: course_progresses,
    });
  } catch (error) {
    console.log("error getting course progress: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
