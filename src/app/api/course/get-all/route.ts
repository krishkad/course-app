import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      include: { instructor: true, Rating: true },
    });

    if (!courses || courses.length <= 0) {
      return NextResponse.json({ success: false, message: "no courses found" });
    }

    const published_courses = courses
      .filter((course) => course.published)
      .map((course) => {
        const { instructor, ...others } = course;
        return {
          ...others,
          instructor: `${instructor.fname} ${instructor.lname}`,
        };
      });

    return NextResponse.json({
      success: true,
      message: "ok",
      data: published_courses,
    });
  } catch (error) {
    console.log("ERROR WHILE GETTING ALL COURSE: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
