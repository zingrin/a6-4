import Logo from "@/components/layout/Logo"
import { LoginForm } from "@/components/modules/authentication/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
<div className="w-full max-w-md">
        <div className="mb-6 flex justify-center"><Logo /></div>          
        </div>
      <div className="w-full md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
