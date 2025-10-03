import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

function generateRandomSixDigitNumber(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "email is missing" });
    }

    const is_user = await prisma.user.findFirst({ where: { email } });

    if (is_user) {
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    }

    const code = generateRandomSixDigitNumber();

    const token = bcrypt.hashSync(`${code}`, 10);
    console.log({ code });

    const response = NextResponse.json({
      success: true,
      message: "code sent!",
    });

    response.cookies.set("verify-email-token", token);
    return response;
  } catch (error) {
    console.log("ERROR WHILE CREATING USER: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
