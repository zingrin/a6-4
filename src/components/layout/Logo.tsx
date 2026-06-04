import Link from "next/link";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

export default function Logo({ className, imgClassName, textClassName }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 mb-1.5 w-fit ${className || ""}`}>
      <img
        src="/skillbridge.svg"
        className={`max-h-6 dark:invert ${imgClassName || ""}`}
        alt="SkillBridge Logo"
      />
      <span
        className={`text-2xl text-primary tracking-wider font-semibold font-logan ${textClassName || ""}`}
      >
        SkillBridge
      </span>
    </Link>
  );
}
