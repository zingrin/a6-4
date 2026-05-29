import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

export default function Logo({
  className,
  imgClassName,
  textClassName,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 mb-1.5 w-fit ${className || ""}`}
    >
      <Image
        src="/skillbridge.svg"
        width={24}
        height={24}
        className={`max-h-6 w-auto dark:invert ${imgClassName || ""}`}
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
