import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "./SectionHeader";

const faqs = [
  {
    question: "How do I find the right tutor for me?",
    answer:
      "Browse our tutor directory and filter by subject, rating, availability, and hourly rate. Each tutor has a detailed profile with their bio, reviews, and available time slots so you can make an informed choice before booking.",
  },
  {
    question: "How does booking a session work?",
    answer:
      "Once you've found a tutor you like, pick an available time slot on their profile page. Complete the secure checkout and you're all set — you'll receive a confirmation and the session details right away.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer:
      "You can manage your bookings from your student dashboard. Cancellations made within the policy window are fully refunded. Reach out to support if you need help with a last-minute change.",
  },
  {
    question: "Are the tutors verified?",
    answer:
      "Yes. Every tutor on SkillBridge goes through a review process before their profile is published. We look at subject expertise, teaching experience, and community feedback to maintain a high-quality roster.",
  },
  {
    question: "Can I enrol in courses as well as book 1-on-1 sessions?",
    answer:
      "Absolutely. SkillBridge offers both self-paced courses created by our partner institutes and live 1-on-1 sessions with individual tutors — so you can learn in whichever format suits you best.",
  },
  {
    question: "How are payments handled?",
    answer:
      "All payments are processed securely via Stripe. Your card details are never stored on our servers. Refunds for eligible cancellations are returned directly to your original payment method.",
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
