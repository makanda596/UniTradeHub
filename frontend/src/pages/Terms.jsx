import React from 'react';
import GuestNavbar from '../components/GuestNavbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div>
      <GuestNavbar />
      <div className="px-6 py-20 max-w-4xl mx-auto text-gray-800 space-y-4">
        <h1 className="text-xl font-bold">Privacy Policy & Terms of Use</h1>
        <p>
          Welcome to <strong>Unitrade Hub</strong> — the official student-powered marketplace for Moi University.
          Your privacy, security, and overall experience are important to us. This document outlines how we
          handle your data and what’s expected when using our platform.
        </p>

        <p className="font-semibold">
          By using Unitrade Hub, you agree to these terms and confirm you're either 18+ or have parental/guardian consent.
        </p>

        <ol className="list-decimal pl-6 space-y-6">
          <li>
            <strong>Who We Are</strong>
            <p>
              Unitrade Hub is a peer-to-peer marketplace created for students by students.
              We provide a trusted platform to buy, sell, and exchange goods within the Moi University community.
              We act as the controller of any personal data you share with us.
            </p>
          </li>

          <li>
            <strong>What Data We Collect</strong>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Information You Provide:</strong> Name, email, phone number, gender, student ID (optional), and post content.</li>
              <li><strong>Automatically Collected:</strong> Device details, IP address, browser type, and usage behavior.</li>
              <li>We collect data when you:
                <ul className="list-disc pl-6">
                  <li>Create or update an account</li>
                  <li>List or purchase an item</li>
                  <li>Message another user</li>
                  <li>Subscribe to email alerts</li>
                  <li>Contact support</li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <strong>How We Use Your Data</strong>
            <ul className="list-disc pl-6 space-y-1">
              <li>To operate and improve the platform</li>
              <li>To personalize user experience</li>
              <li>To detect fraud and maintain safety</li>
              <li>To notify users of updates and changes</li>
              <li>To comply with legal responsibilities</li>
            </ul>
          </li>

          <li>
            <strong>Data Protection</strong>
            <p>
              Your data is secured using encryption and best-practice access controls. Only authorized personnel can access it, and we use secure storage solutions.
            </p>
            <p>
              If you believe your account is compromised, contact us immediately at <a className="text-blue-600 underline" href="mailto:privacy@unitradehub.com">privacy@unitradehub.com</a>.
            </p>
          </li>

          <li>
            <strong>Your Rights</strong>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access or correct your data</li>
              <li>Delete your data or account</li>
              <li>Withdraw consent for processing</li>
              <li>Object to how your data is used</li>
              <li>Request export of your data</li>
            </ul>
          </li>

          <li>
            <strong className="text-black-600">Safety First: Avoid Scams & Stolen Goods</strong>
            <p>
              At Unitrade Hub, user safety is our top priority — but it starts with *you*. As a peer-to-peer platform, we do not mediate transactions. Please follow these guidelines diligently:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Never share sensitive information:</strong> Do not disclose your passwords, student credentials, M-Pesa PINs, or any banking details to anyone — even if they claim to represent Unitrade Hub.
              </li>
              <li>
                <strong>Keep all conversations within the platform:</strong> Private messaging ensures we have a verifiable trail in case of disputes or fraud..
              </li>
              <li>
                <strong>Always inspect items in person before paying:</strong> Meet in public, secure, and well-lit areas (e.g., campus common spaces). If possible, go with a friend or notify someone you trust.
              </li>
              <li>
                <strong>Be skeptical of prices that are “too good to be true”</strong> — scammers often bait with unbelievable deals. If it feels off, walk away.
              </li>
            </ul>
            <p className="text-black-700 font-semibold">
               Important Disclaimer: Unitrade Hub does <u>not</u> verify or authenticate listings. We provide a platform for student commerce, but the responsibility for due diligence lies entirely with the buyer and seller. We are not accountable for stolen goods, scams, impersonation, or financial loss.
            </p>
            <p>
              If you encounter suspicious behavior, illegal listings, or fraudulent activity, contact our security team immediately at <a className="text-blue-600 underline" href="mailto:support@unitradehub.com">support@unitradehub.com</a>. We will investigate thoroughly and take action, including reporting to campus authorities or law enforcement if needed.
            </p><br/>
            <a href='/safety' target='_blank' className='text-green-500 underline'>read more on safety and tips</a>
          </li>


          <li>
            <strong>Account Suspension or Termination</strong>
            <p>
              We may suspend or remove accounts that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Violate our terms or community rules</li>
              <li>Engage in fraudulent or harmful behavior</li>
              <li>Are reported for suspected scams, harassment, or illegal activity</li>
            </ul>
            <p>
              All reports are reviewed by our team. If needed, we will investigate thoroughly and cooperate with legal authorities before taking permanent action.
            </p>
          </li>

          <li>
            <strong>Data Retention</strong>
            <p>
              We only keep your personal data for as long as is necessary to provide services or meet legal requirements.
            </p>
          </li>

          <li>
            <strong>How We Share Your Data</strong>
            <p>
              We do not sell your information. We may share limited data with:
            </p>
            <ul className="list-disc pl-6">
              <li>Trusted service providers (e.g., hosting, analytics)</li>
              <li>Law enforcement (in cases of legal obligation)</li>
              <li>University authorities (in extreme or policy-related incidents)</li>
            </ul>
          </li>

          <li>
            <strong>Updates to This Policy</strong>
            <p>
              We may revise this page as our platform evolves. We'll notify users of any major changes. Continued use means you accept the latest terms.
            </p>
          </li>

          <li>
            <strong>Contact Us</strong>
            <p>
              Questions, concerns, or suggestions? Email us anytime at <a className="text-blue-600 underline" href="mailto:privacy@unitradehub.com">privacy@unitradehub.com</a>.
            </p>
          </li>
        </ol>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
