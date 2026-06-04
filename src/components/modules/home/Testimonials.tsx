import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SectionHeader from "./SectionHeader";
import CourseCarousel from "./CourseCarousel";
import { getInitials } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Web Development Student",
    avatar: null,
    rating: 5,
    text: "SkillBridge completely changed how I learn. I found an amazing JavaScript tutor who explained concepts in a way that finally clicked. Within 3 months I landed my first dev job.",
  },
  {
    name: "James Okafor",
    role: "Data Science Enthusiast",
    avatar: null,
    rating: 5,
    text: "The booking process is seamless and the tutors are genuinely experts. My Python tutor tailored every session to my pace — something a YouTube video just can't do.",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    avatar: null,
    rating: 5,
    text: "I enrolled in the Figma course and booked a few extra 1-on-1 sessions to work through my portfolio. Having both options in one platform is incredibly convenient.",
  },
  {
    name: "Lucas Ferreira",
    role: "Computer Science Student",
    avatar: null,
    rating: 4,
    text: "Great selection of tutors across many subjects. The session quality is consistently high and the pricing is very fair compared to other platforms I've tried.",
  },
  {
    name: "Amina Hassan",
    role: "Career Switcher",
    avatar: null,
    rating: 5,
    text: "I transitioned from teaching to tech with the help of SkillBridge tutors. The instructors are patient, knowledgeable, and genuinely invested in your progress.",
  },
  {
    name: "Tom Nguyen",
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
    <section className="container mx-auto px-8 py-16">
      <SectionHeader
        title="What Our Students Say"
        description="Thousands of learners have already transformed their skills with SkillBridge"
        className="text-center"
      />

      <CourseCarousel>
        {testimonials.map((t, i) => (
          <div key={i} className="shrink-0 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]">
            <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
              <CardContent className="p-6 flex flex-col gap-4 h-full">
                {/* Stars */}
                <StarRating rating={t.rating} />

                {/* Quote */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src={t.avatar ?? undefined} alt={t.name} />
                    <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                      {getInitials(t.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </CourseCarousel>
    </section>
  );
}
