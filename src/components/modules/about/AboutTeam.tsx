"use client";

import { motion } from "motion/react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Linkedin, Twitter } from "lucide-react";

const team = [
  {
    name: "Aryan Hossain",
    role: "Co-Founder & CEO",
    bio: "Former EdTech lead at Coursera. Passionate about making world-class education globally accessible.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sadia Rahman",
    role: "Co-Founder & CTO",
    bio: "Full-stack engineer with 10+ years building scalable platforms. Believes technology is the great equalizer.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Marcus Chen",
    role: "Head of Tutor Success",
    bio: "Ex-Stanford professor turned educator advocate. Personally onboards every top-rated tutor.",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Amara Osei",
    role: "Head of Product",
    bio: "Product designer obsessed with delightful user experiences. Previously at Notion and Linear.",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
  },
];

export default function AboutTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            The Team
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mt-3">
            Meet the people behind{" "}
            <span className="text-primary">SkillBridge</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl leading-relaxed">
            A small, focused team of educators, engineers, and designers united
            by one goal — making great teaching universally available.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              {/* Photo */}
              <div className="relative mb-5">
                <Avatar className="w-20 h-20 ring-2 ring-slate-100 group-hover:ring-primary/40 transition-all duration-300">
                  <AvatarImage
                    src={member.avatar}
                    alt={member.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary text-white text-xl font-bold">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                {/* Accent dot */}
                <span className="absolute bottom-0 left-16 w-3 h-3 bg-primary rounded-full border-2 border-white" />
              </div>

              {/* Info */}
              <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mt-0.5 mb-3">
                {member.role}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-4">
                <button className="text-slate-400 hover:text-primary transition-colors duration-200">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="text-slate-400 hover:text-primary transition-colors duration-200">
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
