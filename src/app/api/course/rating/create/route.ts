import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const { stars, courseId, content } = await req.json();
    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!stars || !courseId) {
      return NextResponse.json({
        success: false,
        message: "missing required fields",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id) {
      return NextResponse.json({ success: false, message: "token expired!" });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, message: "no such user" });
    }
    const is_course = await prisma.course.findFirst({
      where: { id: courseId },
    });

    if (!is_course) {
      return NextResponse.json({ success: false, message: "no such course" });
    }

    const is_purchase = await prisma.purchase.findMany({
      where: { courseId: is_course.id, userId: user.id },
      include: { payment: true },
    });

    console.log(
      !is_purchase,
      is_purchase.find((purchase) => purchase.payment?.status === "SUCCESS")
        ?.payment?.status !== "SUCCESS"
    );

    if (
      !is_purchase ||
      is_purchase.find((purchase) => purchase.payment?.status === "SUCCESS")
        ?.payment?.status !== "SUCCESS"
    ) {
      return NextResponse.json({
        success: false,
        message: "no purchase found",
      });
    }

    const rating = await prisma.rating.create({
      data: {
        courseId: is_course.id,
        rating: stars,
        content,
        userId: user.id,
      },
    });

    if (!rating) {
      return NextResponse.json({
        success: false,
        message: "failed to create rating",
      });
    }

    return NextResponse.json({ success: true, message: "ok", rating });
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "error creating rating:");
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
