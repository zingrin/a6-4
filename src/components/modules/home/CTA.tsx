import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="container mx-auto px-8 py-32">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 px-8 py-16 text-center shadow-xl">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#1b182e] leading-tight">
          Master New Skills with World-Class Mentors{" "}
          <span className="font-eb-garamond block mt-3 text-2xl md:text-3xl lg:text-4xl font-medium text-[#1b182e]/80 italic">
            Your journey to success starts right here
          </span>
        </h2>

        <Link
          href="/register"
          className="mt-8 inline-block bg-[#1b182e] text-white rounded-full px-8 py-4 text-base font-semibold transition-all hover:bg-[#100e1b] hover:shadow-lg hover:-translate-y-1"
        >
          Start Learning Now
        </Link>
      </div>
    </div>
  );
}
