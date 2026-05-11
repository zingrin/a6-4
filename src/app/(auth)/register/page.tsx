import { GalleryVerticalEnd } from "lucide-react";

import { RegisterForm } from "@/components/modules/authentication/register-form";
import Link from "next/link";
import Logo from "@/components/layout/Logo";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex gap-2 justify-start">
          {/* Logo */}
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.pexels.com/photos/347735/pexels-photo-347735.jpeg?cs=srgb&dl=pexels-tdcat-347735.jpg&fm=jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
