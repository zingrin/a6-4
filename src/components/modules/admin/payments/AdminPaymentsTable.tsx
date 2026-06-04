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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import PaginationControls from "@/components/ui/pagination-controls";
import { DollarSign, GraduationCap, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AdminPaymentsTableProps {
  payments: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function AdminPaymentsTable({
  payments,
  pagination,
}: AdminPaymentsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "FAILED":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border">
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by student or transaction..."
            className="pl-9 bg-slate-50 border-none focus-visible:ring-indigo-500 h-10 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1 font-bold bg-indigo-50 text-indigo-600 border-indigo-100">
                Total: {pagination.total}
            </Badge>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">Date & ID</TableHead>
              <TableHead className="font-bold text-slate-700">Student</TableHead>
              <TableHead className="font-bold text-slate-700">Type</TableHead>
              <TableHead className="font-bold text-slate-700">Item</TableHead>
              <TableHead className="font-bold text-slate-700 text-right">Amount</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                    <DollarSign className="h-12 w-12" />
                    <p className="text-lg font-medium tracking-tight">No transactions found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-slate-50/50 transition-colors group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-tight">
                        {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono tracking-tighter">
                        {payment.id.toUpperCase()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded-lg shadow-sm">
                        {payment.student.image && <AvatarImage src={payment.student.image} alt={payment.student.name} />}
                        <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {payment.student.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                          {payment.student.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {payment.student.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {payment.booking ? (
                      <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 font-bold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-tighter">
                        <User className="h-3 w-3 mr-1" /> Tutoring
                      </Badge>
                    ) : (
                      <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 font-bold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-tighter">
                        <GraduationCap className="h-3 w-3 mr-1" /> Course
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <span className="text-sm font-semibold truncate block tracking-tight">
                        {payment.booking
                          ? payment.booking.subject?.name
                          : payment.courseEnrollment?.course?.title}
                      </span>
                      {payment.booking && (
                         <span className="text-[10px] text-slate-400 font-medium">
                            with {payment.booking.tutor.user.name}
                         </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="text-sm font-black tracking-tighter text-slate-900">
                      ${payment.amount.toFixed(2)}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                      {payment.currency}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getStatusColor(payment.status)} font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter`}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center pt-4">
        <PaginationControls
          meta={pagination}
        />
      </div>
    </div>
  );
}
