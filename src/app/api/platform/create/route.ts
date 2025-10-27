import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;

    const { platformName, supportEmail } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!supportEmail || !platformName) {
      return NextResponse.json({
        success: false,
        message: "missing required fields!",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        message: "not authenticated",
      });
    }

    const admin = await prisma.user.findFirst({
      where: { id: token_data.id, role: "ADMIN" },
    });

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "not authenticated",
      });
    }

    const platform = await prisma.platformSettings.create({
      data: { platformName, supportEmail },
    });

    if (!platform) {
      return NextResponse.json({
        success: false,
        message: "failed to create platform settings",
      });
    }

    return NextResponse.json({ success: true, message: "ok", data: platform });
  } catch (error) {
    console.log("error creating platform settings: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
