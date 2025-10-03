import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const code_token = req.cookies.get("verify-email-token")?.value;

    const { code, fname, lname, email, password, profession } =
      await req.json();

    if (!code) {
      return NextResponse.json({ success: false, message: "code missing!" });
    }

    if (!code_token) {
      return NextResponse.json({ success: false, message: "token missing!" });
    }

    if (!fname || !lname || !email || !password || !profession) {
      return NextResponse.json({ success: false, message: "missing fields" });
    }
    console.log({ code_token });
    const is_code = bcrypt.compareSync(`${code}`, code_token);
    console.log({ is_code });

    if (!is_code) {
      return NextResponse.json({ success: false, message: "incorrect code" });
    }

    const is_user = await prisma.user.findFirst({ where: { email } });

    if (is_user) {
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    }

    const hashed_password = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: { fname, lname, email, password: hashed_password, profession },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "failed to create user",
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
    console.log("ERROR WHILE VERIFING EMAIL: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
