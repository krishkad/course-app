import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const courses = await prisma.course.findMany({
      include: { instructor: true },
    });

    if (!courses || courses.length <= 0) {
      return NextResponse.json({ success: false, message: "no course found!" });
    }

    const courses_with_instructor = courses.map((course) => {
      const { instructor, ...others } = course;
      return {
        ...others,
        instructor: `${instructor.fname} ${instructor.lname}`,
      };
    });

    return NextResponse.json({
      success: true,
      message: "ok",
      data: courses_with_instructor,
    });
  } catch (error) {
    console.log("ERROR WHILE GETTING ALL COURSES FOR ADMIN: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
