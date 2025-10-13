import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const eventId = req.nextUrl.searchParams.get("eventId");

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    if (!eventId) {
      return NextResponse.json({ success: false, message: "missing event id" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const user = await prisma.event.findFirst({
      where: { id: eventId},
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    const delete_event = await prisma.event.delete({
      where: { id: eventId},
    });

    if (!delete_event) {
      return NextResponse.json({
        success: false,
        message: "failed to delete event!",
      });
    }

    return NextResponse.json({ success: true, message: "ok" });
  } catch (error) {
    console.log("ERROR WHILE DELETING EVENT: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
