import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";

export async function PUT(req: NextRequest) {
  try {
    const { title, description, price, duration, published, courseId } =
      await req.json();
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "token missing" });
    }

    if (
      !title ||
      !description ||
      !price ||
      !duration ||
      !published ||
      !courseId
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
