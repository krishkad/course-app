import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const platformSettings = await prisma.platformSettings.findFirst();

    if (!platformSettings) {
      return NextResponse.json({
        success: false,
        message: "no platform settings found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      data: platformSettings,
    });
  } catch (error) {
    console.log("error getting platform: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
