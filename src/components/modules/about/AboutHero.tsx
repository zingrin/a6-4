"use client";

import { motion } from "motion/react";

export default function AboutHero() {
  return (
    <section className="bg-[#392f5c] py-20">
      <div className="container mx-auto px-8 max-w-3xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="block text-xs font-bold tracking-[0.2em] uppercase text-[#b1fac6] mb-6"
        >
          About SkillBridge Information
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-7"
        >
          Our mission is to make education{" "}
          <span className="text-[#b1fac6]">accessible</span> to everyone.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/55 text-lg leading-relaxed"
        >
          From one-on-one tutoring to professional courses, SkillBridge makes
          learning simple, engaging, and available from anywhere in the world.
        </motion.p>
      </div>
    </section>
  );
}
