import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
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
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Decorative circle in top right */}
      <div className="container mx-auto px-8">
        {/* Header */}
        <SectionHeader title="How it works" description="How to use this site?" className="text-center mb-18"/>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative text-foreground">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center md:items-start mx-auto">
              <div className="relative z-10 mb-6">
                <div className="w-20 h-20 rounded-full border-3 border-white flex items-center justify-center relative">
                  <Image
                    src="/assets/circle.svg" 
                    alt="Description"
                    width={100}
                    height={100}
                    aria-selected={false}
                  />
                  <span className="text-primary text-3xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{step.number}</span>
                </div>
              </div>

              <Image
                    src="/assets/arrow.svg" 
                    alt="Description"
                    width={150}
                    height={100}
                    className={`absolute -right-10 xl:-right-1/2 hidden lg:block ${index === 0 ? "top-5" : index === 1 ? "-top-2 rotate-x-180" : "hidden lg:hidden"} `}
                    aria-selected={false}
                  />

              {/* Content */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-3 text-accent-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4 max-w-60 mx-auto text-muted-foreground">
                  {step.description}
                </p>
                <Link
                  href="/tutors"
                  className="inline-flex text-primary items-center gap-2 text-sm font-medium hover:gap-3 transition-all duration-300"
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