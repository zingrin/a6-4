export const dynamic = "force-dynamic";

import DashPageHeader from '@/components/layout/DashPageHeader'
import { getMyPaymentsAction } from "@/actions/payment.action"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { Receipt, MonitorPlay, Users } from "lucide-react"

export default async function StudentPaymentsPage() {
  const result = await getMyPaymentsAction();
  const payments = result?.data?.data || [];

  return (
    <div className="space-y-6">
      <DashPageHeader 
        title="Payment History" 
        description="View your past transactions for course enrollments and tutoring sessions."
      />

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-secondary/20">
          <Receipt className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground text-center">You have no payment history yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment: any) => {
            const isCourse = !!payment.courseEnrollment;
            const title = isCourse 
              ? payment.courseEnrollment.course.title 
              : `${payment.booking?.subject?.name || "Session"} with ${payment.booking?.tutor?.user?.name || "Tutor"}`;
              
            const Icon = isCourse ? MonitorPlay : Users;

            return (
              <Card key={payment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 border-l-4 border-l-primary/60">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary rounded-full shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-base mb-1">{title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{format(new Date(payment.createdAt), "MMM dd, yyyy 'at' hh:mm a")}</span>
                          <span>•</span>
                          <span className="uppercase text-xs font-semibold">{isCourse ? "Course" : "Session"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                       <span className="text-xl font-bold">${payment.amount.toFixed(2)}</span>
                       <Badge variant={payment.status === "COMPLETED" ? "default" : "destructive"}>
                         {payment.status}
                       </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
