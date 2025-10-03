import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const courseId = req.nextUrl.searchParams.get("courseId");

    if (!token) {
      return NextResponse.json({ success: false, message: "not authorised" });
    }

    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: "course id missing",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id) {
      return NextResponse.json({ success: false, message: "token expired" });
    }

    const delete_course = await prisma.course.delete({
      where: { instructorId: token_data.id, id: courseId },
    });

    if (!delete_course) {
      return NextResponse.json({
        success: false,
        message: "failed to delete course",
      });
    }

    return NextResponse.json({ success: true, message: "ok" });
  } catch (error) {
    console.log("ERROR WHILE DELETING COURSE: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error ",
    });
  }
}
