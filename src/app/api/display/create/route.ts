import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { view_courses, view_events } = await req.json();
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (
      typeof view_courses !== "boolean" ||
      typeof view_courses !== "boolean"
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

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const display = await prisma.display.create({
      data: { view_courses, view_events },
    });

    if (!display) {
      return NextResponse.json({
        success: false,
        messae: "failed to create display",
      });
    }

    return NextResponse.json({ success: true, message: "ok", data: display });
  } catch (error) {
    console.log("error creating dispaly: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
