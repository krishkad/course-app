import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "no token found" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const users = await prisma.user.findMany();

    if (!users || users.length <= 0) {
      return NextResponse.json({ success: false, message: "users not found" });
    }
    const filterd_users = users.map((user) => {
      const { password: _, ...others } = user;

      return others;
    });

    if (!filterd_users || filterd_users.length <= 0) {
      return NextResponse.json({ success: false, message: "users not found" });
    }

    return NextResponse.json({success: true,messae: "ok", data: filterd_users})
  } catch (error) {
    console.log("ERROR WHILE GETTING ALL USERS: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
