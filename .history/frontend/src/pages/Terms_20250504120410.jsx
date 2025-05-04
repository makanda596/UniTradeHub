import React from 'react';

const Terms = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>
        Your trust means everything to us. That’s why we want to be transparent about how we handle your personal information when you use our platform — whether you’re browsing our website, trading via our app, or connecting with others through our services (collectively, the “Service”).

        This Privacy Policy is our way of explaining what data we collect, why we collect it, how we keep it safe, and how we use it to improve your experience. Think of it as our promise to respect your privacy, protect your data, and use it only in ways that help make Unitrade Hub better for you.
      </p>

      <p className="font-semibold">
        BY USING THE SERVICE, YOU AGREE TO THIS PRIVACY POLICY AND CONFIRM THAT YOU ARE AT LEAST 16
        YEARS OLD OR HAVE OBTAINED CONSENT FROM A PARENT OR GUARDIAN.
      </p>

      <ol className="list-decimal pl-6 space-y-4">
        <li>
          <strong>Personal Data Controller</strong>
          <p>Unitrade Hub Ltd. is the data controller of your personal data.</p>
        </li>

        <li>
          <strong>Categories of Personal Data We Collect</strong>
          <ul className="list-disc pl-6">
            <li>
              <strong>Data You Provide:</strong> name, email, phone number, gender, date of birth,
              address, ID (if required), and other profile content.
            </li>
            <li>
              <strong>Third-Party Logins:</strong> Information from Meta, Google, Apple, or
              Truecaller including name, email, profile photo, and ID.
            </li>
            <li>
              <strong>Automatically Collected Data:</strong> device data, IP address, browser type,
              cookies, and usage logs.
            </li>
          </ul>
        </li>

        <li>
          <strong>Data Protection Principles</strong>
          <p>We commit to lawful, fair, and secure handling of your data.</p>
        </li>

        <li>
          <strong>Purpose of Data Processing</strong>
          <ul className="list-disc pl-6">
            <li>To provide and personalize our services</li>
            <li>To communicate with you</li>
            <li>To prevent fraud and maintain security</li>
            <li>To comply with legal requirements</li>
          </ul>
        </li>

        <li>
          <strong>Legal Grounds for Processing</strong>
          <p>We rely on consent, legal obligations, legitimate interest, or contractual necessity.</p>
        </li>

        <li>
          <strong>Sharing of Personal Data</strong>
          <p>
            We may share your data with service providers, legal authorities, and other users under
            specific circumstances.
          </p>
        </li>

        <li>
          <strong>Your Privacy Rights</strong>
          <p>
            You can access, correct, or delete your data, and withdraw consent or object to
            processing.
          </p>
        </li>

        <li>
          <strong>Age Limitations</strong>
          <p>The Service is intended for users 16 and older. Parental consent is required otherwise.</p>
        </li>

        <li>
          <strong>International Transfers</strong>
          <p>Your data may be processed outside your country but will be protected under secure protocols.</p>
        </li>

        <li>
          <strong>Data Retention</strong>
          <p>We retain your data only as long as needed for business or legal purposes.</p>
        </li>

        <li>
          <strong>Changes to This Policy</strong>
          <p>
            Updates will be posted here. Continued use of the Service indicates your acceptance of
            the new terms.
          </p>
        </li>

        <li>
          <strong>Contact Us</strong>
          <p>
            If you have any questions, reach us at: <a className="text-blue-600 underline" href="mailto:privacy@unitradehub.com">privacy@unitradehub.com</a>
          </p>
        </li>
      </ol>
    </div>
  );
};

export default Terms;
