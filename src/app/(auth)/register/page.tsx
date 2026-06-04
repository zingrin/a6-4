import Logo from "@/components/layout/Logo";
import { RegisterForm } from "@/components/modules/authentication/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
