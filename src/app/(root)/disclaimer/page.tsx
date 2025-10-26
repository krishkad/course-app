import Footer from "@/components/root/Footer";
import Navigation from "@/components/root/Navigation";
import React from "react";

const Disclaimer = () => {
  return (
    <>
      <Navigation />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center">Disclaimer</h1>

        {/* Disclaimer */}
        <section className="space-y-4">
          <p>
            <strong>Effective Date:</strong> 25.10.25
          </p>
          <p>
            Information, courses, and resources are for educational purposes
            only.
          </p>

          <h3 className="font-semibold">1. Educational Purpose</h3>
          <p>
            All content is designed to help users understand and apply AI
            concepts professionally. No guaranteed outcomes.
          </p>

          <h3 className="font-semibold">2. No Professional or Legal Advice</h3>
          <p>
            Materials do not constitute professional, legal, medical, or
            financial advice. Consult professionals as needed.
          </p>

          <h3 className="font-semibold">3. Accuracy of Information</h3>
          <p>
            We strive for accurate content but do not guarantee error-free or
            uninterrupted service.
          </p>

          <h3 className="font-semibold">4. Limitation of Liability</h3>
          <p>
            [Your Company Name] is not liable for any direct, indirect,
            incidental, or consequential damages.
          </p>

          <h3 className="font-semibold">
            5. External Links and Third-Party Tools
          </h3>
          <p>
            We are not responsible for third-party content or tools linked on
            our website.
          </p>

          <h3 className="font-semibold">6. Intellectual Property</h3>
          <p>
            All content is property of [Your Company Name] or licensors.
            Unauthorized use is prohibited.
          </p>

          <h3 className="font-semibold">7. Changes to Disclaimer</h3>
          <p>
            We may modify this Disclaimer at any time. Users are encouraged to
            review periodically.
          </p>

          <h3 className="font-semibold">8. Contact Information</h3>
          <p>📧 Email: support@[yourdomain].com</p>
          <p>📍 Address: [Company Name & Registered Office Address]</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Disclaimer;
