import SectionHeader from "./SectionHeader";
import { 
  SiCoursera, 
  SiUdemy, 
  SiEdx, 
  SiFreecodecamp, 
  SiCodecademy, 
  SiDuolingo, 
  SiSkillshare, 
  SiPluralsight 
} from "react-icons/si";
import { GiGraduateCap, GiRibbonMedal } from "react-icons/gi";
import { FaGraduationCap, FaLinkedin, FaAward } from "react-icons/fa";

const partners = [
  {
    name: "Coursera",
    color: "#0056D2",
    icon: <SiCoursera size={32} />,
  },
  {
    name: "Udemy",
    color: "#A435F0",
    icon: <SiUdemy size={32} />,
  },
  {
    name: "edX",
    color: "#02262B",
    icon: <SiEdx size={40} />,
  },
  {
    name: "Khan Academy",
    color: "#14BF96",
    icon: <FaGraduationCap size={32} />,
  },
  {
    name: "freeCodeCamp",
    color: "#0A0A23",
    icon: <SiFreecodecamp size={32} />,
  },
  {
    name: "Codecademy",
    color: "#1F4056",
    icon: <SiCodecademy size={32} />,
  },
  {
    name: "LinkedIn learning",
    color: "#0077B5", // Official LinkedIn Blue
    icon: <FaLinkedin size={32} />,
  },
  {
    name: "Duolingo",
    color: "#58CC02",
    icon: <SiDuolingo size={32} />,
  },
  {
    name: "Skillshare",
    color: "#00DE76",
    icon: <SiSkillshare size={32} />,
  },
  {
    name: "Pluralsight",
    color: "#F15B2A",
    icon: <SiPluralsight size={32} />,
  },
  {
    name: "MasterClass",
    color: "#000000",
    icon: <FaAward size={32} />, 
  },
  {
    name: "Alison",
    color: "#E91E63",
    icon: <GiRibbonMedal size={32} />, 
  },
];

// Duplicate for seamless infinite scroll
const allPartners = [...partners, ...partners];

export default function TrustedPartners() {
  return (
    <section className="py-20 overflow-hidden bg-slate-50/50">
      <div className="container mx-auto px-8">
        <SectionHeader
          title="Trusted Partners"
          description="We collaborate with the world's leading educational platforms"
          className="text-center mb-12"
        />
      </div>

      {/* Marquee strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-slate-50/50 to-transparent pointer-events-none md:w-48" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none md:w-48" />

        <div className="flex gap-12 w-max animate-marquee">
          {allPartners.map((partner, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center gap-4 grayscale hover:grayscale-0 transition-all duration-500 cursor-default px-6 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-transparent hover:border-slate-200 hover:shadow-sm"
            >
              <div 
                className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110" 
                style={{ color: partner.color }}
              >
                {partner.icon}
              </div>
              <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
