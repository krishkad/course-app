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

    if (!token_data.id) {
      return NextResponse.json({ success: false, messae: "not authenticated" });
    }

    const get_user = await prisma.user.findFirst({
      where: { id: token_data.id },
    });

    if (!get_user) {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    return NextResponse.json({ success: true, message: "ok", data: get_user });
  } catch (error) {
    console.log("error getting user: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
