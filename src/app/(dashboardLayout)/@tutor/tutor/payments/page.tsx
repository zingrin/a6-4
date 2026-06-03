import { getTutorPaymentsAction } from "@/actions/payment.action";
import { TutorPaymentsTable } from "@/components/modules/tutor/payments/TutorPaymentsTable";
import { AlertCircle } from "lucide-react";

export default async function TutorPaymentsPage() {
  const { data, error } = await getTutorPaymentsAction();

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500">
        <AlertCircle className="mr-2 h-5 w-5" />
        <p>{error.message || "Failed to load payment history"}</p>
      </div>
    );
  }

  const payments = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
        <p className="text-muted-foreground">
          View all your earnings from completed tutoring sessions.
        </p>
      </div>

      <TutorPaymentsTable payments={payments} />
    </div>
  );
}
