import AboutHero from "@/components/modules/about/AboutHero";
import AboutMission from "@/components/modules/about/AboutMission";
import AboutStats from "@/components/modules/about/AboutStats";
import AboutTeam from "@/components/modules/about/AboutTeam";
import AboutValues from "@/components/modules/about/AboutValues";
import CTA from "@/components/modules/home/CTA";

export const metadata = {
  title: "About Us | SkillBridge",
  description:
    "Learn about SkillBridge's mission to democratize expert learning, the values that guide us, and the team building the future of education.",
};

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <CTA />
    </div>
  );
}
