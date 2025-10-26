import prisma from "@/lib/prisma";
import { createSlug } from "@/lib/utils";
import { CustomJWTPayload } from "@/types/types";
import { Course, Lesson } from "@prisma/client";
import { writeFileSync } from "fs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const formData = await req.formData();
    const file = formData.get("updateCourseFile") as File;
    const courseDetailRaw = formData.get("courseDetail");
    const lessonsRaw = formData.get("editLessons");
    const whatYouLearnRaw = formData.get("editWhatYouLearn");
    const requirementsRaw = formData.get("editRequirements");
    const courseDetail: Partial<Course> = courseDetailRaw
      ? JSON.parse(courseDetailRaw.toString())
      : {};
    const lessons: Partial<Lesson[]> = lessonsRaw
      ? JSON.parse(lessonsRaw.toString())
      : [];
    const whatYouLearn: string[] = whatYouLearnRaw
      ? JSON.parse(whatYouLearnRaw.toString())
      : [];
    const requirements: string[] = requirementsRaw
      ? JSON.parse(requirementsRaw.toString())
      : [];

    if (!token) {
      return NextResponse.json({ success: false, message: "token missing" });
    }

    if (
      !courseDetail.id ||
      !courseDetail.title ||
      !courseDetail.description ||
      !courseDetail.price ||
      !courseDetail.duration ||
      !courseDetail.category ||
      !courseDetail.keywords ||
      !courseDetail.profession ||
      courseDetail.profession.length <= 0 ||
      courseDetail.keywords.length <= 0 ||
      whatYouLearn?.length <= 0 ||
      requirements?.length <= 0
    ) {
      return NextResponse.json({
        success: false,
        message: "missing required fields",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const is_course = await prisma.course.findFirst({
      where: { id: courseDetail.id },
    });

    if (!is_course) {
      return NextResponse.json({
        success: false,
        message: "no such course found",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, file.name);

    writeFileSync(filePath, buffer);

    const image_path = `/uploads/${file.name}`;

    const slug = createSlug(courseDetail.title);
    const thumbnailUrl = image_path;

    const updated_course = await prisma.course.update({
      where: { id: is_course.id },
      data: {
        title: courseDetail.title,
        description: courseDetail.description,
        price:
          typeof courseDetail.price !== "number"
            ? parseFloat(courseDetail.price)
            : courseDetail.price,
        duration: courseDetail.duration,
        published: courseDetail.published ?? false,
        instructorId: token_data.id,
        thumbnailUrl,
        tag: courseDetail.tag,
        category: courseDetail.category,
        keywords: courseDetail.keywords,
        profession: courseDetail.profession,
        students: courseDetail.students ? courseDetail.students : null,
        rating: courseDetail.rating ? courseDetail.rating : null,
        reviews: courseDetail.reviews ? courseDetail.reviews : null,
        what_you_learn: whatYouLearn,
        requirements: requirements,
      },
    });

    if (!updated_course) {
      return NextResponse.json({
        success: false,
        message: "failed to update course",
      });
    }

    const updated_lessons = lessons.map(async (lesson) => {
      const updated_lesson = await prisma.lesson.update({
        where: { id: lesson?.id },
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
