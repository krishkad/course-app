import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const userId = req.nextUrl.searchParams.get("userId");

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token" });
    }
    if (!userId) {
      return NextResponse.json({ success: false, message: "missing user id" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const delete_user = await prisma.user.delete({ where: { id: userId } });

    if (!delete_user) {
      return NextResponse.json({
        success: false,
        message: "failed to delete user",
      });
    }

    return NextResponse.json({ success: true, message: "ok" });
  } catch (error) {
    console.log("ERROR WHILE DELETING USER: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
