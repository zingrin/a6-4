"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { UserCheck, Briefcase, Calendar, Target, CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

const features = [
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "Personalized Learning",
    description: "Tailored study paths designed around your unique goals and pace.",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Expert Mentorship",
    description: "Learn directly from the world's top 3% industry professionals.",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Flexible Scheduling",
    description: "Book sessions that fit your life, across any global timezone.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Career Centric",
    description: "Practical skills and networks that lead directly to job growth.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 relative"
          >
            <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden shadow-xl">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/94/25/360_F_215942539_pDtJ0enEFJsgmtKJIAzuTkF6qOtkcvFH.jpg"
                alt="Why Choose SkillBridge"
                className="object-cover transition-transform duration-700 h-full w-full hover:scale-105"
              />
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-100/40 rounded-full blur-[80px] -z-10" />
          </motion.div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary font-bold tracking-widest uppercase text-sm"
              >
                Our Advantage
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Empowering Your Journey with <br />
                <span className="text-primary">Unmatched Excellence</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                We've built more than just a platform; we've created an ecosystem 
                where your potential is the only limit. Here's why standard education 
                simply doesn't compare.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="space-y-4 group p-2"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
