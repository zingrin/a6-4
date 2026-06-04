export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { paymentService } from "@/services/payment.service";
import AdminPaymentsTable from "@/components/modules/admin/payments/AdminPaymentsTable";
import { DollarSign, ShieldCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminPaymentsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminPaymentsPage({
  searchParams,
}: AdminPaymentsPageProps) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const limit = typeof params.limit === "string" ? parseInt(params.limit) : 10;
  const search = typeof params.search === "string" ? params.search : undefined;

  const { data: resData } = await paymentService.listAllPayments({
    page,
    limit,
    search,
  });

  const payments = resData?.data?.data || [];
  const pagination = resData?.data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  // Calculate some quick stats for the header area
  const completedPayments = payments.filter((p: any) => p.status === "COMPLETED");
  const recentVolume = completedPayments.reduce((acc: number, curr: any) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashPageHeader
          title="Grand Ledger"
          description="Global transparency and financial oversight across the entire SkillBridge ecosystem."
        />
        <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Security Status</div>
                <div className="flex items-center gap-1.5 text-emerald-500 text-sm font-bold">
                    <ShieldCheck className="h-4 w-4" /> Secure
                </div>
            </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-indigo-600 text-white overflow-hidden relative">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-indigo-200">Total Volume</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black tracking-tighter">${pagination.total > 0 ? (recentVolume * (pagination.total / payments.length)).toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}</div>
                <p className="text-[10px] text-indigo-200 mt-1 font-medium">Estimated gross platform volume</p>
                <DollarSign className="absolute right-4 bottom-4 h-12 w-12 text-white/10" />
            </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent Success</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black tracking-tighter text-emerald-600">
                    {payments.length > 0 ? Math.round((completedPayments.length / payments.length) * 100) : 0}%
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">Transaction completion rate this page</p>
                <TrendingUp className="absolute right-4 bottom-4 h-12 w-12 text-slate-100" />
            </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black tracking-tighter text-slate-900">{pagination.total}</div>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">Verified platform events recorded</p>
            </CardContent>
        </Card>
      </div>

      <AdminPaymentsTable payments={payments} pagination={pagination} />
    </div>
  );
}
