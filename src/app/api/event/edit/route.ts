import { CustomJWTPayload } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const {
      title,
      description,
      location,
      price,
      date,
      isPaid,
      capacity,
      eventId,
    } = await req.json();
    const fromData = await req.formData();
    const file = fromData.get("file") as File;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token" });
    }

    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !date ||
      !isPaid ||
      !capacity
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

    if (token_data.id || token_data.role === "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, message: "not user found" });
    }

    const existing_event = await prisma.event.findFirst({
      where: { id: eventId, organizerId: token_data.id },
    });

    if (!existing_event || !existing_event.thumbnailUrl) {
      return NextResponse.json({
        success: false,
        message: "no such event found",
      });
    }

    const thumbnailUrl = "";
    const updated_event = await prisma.event.update({
      where: { id: eventId, organizerId: token_data.id },
      data: {
        title,
        description,
        location,
        price,
        isPaid,
        date,
        capacity,
        thumbnailUrl: file ? thumbnailUrl : existing_event.thumbnailUrl,
      },
    });

    if (!updated_event) {
      return NextResponse.json({
        success: false,
        message: "failed to update event",
      });
    }

    return NextResponse.json({
      success: false,
      message: "ok",
      event: updated_event,
    });
  } catch (error) {
    console.log("ERROR WHILE EDITTING EVENT: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
