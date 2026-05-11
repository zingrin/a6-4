import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="container mx-auto px-8 py-32">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4a1a2c] via-[#5a2838] to-[#4a1a2c] px-8 py-16 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
           Learn from expert tutors at your{' '}
          <span className="font-eb-garamond text-orange-400 text-4xl md:text-5xl lg:text-6xl">
            convenience
          </span>
        </h2>
        
        <Link href="/register" className="mt-8 inline-block bg-white px-8 py-3 text-base font-medium text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg">
          Start Learning
        </Link>
      </div>
    </div>
  );
}