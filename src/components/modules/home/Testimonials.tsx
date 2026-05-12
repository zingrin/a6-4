"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SectionHeader from "./SectionHeader";
import { getInitials } from "@/lib/utils";

const testimonials = [
  {
    name: "Fahim Rahman",
    role: "Web Development Student",
    avatar: null,
    rating: 5,
    text: "SkillBridge completely changed how I learn. I found an amazing JavaScript tutor who explained concepts in a way that finally clicked. Within 3 months I landed my first dev job.",
  },
  {
    name: "Nusrat Jahan",
    role: "Data Science Enthusiast",
    avatar: null,
    rating: 5,
    text: "The booking process is seamless and the tutors are genuinely experts. My Python tutor tailored every session to my pace — something a YouTube video just can't do.",
  },
  {
    name: "Rakibul Islam",
    role: "UI/UX Designer",
    avatar: null,
    rating: 5,
    text: "I enrolled in the Figma course and booked a few extra 1-on-1 sessions to work through my portfolio. Having both options in one platform is incredibly convenient.",
  },
  {
    name: "Sadia Afrin",
    role: "Computer Science Student",
    avatar: null,
    rating: 4,
    text: "Great selection of tutors across many subjects. The session quality is consistently high and the pricing is very fair compared to other platforms I've tried.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Career Switcher",
    avatar: null,
    rating: 5,
    text: "I transitioned from teaching to tech with the help of SkillBridge tutors. The instructors are patient, knowledgeable, and genuinely invested in your progress.",
  },
  {
    name: "Mehedi Hasan",
    role: "Freelance Developer",
    avatar: null,
    rating: 5,
    text: "Whenever I hit a wall on a client project I jump on SkillBridge and book a quick session. It's like having senior dev mentorship on demand — absolutely invaluable.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="container mx-auto px-8 py-16 overflow-hidden">
      <SectionHeader
        title="What Our Students Say"
        description="Discover how SkillBridge has empowered thousands of learners across the globe."
        className="text-center"
      />

      <div className="relative mt-12 flex flex-col gap-6 h-[650px] overflow-hidden">
        {/* First 3 */}
        <motion.div
          animate={{ y: ["0%", "-100%"] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="space-y-6"
        >
          {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map(
            (t, i) => (
              <Card
                key={i}
                className="border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-2 border-b">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage
                        src={t.avatar ?? undefined}
                        alt={t.name}
                      />
                      <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                        {getInitials(t.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <StarRating rating={t.rating} />

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </motion.div>

        {/* Last 3 */}
        <motion.div
          animate={{ y: ["100%", "0%"] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 right-0 w-full lg:w-1/2 space-y-6"
        >
          {[...testimonials.slice(3, 6), ...testimonials.slice(3, 6)].map(
            (t, i) => (
              <Card
                key={i}
                className="border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-2 border-b">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage
                        src={t.avatar ?? undefined}
                        alt={t.name}
                      />
                      <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                        {getInitials(t.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <StarRating rating={t.rating} />

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}