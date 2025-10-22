import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const { stars, eventId, content } = await req.json();
    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!stars || !eventId) {
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
    
    const is_event = await prisma.event.findFirst({
      where: { id: eventId },
    });

    if (!is_event) {
      return NextResponse.json({ success: false, message: "no such event" });
    }

    const rating = await prisma.rating.create({
      data: {
        eventId: is_event.id,
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
