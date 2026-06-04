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
import { formatDate } from "@/lib/utils";

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING: "outline",
  COMPLETED: "default",
  FAILED: "destructive",
  REFUNDED: "secondary",
};

interface TutorPaymentsTableProps {
  payments: any[];
}

export function TutorPaymentsTable({ payments }: TutorPaymentsTableProps) {
  const formatAvailabilityTime = (availability: any) => {
    if (!availability) return "—";
    return `${availability.date} (${availability.startTime} - ${availability.endTime})`;
  };

  return (
    <div className="border-2 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Session Time</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                No payments found.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment, index) => (
              <TableRow key={payment.id}>
                <TableCell className="text-muted-foreground">{index + 1}</TableCell>

                <TableCell className="font-medium">
                  {payment.student?.name ?? "—"}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {payment.student?.email ?? "—"}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {payment.booking?.subject?.name ?? "—"}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatAvailabilityTime(payment.booking?.availability)}
                </TableCell>

                <TableCell className="font-medium text-green-600">
                  {payment.amount === 0 ? "Free" : `$${payment.amount}`}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatDate(payment.createdAt)}
                </TableCell>

                <TableCell>
                  <Badge variant={STATUS_VARIANT[payment.status] || "outline"}>
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
