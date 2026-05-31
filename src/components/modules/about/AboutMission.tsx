"use client";

import { motion } from "motion/react";
import { Target, Eye, Heart } from "lucide-react";

const pillars = [
  {
    icon: <Target className="w-7 h-7" />,
    title: "Our Mission",
    description:
      "Our mission is to create meaningful learning experiences that inspire growth and confidence. We connect students with skilled tutors, provide flexible learning opportunities, and support every learner in achieving their academic and career goals.",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Our Vision",
    description:
      "We envision a future where quality education is accessible to everyone, regardless of location or circumstances. By leveraging technology and expert guidance, we aim to empower learners worldwide to unlock their full potential.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Our Values",
    description:
      "We are guided by integrity, inclusivity, and a passion for lifelong learning. Building trust, fostering meaningful connections, and continuously improving the learning experience remain at the heart of everything we do.",
  },
];

export default function AboutMission() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            Who We Are
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mt-3">
            Built with purpose,{" "}
            <span className="text-primary">driven by passion</span>
          </h2>
          <p className="text-lg text-slate-500 mt-4 leading-relaxed">
            We believe learning should be accessible, engaging, and
            career-focused. SkillBridge helps individuals build in-demand skills
            and unlock new opportunities through high-quality online education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative bg-slate-50/60 border border-slate-100 p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />

              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                {pillar.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {pillar.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
