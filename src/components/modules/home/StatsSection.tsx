"use client";

import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Users, GraduationCap, BookOpenCheck } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

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
    <span ref={ref} className="text-2xl md:text-3xl font-extrabold text-slate-900">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatCard = ({ icon, value, label, suffix }: StatItemProps) => {
  return (
    <div className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <div className="shrink-0 w-16 h-16 bg-primary flex items-center justify-center rounded-lg text-white shadow-lg shadow-primary/20">
        {icon}
      </div>
      <div>
        <StatCounter value={value} suffix={suffix} />
        <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wide">
          {label}
        </p>
      </div>
    </div>
  );
};

export default function StatsSection() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: 500,
      label: "Expert Tutors",
      suffix: "+",
    },
    {
      icon: <BookOpenCheck className="w-8 h-8" />,
      value: 10000,
      label: "Sessions Completed",
      suffix: "+",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      value: 50,
      label: "Subjects Available",
      suffix: "+",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
