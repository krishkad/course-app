import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const eventId = req.nextUrl.searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({
        success: false,
        message: "missing event id!",
      });
    }

    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ success: false, message: "event not found!" });
    }

    const admin_user = await prisma.user.findFirst({
      where: { id: event.organizerId },
    });

    if (!admin_user) {
      return NextResponse.json({ success: false, message: "user not found!" });
    }

    const event_with_organizer = {
      ...event,
      organizer_name: `${admin_user.fname} ${admin_user.lname}`,
    };
    return NextResponse.json({
      success: true,
      message: "ok",
      event: event_with_organizer,
    });
  } catch (error) {
    console.log("ERROR WHILE GETTING SINGLE EVENT: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
