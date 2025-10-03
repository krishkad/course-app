import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const { userId, email, eventId } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!userId || !eventId || !email) {
      return NextResponse.json({
        success: false,
        message: "missing required fields!",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.id !== userId) {
      return NextResponse.json({ success: false, message: "not authorized!" });
    }

    const user = await prisma.user.findFirst({
      where: { id: token_data.id, email: email },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "user not found!" });
    }

    const event = await prisma.event.findFirst({ where: { id: eventId } });

    if (!event) {
      return NextResponse.json({ success: false, message: "event not found!" });
    }

    const event_registration = await prisma.eventRegistration.create({
      data: {
        userId: user.id,
        eventId: event.id,
      },
    });

    if (!event_registration) {
      return NextResponse.json({
        success: false,
        message: "failed to register!",
      });
    }

    return NextResponse.json({
      success: true,
      message: "ok",
      event_registration,
    });
  } catch (error) {
    console.log("ERROR WHILE EVENT REGISTRATION: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
