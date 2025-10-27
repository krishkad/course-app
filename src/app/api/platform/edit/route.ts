import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const { id, platformName, supportEmail } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!id || !platformName || !supportEmail) {
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

    const existingPlatform = await prisma.platformSettings.findUnique({
      where: { id },
    });

    if (!existingPlatform) {
      return NextResponse.json({
        success: false,
        message: "platform settings not found",
      });
    }

    const updatedPlatform = await prisma.platformSettings.update({
      where: { id },
      data: {
        platformName,
        supportEmail,
      },
    });

    if (!updatedPlatform) {
      return NextResponse.json({
        success: false,
        message: "failed to update platform settings",
      });
    }

    return NextResponse.json({
      success: true,
      message: "platform settings updated successfully",
      data: updatedPlatform,
    });
  } catch (error) {
    console.error("error updating platform settings: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
