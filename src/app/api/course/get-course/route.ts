import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const courseId = req.nextUrl.searchParams.get("courseId");
    const userId = req.nextUrl.searchParams.get("userId");

    console.log({ courseId });
    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: "course id missing",
      });
    }

    const course = await prisma.course.findFirst({
      where: { id: courseId },
      include: {Rating: true}
    });

    if (!course) {
      return NextResponse.json({
        success: false,
        message: "no such course found",
      });
    }

    const lessons = await prisma.lesson.findMany({
      where: { courseId: course.id },
    });

    const display_course_lessons = lessons.map((lesson) => {
      if (lesson.isPaid === true) {
        const { videoUrl, content, ...others } = lesson;
        return others;
      } else {
        return lesson;
      }
    });

    if (token) {
      const token_data = jwt.verify(
        token as string,
        process.env.NEXTAUTH_SECRET as string
      ) as CustomJWTPayload;

      if (!token_data.id) {
        return NextResponse.json({
          success: false,
          message: "token expired",
          course,
          lessons: display_course_lessons,
        });
      }

      if (token_data.role !== "ADMIN" && token_data.id !== userId) {
        console.log({ token_id: token_data.id, userId });
        return NextResponse.json({
          success: true,
          message: "display course",
          course,
          lessons: display_course_lessons,
        });
      }

      const admin = await prisma.user.findFirst({
        where: { id: token_data.id },
      });

      if (!admin) {
        return NextResponse.json({
          success: false,
          message: "no admin found",
          course,
          lessons: display_course_lessons,
        });
      }

      if (token_data.role === "ADMIN" && admin.role === "ADMIN") {
        return NextResponse.json({
          success: true,
          message: "admin response",
          course,
          lessons,
        });
      }

      const purchase = await prisma.purchase.findFirst({
        where: { courseId: course.id, userId: token_data.id },
        include: { payment: true },
      });

      console.log({purchase, payment: purchase?.payment})

      if (!purchase) {
        return NextResponse.json({
          success: true,
          message: "no purchase display course",
          course,
          lessons: display_course_lessons,
        });
      }
      console.log({ status: purchase.payment?.status });

      if (purchase.payment?.status !== "SUCCESS") {
        return NextResponse.json({
          success: true,
          message: "payment is not successful",
          course,
          lessons: display_course_lessons,
        });
      }

      return NextResponse.json({
        success: true,
        message: "ok",
        course,
        lessons,
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      course,
      lessons: display_course_lessons,
    });
  } catch (error) {
    console.log("ERROR WHILE GETTING FULL COURSE: ", error);

    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
