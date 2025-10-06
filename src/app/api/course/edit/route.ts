import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import { Lesson } from "@prisma/client";

export async function PUT(req: NextRequest) {
  try {
    const {
      title,
      description,
      price,
      duration,
      published,
      courseId,
      lessons,
    }: {
      title: string;
      description: string;
      price: number;
      duration: string;
      published: boolean;
      courseId: string;
      lessons: Lesson[];
    } = await req.json();
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "token missing" });
    }

    if (
      !title ||
      !description ||
      !price ||
      !duration ||
      typeof published !== "boolean" ||
      !courseId ||
      !lessons ||
      lessons.length <= 0
    ) {
      return NextResponse.json({ sucess: false, message: "missing fields!" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const is_course = await prisma.course.findFirst({
      where: { id: courseId },
    });

    if (!is_course) {
      return NextResponse.json({
        success: false,
        message: "no such course found",
      });
    }

    const updated_course = await prisma.course.update({
      where: { id: courseId },
      data: { title, description, price, duration, published },
    });

    if (!updated_course) {
      return NextResponse.json({
        success: false,
        message: "failed to update course",
      });
    }

    const updated_lessons = lessons.map(async (lesson) => {
      const updated_lesson = await prisma.lesson.update({
        where: { id: lesson.id },
        data: { ...lesson },
      });

      return updated_lesson;
    });

    if (!updated_lessons || updated_lessons.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "failed to update lessons",
      });
    }
    return NextResponse.json({
      success: true,
      message: "ok",
      data: updated_course,
    });
  } catch (error) {
    console.log("ERROR WHILE EDITING COURSE: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
