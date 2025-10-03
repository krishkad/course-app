import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const courseId = req.nextUrl.searchParams.get("courseId");
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!userId || !courseId) {
      return NextResponse.json({
        success: false,
        message: "missing required params!",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.id !== userId) {
      return NextResponse.json({
        success: false,
        message: "not authentication",
      });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    const course = await prisma.course.findFirst({ where: { id: courseId } });

    if (!course) {
      return NextResponse.json({ success: false, message: "no course found" });
    }

    const lessonsProgress = await prisma.lessonProgress.findMany({
      where: { userId: user.id, courseId: course.id },
    });

    if (!lessonsProgress || lessonsProgress.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "no lesson progress foound",
      });
    }

    return NextResponse.json({ success: true, message: "ok", lessonsProgress });
  } catch (error) {
    console.log("ERROR WHILE GETTING COURSE PROGRESS: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
