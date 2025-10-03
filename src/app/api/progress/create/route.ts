import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { courseId, userId, lessonId } = await req.json();
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!courseId || !userId || !lessonId) {
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
      return NextResponse.json({ success: false, message: "not authorized!" });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    const course = await prisma.course.findFirst({
      where: { id: courseId },
      include: { lessons: true },
    });

    if (!course) {
      return NextResponse.json({ success: false, message: "no course found" });
    }

    const purchase = await prisma.purchase.findFirst({
      where: { userId: user.id, courseId: course.id },
      include: { payment: true },
    });

    if (!purchase?.paymentId || purchase.payment?.status !== "SUCCESS") {
      return NextResponse.json({ success: false, message: "not course found" });
    }

    const lesson = course.lessons.filter((les) => les.id === lessonId);

    if (!lesson) {
      return NextResponse.json({ success: false, message: "no lesson found" });
    }

    const progress_lesson = await prisma.lessonProgress.create({
      data: {
        courseId: course.id,
        lessonId: lesson[0].id,
        userId: token_data.id,
      },
    });

    if (!progress_lesson) {
      return NextResponse.json({
        success: false,
        message: "failed to ceaate progress lesson",
      });
    }

    return NextResponse.json({ success: true, message: "ok", progress_lesson });
  } catch (error) {
    console.log("ERROR WHILE CREATING PROGRESS: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
