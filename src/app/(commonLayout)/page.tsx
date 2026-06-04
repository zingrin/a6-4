export const dynamic = "force-dynamic";

import CTA from "@/components/modules/home/CTA";
import FAQ from "@/components/modules/home/FAQ";
import FeaturedTutors from "@/components/modules/home/FeaturedTutors";
import LatestCourses from "@/components/modules/home/LatestCourses";
import { Hero } from "@/components/modules/home/Hero";
import HowItWorksWithImages from "@/components/modules/home/HowItWorks";
import Testimonials from "@/components/modules/home/Testimonials";
import TrustedPartners from "@/components/modules/home/TrustedPartners";
import GlobalVisionaries from "@/components/modules/home/GlobalVisionaries";
import StatsSection from "@/components/modules/home/StatsSection";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";

export default async function Home() {

  return (
    <div>
      <Hero />
      <GlobalVisionaries />
      <StatsSection />
      <FeaturedTutors />
      <LatestCourses />
      <WhyChooseUs />
      <HowItWorksWithImages />
      <Testimonials />
      <TrustedPartners />
      <FAQ />
      <CTA />
    </div>
  );
}

