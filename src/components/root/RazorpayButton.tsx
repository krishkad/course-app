// components/RazorpayButton.tsx
"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function RazorpayButton({
  userId,
  courseId,
  price,
}: {
  userId: string;
  courseId: string;
  price: number;
}) {
  const router = useRouter();
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  React.useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    console.log({ price, amount: Math.round(price * 100) });
    const response = await fetch("/api/payment/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: price, // ₹5.00
        userId: userId,
        courseId: courseId,
        provider: "razorypay",
        providerId: courseId,
      }),
      credentials: "include",
    });

    const data = await response.json();
    console.log({ data });

    if (!data.success) {
      alert("Failed to create Razorpay order");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from env, exposed
      amount: data.payment.amount,
      order_id: data.order.id,
      currency: "USD",
      name: "My App",
      description: "Test Transaction",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        console.log({ handlerResponse: response });
        // send payment confirmation to backend here
        const verifyResponse = await fetch("/api/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || data.orderId, // Fallback to stored order_id
            razorpay_signature: response.razorpay_signature,
            paymentId: data.payment.id,
          }),
        });

        const verifyResponseJson = await verifyResponse.json();

        console.log({ verifyResponseJson });
        router.refresh();
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: async function () {
          console.log("Payment modal closed by user.");
          // Notify backend of cancellation/failure
          await fetch("/api/payment/fail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: data.payment.id,
              reason: "Modal closed by user",
            }),
          });
        },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const razor = new (window as any).Razorpay(options);
    razor.open();
  };

  return (
    <Button
      className="w-full mb-6 bg-gradient-primary hover:opacity-90 shadow-glow h-12 text-lg"
      onClick={handlePayment}
    >
      Enroll Now
    </Button>
  );
}
