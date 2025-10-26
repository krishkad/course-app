import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Footer from "@/components/root/Footer";
import Navigation from "@/components/root/Navigation";

const TermsAndConditionsPage = () => {
  return (
    <>
      <Navigation />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center">Terms & Conditions</h1>

        {/* Terms of Service */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Terms of Service</h2>
          <p>
            <strong>Last Updated:</strong> 25.10.25
          </p>
          <p>
            Welcome to [Your Platform Name], an online learning platform
            offering Artificial Intelligence (AI) and professional development
            courses (“Platform”). These Terms of Service (“Terms”) govern your
            access to and use of our website, content, and services. By using
            this Platform, you agree to these Terms in full. If you do not
            agree, please discontinue use immediately.
          </p>

          <h3 className="font-semibold">1. Acceptance of Terms</h3>
          <p>
            By creating an account, purchasing a course, or accessing any part
            of the Platform, you accept these Terms and our Privacy Policy. We
            reserve the right to modify these Terms at any time, with changes
            effective upon posting. Continued use constitutes your acceptance of
            revised Terms.
          </p>

          <h3 className="font-semibold">2. Eligibility</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Be at least 18 years old and competent to contract under the
              Indian Contract Act, 1872.
            </li>
            <li>
              Use the Platform only for lawful purposes in accordance with
              Indian law and these Terms.
            </li>
            <li>
              Provide accurate and complete information during registration.
            </li>
            <li>
              If using the Platform on behalf of an organization, you represent
              that you have the authority to bind that entity.
            </li>
          </ul>

          <h3 className="font-semibold">3. Account Registration</h3>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account.
            Notify us immediately of any unauthorized use. We are not liable for
            loss if proper notice is not given.
          </p>

          <h3 className="font-semibold">4. Course Access and License</h3>
          <p>
            Upon purchase, you are granted a limited, non-exclusive,
            non-transferable, revocable license to access the course for
            personal learning purposes. You may not copy, modify, redistribute,
            share credentials, resell access, or record/reproduce content.
          </p>

          <h3 className="font-semibold">5. Intellectual Property Rights</h3>
          <p>
            All Platform content is the intellectual property of [Your Platform
            Name] or its licensors, protected under the Copyright Act, 1957.
            Unauthorized use is prohibited.
          </p>

          <h3 className="font-semibold">6. User Conduct</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Use the Platform only for lawful educational purposes.</li>
            <li>Do not upload harmful code, defamatory content, or spam.</li>
            <li>Respect the rights, opinions, and experiences of others.</li>
          </ul>

          <h3 className="font-semibold">7. Payment and Refund Policy</h3>
          <p>
            All payments are processed securely via third-party gateways.
            Refunds are processed per our refund policy or Indian consumer
            protection laws.
          </p>

          <h3 className="font-semibold">8. Limitation of Liability</h3>
          <p>
            [Your Platform Name] is not liable for indirect, incidental, or
            consequential damages. Aggregate liability does not exceed the
            course fee.
          </p>

          <h3 className="font-semibold">9. Disclaimers</h3>
          <p>
            Courses are for educational purposes only. We do not guarantee job
            outcomes, promotions, or earnings.
          </p>

          <h3 className="font-semibold">10. Termination</h3>
          <p>
            We may suspend or terminate access for misuse, violations, or
            fraudulent activity. All access rights cease upon termination.
          </p>

          <h3 className="font-semibold">
            11. Governing Law and Dispute Resolution
          </h3>
          <p>
            These Terms are governed by the laws of India. Disputes are subject
            to exclusive jurisdiction of courts in [City, State], India.
          </p>

          <h3 className="font-semibold">12. Contact</h3>
          <p>📧 support@[yourdomain].com</p>
          <p>📍 Registered Office: [Insert Address, City, State, India]</p>
        </section>

        
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditionsPage;
