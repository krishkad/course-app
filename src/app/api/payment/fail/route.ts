import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { paymentId } = await req.json();

    // Update payment status in database
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: "FAILED" },
    });

    return NextResponse.json(
      { success: true, message: "Payment failed" },
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
