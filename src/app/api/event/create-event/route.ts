import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import { Event } from "@prisma/client";
import path from "path";
import { writeFileSync } from "fs";
import { createSlug } from "@/lib/utils";

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
      isPaid,
      capacity,
      keywords,
      type,
      status
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
      isPaid,
      capacity,
      type,
      keywords,
      status
    });

    if (
      !title ||
      !description ||
      !location ||
      typeof price !== "number" ||
      !date ||
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
        price: isPaid ? price : 0,
        date: new Date(date),
        isPaid: isPaid ?? false,
        capacity,
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

    return NextResponse.json({ success: true, message: "ok", event });
  } catch (error) {
    console.log("ERROR WHILE CREATING EVENT: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
