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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from env, exposed
      amount: price * 100,
      currency: "USD",
      name: "My App",
      description: "Test Transaction",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: function (response: any) {
        alert("Payment Successful!");
        console.log(response);
        // send payment confirmation to backend here
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const razor = new (window as any).Razorpay(options);
    razor.open();
    const res = await fetch("/api/payment/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: price, // ₹5.00
        userId: userId,
        courseId: courseId,
        provider: "razorypay",
        providerId: courseId,
      }),
    });

    const data = await res.json();
    console.log({ data });

    if (!data.success) {
      alert("Failed to create Razorpay order");
      return;
    }

    router.refresh();
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
