import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "./SectionHeader";
const faqs = [
  {
    question: "How do I choose the best tutor for my learning goals?",
    answer:
      "Finding the right tutor is easy with SkillBridge. Browse tutor profiles, compare ratings, teaching experience, subjects, availability, and hourly rates. Detailed tutor bios and student reviews help you confidently select the tutor that matches your learning style and goals.",
  },
  {
    question: "What is the process for booking a tutoring session?",
    answer:
      "Simply select your preferred tutor, choose an available time slot, and confirm your booking. Once payment is completed, you'll instantly receive a booking confirmation along with all session details in your dashboard.",
  },
  {
    question: "Can I cancel or reschedule a booked session?",
    answer:
      "Yes. You can easily manage your bookings from your student dashboard. Depending on the cancellation policy, eligible bookings may qualify for a full or partial refund. Rescheduling options are also available for most sessions.",
  },
  {
    question: "Are SkillBridge tutors verified and qualified?",
    answer:
      "Absolutely. Every tutor undergoes a screening and verification process before joining the platform. We review their qualifications, subject expertise, teaching experience, and profile information to ensure a high-quality learning experience.",
  },
  {
    question: "Does SkillBridge offer both courses and private tutoring?",
    answer:
      "Yes. In addition to one-on-one tutoring sessions, SkillBridge provides access to curated learning courses from trusted educational partners, allowing you to learn at your own pace whenever it suits you.",
  },
  {
    question: "How are payments processed and secured?",
    answer:
      "All transactions are securely processed through trusted payment gateways such as Stripe. Your sensitive payment information is encrypted and never stored on our servers, ensuring a safe and reliable checkout experience.",
  },
  {
    question: "Can I leave feedback after a tutoring session?",
    answer:
      "Yes. After completing a session, students can rate their experience and leave reviews for tutors. This helps maintain transparency and allows future learners to make informed decisions.",
  },
  {
    question: "What subjects are available on SkillBridge?",
    answer:
      "SkillBridge offers a wide range of subjects including Mathematics, Science, Programming, Languages, Business Studies, Test Preparation, and many more. New subjects and expert tutors are added regularly.",
  },
];
export default function FAQ() {
  return (
    <section className="container mx-auto px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — header + description */}
        <div className="lg:sticky lg:top-24">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Everything you need to know about learning on SkillBridge"
          />
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Can't find the answer you're looking for? Reach out to our{" "}
            <a
              href="mailto:support@skillbridge.com"
              className="text-primary font-medium hover:underline"
            >
              support team
            </a>{" "}
            and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Right — accordion */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border rounded-xl px-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
