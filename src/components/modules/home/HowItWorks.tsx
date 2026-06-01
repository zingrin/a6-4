import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Find Your Tutor",
      description:
        "Browse tutors by subject, rating, and availability. Filter to find your perfect match.",
      link: "See More",
    },
    {
      number: 2,
      title: "Book a Session",
      description:
        "Choose a convenient time slot and book your session instantly.",
      link: "See More",
    },
    {
      number: 3,
      title: "Start Learning",
      description:
        "Attend your session and achieve your learning goals with expert guidance.",
      link: "See More",
    },
  ];

  return (
    <div className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white to-[#c2a5c7]/10">
      {/* Decorative circle in top right */}
      <div className="container mx-auto px-8">
        {/* Header */}
        <SectionHeader
          title="How it works"
          description="How to use this site?"
          className="text-center mb-18"
        />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative text-foreground">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center md:items-start mx-auto"
            >
              <div className="relative z-10 mb-6">
                <div className="w-24 h-24 rounded-full border-8 border-white shadow-xl flex items-center justify-center relative bg-gradient-to-br from-[#1b182e] to-[#4a426b] hover:scale-105 transition-transform duration-300">
                  <span className="text-white text-4xl font-bold  drop-shadow-md">
                    {step.number}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 text-[#1b182e]">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed mb-6 max-w-xs mx-auto md:mx-0 text-slate-600">
                  {step.description}
                </p>
                <Link
                  href="/tutors"
                  className="inline-flex text-[#1b182e] items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300 hover:text-opacity-80"
                >
                  {step.link}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
