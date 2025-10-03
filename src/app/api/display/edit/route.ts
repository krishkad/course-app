import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { view_courses, view_events, display_id } = await req.json();
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!view_courses || !view_events || !display_id) {
      return NextResponse.json({
        success: false,
        message: "missing required fields",
      });
    }

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role === "ADMIN") {
      return NextResponse.json({
        success: false,
        message: "not authenticated",
      });
    }

    const admin_exist = await prisma.user.findFirst({
      where: { id: token_data.id },
    });

    if (!admin_exist) {
      return NextResponse.json({ success: false, message: "user not found" });
    }

    const updated_display = await prisma.display.update({
      where: { id: admin_exist.id },
      data: { view_courses, view_events },
    });

    if (!updated_display) {
      return NextResponse.json({
        success: false,
        message: "failed to update display",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      display: updated_display,
    });
  } catch (error) {
    console.log("ERROR WHILE EDITTING DISPLAY: ", error);
  }
}
