import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "./SectionHeader";
const faqs = [
  {
    question: "How can I improve my learning speed on SkillBridge?",
    answer:
      "Focus on consistent short sessions instead of long study hours. Use tutor guidance, practice regularly, and follow a structured learning path designed by experts to improve faster.",
  },
  {
    question: "Can I switch tutors if I’m not satisfied?",
    answer:
      "Yes, you can switch tutors anytime. We recommend checking multiple profiles, reviews, and trial sessions to find the best match for your learning style.",
  },
  {
    question: "Do I need any special software to join sessions?",
    answer:
      "No special software is required. Most sessions run directly in your browser or via common tools like Zoom or Google Meet depending on the tutor’s preference.",
  },
  {
    question: "Is there any free trial available?",
    answer:
      "Some tutors offer free intro sessions so you can evaluate their teaching style before booking paid classes. Availability depends on the tutor.",
  },
  {
    question: "How do I track my learning progress?",
    answer:
      "Your dashboard shows completed sessions, upcoming classes, and learning history. Some tutors also provide progress notes after each session.",
  },
  {
    question: "Can I learn multiple subjects at the same time?",
    answer:
      "Yes, you can enroll in multiple subjects simultaneously. You can book different tutors for different topics based on your schedule.",
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
