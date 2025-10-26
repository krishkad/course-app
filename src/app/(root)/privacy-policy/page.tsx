import React from "react";
import Footer from "@/components/root/Footer";
import Navigation from "@/components/root/Navigation";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Navigation />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>

        <section className="space-y-4">
          <p>
            <strong>Last Updated:</strong> 25.10.25
          </p>
          <p>
            [Your Platform Name] (“we,” “our,” “us”) is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your personal information in accordance with
            the Information Technology Act, 2000 and the Information Technology
            (Reasonable Security Practices and Procedures and Sensitive Personal
            Data or Information) Rules, 2011.
          </p>

          <h3 className="text-xl font-semibold">1. Information We Collect</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Personal Information:</strong> Name, email, phone number,
              billing details, professional background, and login credentials.
            </li>
            <li>
              <strong>Payment Data:</strong> Processed by secure third-party
              gateways (we do not store card details).
            </li>
            <li>
              <strong>Usage Data:</strong> Course progress, performance
              analytics, feedback.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, device type, browser
              information, and cookies.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">
            2. Purpose of Data Collection
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Deliver and personalize courses and services.</li>
            <li>Process transactions and issue invoices.</li>
            <li>Provide customer support and updates.</li>
            <li>Improve Platform performance and user experience.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </ul>

          <h3 className="text-xl font-semibold">3. Consent</h3>
          <p>
            By using the Platform, you consent to our collection, processing,
            and disclosure of your personal data as described herein. You may
            withdraw consent at any time by contacting us at{" "}
            <strong>privacy@[yourdomain].com</strong>, but withdrawal may limit
            your ability to use the Platform.
          </p>

          <h3 className="text-xl font-semibold">4. Data Retention</h3>
          <p>
            We retain personal data for as long as necessary to provide services
            or as required by Indian law. You may request deletion of your
            account or data, subject to verification and legal retention
            requirements.
          </p>

          <h3 className="text-xl font-semibold">5. Data Sharing</h3>
          <p>
            We do not sell or rent user data. We may share information with
            trusted third parties such as:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Payment processors (Razorpay, Stripe, etc.)</li>
            <li>Cloud hosting providers</li>
            <li>Analytics tools (Google Analytics, Mixpanel)</li>
            <li>Communication and email service platforms</li>
          </ul>
          <p>
            All partners are bound by confidentiality and data protection
            agreements.
          </p>

          <h3 className="text-xl font-semibold">6. Security Measures</h3>
          <p>
            We implement reasonable security practices as per Rule 8 of the SPDI
            Rules, including encryption, firewalls, and secure servers. However,
            no method of transmission over the Internet is completely secure;
            users share data at their own risk.
          </p>

          <h3 className="text-xl font-semibold">7. Cookies and Tracking</h3>
          <p>
            We use cookies to enhance your browsing experience, analyze traffic,
            and personalize content. You may disable cookies via your browser,
            but certain site features may not function properly.
          </p>

          <h3 className="text-xl font-semibold">8. User Rights</h3>
          <p>
            Under Indian and international data laws, you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access your data.</li>
            <li>Request correction or deletion.</li>
            <li>Withdraw consent.</li>
            <li>Object to specific processing activities.</li>
          </ul>
          <p>
            Requests can be sent to <strong>privacy@[yourdomain].com</strong>.
          </p>

          <h3 className="text-xl font-semibold">
            9. Cross-Border Data Transfers
          </h3>
          <p>
            If data is transferred outside India (e.g., to global hosting
            providers), it will be protected under appropriate contractual
            safeguards ensuring equivalent privacy protection.
          </p>

          <h3 className="text-xl font-semibold">10. Updates to Policy</h3>
          <p>
            We may revise this Privacy Policy from time to time. The updated
            version will be effective upon posting. Users are encouraged to
            review periodically.
          </p>

          <h3 className="text-xl font-semibold">11. Contact Information</h3>
          <p>
            If you have any concerns or complaints regarding your data, please
            contact:
          </p>
          <p>
            📧 <strong>privacy@[yourdomain].com</strong>
          </p>
          <p>📍 [Your Platform Name], [Office Address, City, State, India]</p>

          <p>
            If you are unsatisfied with our response, you may contact the
            Grievance Officer (appointed under Rule 5 of the SPDI Rules):
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Name:</strong> [Grievance Officer Name]
            </li>
            <li>
              <strong>Email:</strong> grievance@[yourdomain].com
            </li>
          </ul>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
