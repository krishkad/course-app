import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "@/types/types";

export async function PUT(req: NextRequest) {
  try {
    const { amount, status, courseId, userId, paymentId } = await req.json();
    const token = req.cookies.get("course-app-authentication")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "missing token" });
    }

    if (!amount || !status || !courseId || !userId || !paymentId) {
      return NextResponse.json({
        success: false,
        messaeg: "missing required fields",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as CustomJWTPayload;

    if (!token_data.id || token_data.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    const payment = await prisma.payment.findFirst({
      where: { id: paymentId },
      include: { purchases: true },
    });

    if (!payment) {
      return NextResponse.json({ success: false, message: "no payment found" });
    }

    const edited_payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        amount,
        status,
      },
    });

    if (
      !edited_payment ||
      !edited_payment.id ||
      payment.purchases.length <= 0
    ) {
      return NextResponse.json({
        success: false,
        message: "failed to update payment",
      });
    }

    const upddated_purchase = await prisma.purchase.update({
      where: { id: payment.purchases[0].id },
      data: {
        courseId,
      },
    });

    if (!upddated_purchase) {
      return NextResponse.json({
        success: false,
        message: "failed to update puchase",
      });
    }

    return NextResponse.json({
      success: false,
      message: "update successful",
      payment: edited_payment,
      purchase: upddated_purchase,
    });
  } catch (error) {
    console.log("ERROR WHILE EDITING PAYMENTS: ", error);
    return NextResponse.json({
      succeess: false,
      message: "Internal server error",
    });
  }
}
