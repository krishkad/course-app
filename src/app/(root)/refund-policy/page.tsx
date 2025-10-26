import Footer from "@/components/root/Footer";
import Navigation from "@/components/root/Navigation";
import React from "react";

const RefundPolicy = () => {
  return (
    <>
      <Navigation />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center">Refund Policy</h1>

        {/* Refund Policy */}
        <section className="space-y-4">
          <p>
            <strong>Effective Date:</strong> 25.10.25
          </p>
          <p>
            This Refund Policy explains the terms under which learners may
            request refunds for paid courses, subscriptions, or services.
          </p>

          <h3 className="font-semibold">1. General Policy</h3>
          <p>
            We strive for high-quality courses but may provide refunds under
            specific conditions.
          </p>

          <h3 className="font-semibold">2. Eligibility for Refunds</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Course access not provided within 48 hours: full refund.</li>
            <li>Duplicate payment: full refund.</li>
            <li>
              Course dissatisfaction within 7 days (less than 20% completed, no
              certificate issued).
            </li>
            <li>
              Technical issues preventing access that cannot be resolved in
              reasonable time.
            </li>
          </ul>

          <h3 className="font-semibold">3. Non-Refundable Cases</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Change of mind or lack of time.</li>
            <li>
              Courses purchased under discounts, bundles, or promotional offers.
            </li>
            <li>Failure to meet hardware/software requirements.</li>
            <li>Completion of over 20% of the course content.</li>
            <li>Subscription renewals already billed.</li>
          </ul>

          <h3 className="font-semibold">4. Refund Process</h3>
          <p>
            Contact support@[yourdomain].com with name, email, transaction ID,
            and reason. Refunds processed within 7–10 business days after
            approval.
          </p>

          <h3 className="font-semibold">5. Cancellation of Enrollment</h3>
          <p>
            Cancellations within 7 days may result in revocation of course
            access and applicable refunds.
          </p>

          <h3 className="font-semibold">6. Changes to This Policy</h3>
          <p>
            Policy updates may occur without prior notice. Continued use
            indicates acceptance.
          </p>

          <h3 className="font-semibold">7. Contact Information</h3>
          <p>📧 Email: support@[yourdomain].com</p>
          <p>📍 Address: [Company Name & Registered Office Address]</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RefundPolicy;
