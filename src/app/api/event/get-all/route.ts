import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: { organizer: true },
    });

    if (!events || events.length <= 0) {
      return NextResponse.json({ success: false, message: "no events found" });
    }

    const events_with_organizer = events
      .filter((event) => event.status !== "draft")
      .map((event) => {
        const { organizer, ...others } = event;
        const course_with_instructor = {
          ...others,
          organizer_name: `${organizer.fname} ${organizer.lname}`,
        };
        return course_with_instructor;
      });

    return NextResponse.json({
      success: true,
      message: "ok",
      data: events_with_organizer,
    });
  } catch (error) {
    console.log("ERROR WHILE GETTING ALL EVENTS: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
