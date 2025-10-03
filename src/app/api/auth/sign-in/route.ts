import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "missing fields" });
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    const is_password = bcrypt.compareSync(password, user.password);

    if (!is_password) {
      return NextResponse.json({
        success: false,
        message: "invalid credentials",
      });
    }

    const { password: _, ...others } = user;

    const token_data = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(token_data, process.env.NEXTAUTH_SECRET as string);
    const response = NextResponse.json({
      success: true,
      message: "ok",
      data: others,
    });
    response.cookies.set("course-app-authentication", token);
    return response;
  } catch (error) {
    console.log("ERROR WHILE LOGINING IN: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
