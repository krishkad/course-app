import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";
import prisma from "@/lib/prisma";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId, courseId, price, provider, providerId } = await req.json();
    const token = req.cookies.get("course-app-authentication")?.value;
    console.log({
      userId,
      courseId,
      price,
      provider,
      providerId,
      amount: price * 100,
    });
    if (!userId || !courseId || !price || !provider || !providerId) {
      return NextResponse.json({
        success: false,
        message: "missing required fields",
      });
    }

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.id !== userId) {
      return NextResponse.json({
        success: false,
        message: "not authenticated",
      });
    }

    const is_user_exist = await prisma.user.findFirst({
      where: { id: token_data.id },
    });

    if (!is_user_exist) {
      const response = NextResponse.json({
        success: false,
        message: "no user",
      });
      response.cookies.delete("course-app-authentication");
      return response;
    }

    const is_course_exist = await prisma.course.findFirst({
      where: { id: courseId },
    });

    if (!is_course_exist) {
      return NextResponse.json({
        success: false,
        message: "no course",
      });
    }

    const options = {
      amount: Math.round(is_course_exist.price * 100), // amount in smallest currency unit (paise)
      currency: "USD",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log({ order });
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: parseFloat(`${order.amount}`),
        provider,
        providerId,
        status: "PENDING",
        razorpay_order_id: is_course_exist.id
      },
    });

    console.log({ payment });

    if (!payment) {
      return NextResponse.json({
        success: false,
        message: "failed to create payment",
      });
    }

    const purchase = await prisma.purchase.create({
      data: {
        courseId,
        userId: is_user_exist.id,
        paymentId: payment.id,
      },
    });

    console.log({ purchase });
    if (!purchase) {
      return NextResponse.json({
        success: false,
        message: "failed to create purchase",
      });
    }

   

    return NextResponse.json({
      success: true,
      message: "ok",
      payment,
      purchase,
      order,
    });
  } catch (error) {
    console.log("ERROR WHILE BUYING COURSE: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
