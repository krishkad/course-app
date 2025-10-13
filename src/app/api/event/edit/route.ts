import { CustomJWTPayload } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { IEvent } from "@/redux/slices/events";
import path from "path";
import { writeFileSync } from "fs";
import { createSlug } from "@/lib/utils";

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const fromData = await req.formData();
    const update_data = fromData.get("updateEventDetail");
    const {
      id,
      title,
      description,
      location,
      price,
      date,
      isPaid,
      capacity,
      type,
      time,
      duration,
      keywords,
      status,
      organizer_name,
    }: IEvent = update_data ? JSON.parse(update_data.toString()) : {};
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
      !capacity ||
      !id ||
      !type ||
      !time ||
      !duration ||
      !keywords ||
      !status ||
      !organizer_name
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

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, message: "not user found" });
    }

    const existing_event = await prisma.event.findFirst({
      where: { id: id },
    });

    if (!existing_event || !existing_event.thumbnailUrl) {
      return NextResponse.json({
        success: false,
        message: "no such event found",
      });
    }

    let thumbnailUrl;
    let new_slug;
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, file.name);

      writeFileSync(filePath, buffer);

      const image_path = `/uploads/${file.name}`;

      const slug = createSlug(title);
      new_slug = slug;
      thumbnailUrl = image_path;
    }
    const updated_event = await prisma.event.update({
      where: { id },
      data: {
        slug: title !== existing_event.title ? new_slug : existing_event.slug,
        title,
        description,
        location,
        price,
        isPaid,
        date,
        capacity,
        thumbnailUrl:
          file && file.name ? thumbnailUrl : existing_event.thumbnailUrl,
        duration,
        type,
        time,
        keywords,
        status,
      },
    });

    if (!updated_event) {
      return NextResponse.json({
        success: false,
        message: "failed to update event",
      });
    }

    const updated_event_with_organizer_name = {
      ...updated_event,
      organizer_name,
    };

    return NextResponse.json({
      success: true,
      message: "ok",
      data: updated_event_with_organizer_name,
    });
  } catch (error) {
    console.log("ERROR WHILE EDITTING EVENT: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
