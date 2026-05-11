import React from "react";

export const metadata = {
  title: "Terms & Conditions | SkillBridge",
  description: "Terms and conditions for using the SkillBridge platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8 underline decoration-primary decoration-4 underline-offset-8">
          Terms & Conditions
        </h1>
        
        <div className="prose prose-slate lg:prose-lg max-w-none space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to SkillBridge. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully. These terms govern your use of the website, services, and any content provided through SkillBridge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. User Accounts</h2>
            <p>
              To access certain features of SkillBridge, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Tutor & Student Obligations</h2>
            <p>
              Students agree to pay the fees associated with bookings and courses. Tutors agree to provide high-quality educational services and maintain a professional conduct. SkillBridge acts as a facilitator for these interactions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property</h2>
            <p>
              All content available on the platform, including text, graphics, logos, and software, is the property of SkillBridge or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
            <p>
              SkillBridge is not liable for any indirect, incidental, or consequential damages arising out of your use of the platform. We do not guarantee the accuracy or completeness of any educational content provided by users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform after changes are posted constitutes your acceptance of the new terms.
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
