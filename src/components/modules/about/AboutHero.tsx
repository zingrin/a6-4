"use client";

import { motion } from "motion/react";

export default function AboutHero() {
  return (
    <section className="bg-[#013545] py-28">
      <div className="container mx-auto px-8 max-w-3xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="block text-xs font-bold tracking-[0.2em] uppercase text-teal-300 mb-6"
        >
          About SkillBridge
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-7"
        >
          We&apos;re on a mission to{" "}
          <span className="text-teal-300">democratize</span>{" "}
          expert learning
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/55 text-lg leading-relaxed"
        >
          SkillBridge connects passionate learners with world-class tutors and
          institutions — making quality education accessible to everyone,
          everywhere.
        </motion.p>
      </div>
    </section>
  );
}
