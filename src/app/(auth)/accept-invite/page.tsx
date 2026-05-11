import { AcceptInviteForm } from "@/components/modules/authentication/AcceptInviteForm";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function AcceptInvitePage() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-xl border shadow-sm my-auto">
      <Suspense fallback={
        <div className="flex justify-center items-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }>
        <AcceptInviteForm />
      </Suspense>
    </div>
  );
}
