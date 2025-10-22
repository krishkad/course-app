import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("course-app-authentication")?.value;
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      paymentId,
      eventId,
    } = await req.json();
    const crypto = await import("crypto");

    console.log({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      paymentId,
      eventId,
    });

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token!" });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id) {
      return NextResponse.json({ success: false, message: "token expired" });
    }
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
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "SUCCESS",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
    });

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, messsage: "user not found" });
    }

    console.log({ razorpay_order_id });

    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });
    console.log({ event });

    if (!event) {
      return NextResponse.json({ success: false, message: "event not found!" });
    }

    const event_registration = await prisma.eventRegistration.create({
      data: {
        userId: user.id,
        eventId: event.id,
        paymentId: paymentId,
      },
    });

    if (!event_registration) {
      return NextResponse.json({
        success: false,
        message: "failed to register!",
      });
    }

    const update_event_registration_count = await prisma.event.update({
      where: { id: event.id },
      data: {
        registered:
          typeof event.registered === "string"
            ? parseInt(event.registered) + 1
            : typeof event.registered === "number"
            ? event.registered + 1
            : 1,
      },
    });

    console.log({ update_event_registration_count });

    if (!update_event_registration_count) {
      return NextResponse.json({
        success: false,
        message: "failed to update registration count",
      });
    }

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
