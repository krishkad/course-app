import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized!" });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    const events = await prisma.event.findMany({
      include: { organizer: true },
    });

    if (!events || events.length <= 0) {
      return NextResponse.json({ success: false, message: "no events found" });
    }

    const events_with_organizer = events
      .map((event) => {
        const { organizer, ...others } = event;
        const course_with_instructor = {
          ...others,
          organizer_name: `${organizer.fname} ${organizer.lname}`,
        };
        return course_with_instructor;
      });

    return NextResponse.json({ success: true, message: "ok", data: events_with_organizer });
  } catch (error) {
    console.log("ERROR WHILE GETTING ADMIN SIDE EVENTS: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
