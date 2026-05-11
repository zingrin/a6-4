"use client";

import { motion } from "motion/react";
import { Target, Eye, Heart } from "lucide-react";

const pillars = [
  {
    icon: <Target className="w-7 h-7" />,
    title: "Our Mission",
    description:
      "To bridge the gap between learners and expert knowledge by providing a seamless, flexible, and high-quality tutoring ecosystem that adapts to every student's unique journey.",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Our Vision",
    description:
      "A world where geography, background, or budget never limits anyone's access to the world's best educators and the skills that open doors.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Our Values",
    description:
      "We believe in quality over quantity, genuine human connection between tutor and student, and continuous improvement driven by community feedback.",
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
            SkillBridge was founded by educators and technologists who believed the future of
            learning is personal, flexible, and human.
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

              <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
