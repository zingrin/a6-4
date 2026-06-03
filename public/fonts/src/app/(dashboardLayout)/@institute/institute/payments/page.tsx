export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { instituteService } from "@/services/institute.service";
import PaymentTable from "@/components/modules/institute/PaymentTable";

export default async function InstitutePaymentsPage() {
  const { data } = await instituteService.listPayments({});

  // Response shape: { success, data: { data: Payment[], pagination: {...} } }
  const payments = Array.isArray(data?.data?.data) ? data.data.data : [];

  return (
    <div className="space-y-6">
      <DashPageHeader
        title="Financial Records"
        description="Track enrollment revenue and manage your institute's transaction history."
      />

      <PaymentTable payments={payments} />
    </div>
  );
}
