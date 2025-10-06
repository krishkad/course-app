import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const userId = req.nextUrl.searchParams.get("userId");
    const courseId = req.nextUrl.searchParams.get("courseId");
    const lessonId = req.nextUrl.searchParams.get("lessonId");

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.id !== userId) {
      return NextResponse.json({ success: false, message: "not authorized!" });
    }

    if (!userId || !courseId || !lessonId) {
      return NextResponse.json({
        success: false,
        message: "missing required fields!",
      });
    }

    const create_lesson_progress = await prisma.lessonProgress.create({
      data: { userId, lessonId, courseId },
    });

    if (!create_lesson_progress) {
      return NextResponse.json({
        success: false,
        message: "failed to create lesson progress",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      data: create_lesson_progress,
    });
  } catch (error) {
    console.log("error creating progress: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
