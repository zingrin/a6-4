"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PaymentTableProps {
  payments: any[];
}

export default function PaymentTable({ payments }: PaymentTableProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "PENDING":
        return "secondary";
      case "FAILED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No payment history found.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-mono text-xs text-muted-foreground uppercase">{payment.transactionId || payment.id.split('-')[0]}</TableCell>
                <TableCell className="font-medium text-sm">{payment.student.name}</TableCell>
                <TableCell className="text-sm">{payment.courseEnrollment.course.title}</TableCell>
                <TableCell className="font-bold tracking-tight">${payment.amount}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(payment.status)} className="font-bold text-[10px] tracking-tight">
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-medium">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
