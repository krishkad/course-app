import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      paymentId,
    } = await req.json();
    const crypto = await import("crypto");

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (payment.order_id !== razorpay_order_id) {
      return NextResponse.json(
        { success: false, message: "Order ID mismatch" },
        { status: 400 }
      );
    }

    // Verify amount
    const order = await razorpay.orders.fetch(razorpay_order_id);
    if (payment.amount !== order.amount) {
      return NextResponse.json(
        { success: false, message: "Amount mismatch" },
        { status: 400 }
      );
    }

    // Update payment status in database
    const updated_payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "SUCCESS",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
      include: { purchases: true },
    });

    const is_course_exist = await prisma.course.findFirst({
      where: { id: updated_payment.purchases[0].courseId ?? "" },
    });

    if (!is_course_exist) {
      return NextResponse.json({
        success: false,
        message: "no course",
      });
    }

    await prisma.course.update({
      where: { id: updated_payment.purchases[0].courseId ?? "" },
      data: {
        students: `${
          parseInt(is_course_exist.students ? is_course_exist.students : "0") +
          1
        }`,
      },
    });

    return NextResponse.json(
      { success: true, message: "Payment verified" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PAYMENT VERIFICATION ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Payment verification failed",
        error: error,
      },
      { status: 500 }
    );
  }
}
