import React from "react";

export const metadata = {
  title: "Privacy Policy | SkillBridge",
  description: "Privacy policy and data protection practices at SkillBridge.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8 underline decoration-primary decoration-4 underline-offset-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate lg:prose-lg max-w-none space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Data Collection</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This includes your name, email address, phone number, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use of Information</h2>
            <p>
              We use the collected data to provide, maintain, and improve our services, including to process bookings, facilitate communication between tutors and students, and send technical notices and security alerts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Sharing</h2>
            <p>
              We do not share your private personal data with third parties except as necessary to provide our services (e.g., Stripe for payments), as required by law, or with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to track activity on our platform and hold certain information. This helps us provide a better experience by remembering your preferences and login sessions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Security</h2>
            <p>
              The security of your data is important to us. We implement industry-standard security measures to protect your information, but please be aware that no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting our support team.
            </p>
          </section>

          <p className="text-sm text-slate-400 pt-8 uppercase tracking-widest font-semibold">
            Last Updated: April 11, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
