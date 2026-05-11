"use client";

import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Users, GraduationCap, BookOpenCheck, Globe } from "lucide-react";

const StatCounter = ({ value, suffix = "+" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-white">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  { icon: <Users className="w-7 h-7" />, value: 500, label: "Expert Tutors", suffix: "+" },
  { icon: <BookOpenCheck className="w-7 h-7" />, value: 10000, label: "Sessions Completed", suffix: "+" },
  { icon: <GraduationCap className="w-7 h-7" />, value: 25000, label: "Students Enrolled", suffix: "+" },
  { icon: <Globe className="w-7 h-7" />, value: 40, label: "Countries Reached", suffix: "+" },
];

export default function AboutStats() {
  return (
    <section className="py-20 bg-[#013545] relative overflow-hidden">
      {/* Decorative radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#088395/20_0%,_transparent_70%)]" />

      <div className="relative container mx-auto px-8">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-teal-300 font-bold tracking-widest uppercase text-sm"
          >
            By The Numbers
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
            A platform learners trust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="flex flex-col items-center text-center gap-4 p-8 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-teal-400/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/30 border border-primary/40 flex items-center justify-center text-teal-300">
                {stat.icon}
              </div>
              <StatCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-white/60 text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
