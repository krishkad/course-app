import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import { Event } from "@prisma/client";
import path from "path";
import { writeFileSync } from "fs";
import { createSlug } from "@/lib/utils";
import { IEvent } from "@/redux/slices/events";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const fromData = await req.formData();
    const file = fromData.get("file") as File;
    const eventData = fromData.get("eventData");
    const {
      title,
      description,
      location,
      price,
      date,
      time,
      duration,
      isPaid,
      capacity,
      keywords,
      type,
      status,
    }: Partial<Event> = eventData ? JSON.parse(eventData.toString()) : {};

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token" });
    }

    console.log({
      title,
      description,
      location,
      price,
      date,
      time,
      duration,
      isPaid,
      capacity,
      type,
      keywords,
      status,
    });

    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !date ||
      !time ||
      !duration ||
      !capacity ||
      !type ||
      !keywords ||
      keywords.length <= 0 ||
      !status
    ) {
      return NextResponse.json({
        success: false,
        message: "missing required fields",
      });
    }

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "missing thumbnail!",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, message: "not user found" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, file.name);

    writeFileSync(filePath, buffer);

    const image_path = `/uploads/${file.name}`;

    const slug = createSlug(title);
    const thumbnailUrl = image_path;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        slug,
        location,
        time,
        price: isPaid
          ? typeof price === "string"
            ? parseFloat(price)
            : price
          : 0,
        date: new Date(date),
        duration,
        isPaid: isPaid ?? false,
        capacity: typeof capacity === "string" ? parseInt(capacity) : capacity,
        thumbnailUrl,
        type,
        keywords,
        status,
        organizerId: user.id,
      },
    });

    if (!event) {
      return NextResponse.json({
        success: false,
        message: "failed to create event",
      });
    }

    const event_with_organizer_name = {
      ...event,
      organizer_name: `${user.fname} ${user.lname}`,
    };

    console.log(event_with_organizer_name as IEvent);

    return NextResponse.json({
      success: true,
      message: "ok",
      data: event_with_organizer_name,
    });
  } catch (error) {
    console.log("ERROR WHILE CREATING EVENT: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
