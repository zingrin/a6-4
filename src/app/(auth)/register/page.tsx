import Logo from "@/components/layout/Logo";
import { RegisterForm } from "@/components/modules/authentication/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}