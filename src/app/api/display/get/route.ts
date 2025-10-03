import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const display = await prisma.display.findFirst();

    if (!display) {
      return NextResponse.json({
        success: false,
        message: "display not found",
        display: { view_course: true, view_events: false },
      });
    }

    return NextResponse.json({ success: true, message: "ok", display });
  } catch (error) {
    console.log("ERROR WHILE GETTING DISPLAY: ", error);
    return NextResponse.json({
      success: true,
      message: "Internal server error",
    });
  }
}
