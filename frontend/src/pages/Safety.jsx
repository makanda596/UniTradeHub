import React from 'react';
import GuestNavbar from '../components/GuestNavbar';
import Footer from '../components/Footer';

const Safety = () => {
  return (
    <div>
      <GuestNavbar/>
    <div className="px-6 py-20 max-w-4xl mx-auto text-gray-800 space-y-6">
      <h1 className="text-xl font-bold">Safety Guidelines — Unitrade Hub</h1>

      <p>
        At Unitrade Hub, your safety is our top priority. While we provide the platform, your actions during transactions determine how secure your experience is. These tips will help you stay safe and vigilant when buying, selling, or interacting on the platform.
      </p>

      <h2 className="text-2xl font-semibold">General Safety Tips</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Inspect Before You Pay:</strong> Always check the condition and authenticity of the item in person before making payment. Never pay blindly based on pictures alone.
        </li>
        <li>
          <strong>Meet in Public Spaces:</strong> Choose busy, well-lit locations on campus or nearby public places to meet. Avoid secluded areas.
        </li>
        <li>
          <strong>Never Share Sensitive Information:</strong> Do not disclose your M-Pesa PIN, student ID, passwords, or banking details. Unitrade Hub will never ask for these.
        </li>
        <li>
          <strong>Keep Conversations Within Unitrade Hub:</strong> Avoid taking conversations to external platforms like WhatsApp or Telegram. In-app messaging ensures accountability and leaves a trace in case of disputes.
        </li>
        <li>
          <strong>Don’t Fall for "Too Good to Be True" Offers:</strong> Scammers often use flashy offers or urgency to pressure buyers. Take time to think before you act.
        </li>
        <li>
          <strong>Never Prepay for Goods or Services:</strong> Unless you fully trust the seller or it’s cash on delivery, never send money upfront.
        </li>
        <li>
          <strong>Confirm Identity:</strong> Ask sellers or buyers for identification such as student ID to help verify that they are who they claim to be.
        </li>
        <li>
          <strong>Report Suspicious Activity:</strong> If something feels off or if you suspect a scam, report it immediately via <a className="text-blue-600 underline" href="mailto:support@unitradehub.com">support@unitradehub.com</a>.
        </li>
        <li>
          <strong>Use Proof of Payment:</strong> Always request and retain a transaction confirmation or receipt, even when paying in cash.
        </li>
        <li>
          <strong>Secure Your Account:</strong> Use strong passwords and log out on shared devices. Don’t reuse your Unitrade Hub password across other platforms.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold">Community Responsibility</h2>
      <p>
        Unitrade Hub thrives on mutual trust. Every user plays a part in keeping the platform safe. If you’ve had a good or bad experience with another user, leave a review. Your input helps others make informed choices.
      </p>

      <p>
        If you ever feel threatened or unsafe during a transaction, prioritize your personal safety first. Do not hesitate to involve campus security or local authorities when necessary.
      </p>

      <h2 className="text-2xl font-semibold">Need Help?</h2>
      <p>
        Our team is here to help. If you encounter fraud, scams, or unsafe behavior, report it immediately. The sooner we know, the faster we can act.
        <br />
        📧 <a className="text-blue-600 underline" href="mailto:support@unitradehub.com">support@unitradehub.com</a>
      </p>
    </div>
    <Footer/>
    </div>
  );
};

export default Safety;
