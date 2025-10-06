import prisma from "@/lib/prisma";
import { createSlug } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import { Course, Lesson } from "@prisma/client";
import { writeFileSync } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const courseDetailRaw = formData.get("courseDetail");
    const lessonsRaw = formData.get("lessons");
    const courseDetail: Partial<Course> = courseDetailRaw
      ? JSON.parse(courseDetailRaw.toString())
      : {};
    const lessons: Partial<Lesson[]> = lessonsRaw
      ? JSON.parse(lessonsRaw.toString())
      : [];
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    console.log({
      token,
      secret: process.env.NEXTAUTH_SECRET,
      courseDetail,
      lessons,
    });

    if (
      !courseDetail.title ||
      !courseDetail.description ||
      !courseDetail.price ||
      !courseDetail.duration ||
      !courseDetail.category ||
      !courseDetail.keywords ||
      courseDetail.keywords.length <= 0
    ) {
      return NextResponse.json({
        success: false,
        message: "missing required fields",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET! as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        message: "your not authorized",
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

    const course = await prisma.course.create({
      data: {
        title: courseDetail.title,
        description: courseDetail.description,
        price:
          typeof courseDetail.price !== "number"
            ? parseFloat(courseDetail.price)
            : courseDetail.price,
        duration: courseDetail.duration,
        published: courseDetail.published ?? false,
        slug,
        instructorId: token_data.id,
        thumbnailUrl,
        category: courseDetail.category,
        keywords: courseDetail.keywords,
        students: courseDetail.students ? courseDetail.students : null,
        rating: courseDetail.rating ? courseDetail.rating : null,
        reviews: courseDetail.reviews ? courseDetail.reviews : null,
      },
      include: {
        instructor: true,
      },
    });

    if (!course) {
      return NextResponse.json({
        success: false,
        message: "failed to create course",
      });
    }

    const add_instructor_name = () => {
      const { instructor, ...others } = course;
      const course_with_name = {
        instructor: `${instructor.fname} ${instructor.lname}`,
        ...others,
      };
      return course_with_name;
    };
    const course_with_instructor = add_instructor_name();

    const created_lessons = await Promise.all(
      lessons.map(async (lesson, i) => {
        const created_lesson = await prisma.lesson.create({
          data: {
            title: lesson?.title ?? "",
            content: lesson?.content,
            order: lesson?.order ?? i + 1,
            videoDuration: lesson?.videoDuration,
            videoUrl: lesson?.videoUrl,
            courseId: course.id,
            isPaid: lesson?.isPaid ?? true, // Optional default
          },
        });

        return created_lesson;
      })
    );

    if (!created_lessons || created_lessons.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "failed to create course lessons",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      data: course_with_instructor,
    });
  } catch (error) {
    console.log("ERROR WHILE CREATING COURSE: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
