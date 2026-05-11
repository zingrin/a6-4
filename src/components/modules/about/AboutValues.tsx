"use client";

import { motion } from "motion/react";
import { Lightbulb, ShieldCheck, Zap, Users2 } from "lucide-react";

const values = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Innovation First",
    description:
      "We constantly rethink how learning works — from AI-powered matching to live collaborative sessions — always asking how we can do better.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Trust & Safety",
    description:
      "Every tutor is vetted and every interaction is designed with learner safety in mind. Your trust is our most valued asset.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Radical Accessibility",
    description:
      "We design for every learner — regardless of ability, location, or income — because great education shouldn't be a privilege.",
  },
  {
    icon: <Users2 className="w-6 h-6" />,
    title: "Community Driven",
    description:
      "Our roadmap is shaped by the learners and tutors who use SkillBridge every day. Every piece of feedback helps us grow.",
  },
];

export default function AboutValues() {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left sticky label */}
          <div className="lg:w-1/3 lg:sticky lg:top-28">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm"
            >
              Core Values
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mt-3">
              Principles that guide{" "}
              <span className="text-primary">everything we do</span>
            </h2>
            <p className="text-slate-500 mt-5 leading-relaxed">
              These aren&apos;t just words on a wall — they&apos;re the standards we hold ourselves
              to in every decision, every feature, and every interaction.
            </p>
          </div>

          {/* Right values grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group space-y-4 p-8 bg-white border border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  {val.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900">{val.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
