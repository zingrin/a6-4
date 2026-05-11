"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { TutorProfile } from "@/types";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { Eye } from "lucide-react";
import { updateFetureTutorAction } from "@/actions/admin.action";


export default function FeaturedTutorsTable({ tutors }: { tutors : TutorProfile[]}) {


    const handleStatusChange = async (isFeatured : string, tutorId : string) => {
       const toastId = toast.loading("Updating featured tutor...");

      try {
        const payload = isFeatured === "true" ? true  : false;
        const res = await updateFetureTutorAction(payload, tutorId);

        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success(res.data.message || "Tutor featured updated successfully", { id: toastId });

      } catch (err) {
        console.log(err)
        toast.error("Failed to update status", { id: toastId });
      }
    }

  if (!tutors || tutors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <p className="text-sm font-medium">No users found</p>
        <p className="text-xs mt-0.5">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-70 pl-4">
              Tutor
            </TableHead>
            <TableHead >
              Phone
            </TableHead>
            <TableHead>
              Category
            </TableHead>
            <TableHead>
              Email
            </TableHead>
            <TableHead>
              Featured
            </TableHead>
            <TableHead>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tutors.map((tutor) => (
            <TableRow
              key={tutor.id}
              
            >
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    {tutor.user.image && (
                      <AvatarImage src={tutor.user.image} alt={tutor.user.name} />
                    )}
                    <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-semibold">
                      {getInitials(tutor.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {tutor.user.name}
                    </p>
                    {tutor.isFeatured && (
                      <span className="text-xs text-emerald-600 flex items-center gap-1">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 5.72a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L4.47 9.03a.75.75 0 0 1 1.06-1.06L7.25 9.69l3.47-3.97a.75.75 0 0 1 1.06 0z" />
                        </svg>
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-sm text-slate-600 truncate">
                  {tutor.user.phone}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm text-slate-500 font-mono">
                  {tutor.category?.name || "—"}
                </span>
              </TableCell>

              <TableCell>
                <Badge variant="secondary">{tutor.user.email}</Badge>
              </TableCell>

              <TableCell>
                <Select value={tutor.isFeatured ? "true" : "false"} onValueChange={(value) => handleStatusChange(value as string, tutor.id)}>
                  <SelectTrigger className="w-27.5 text-sm border-slate-200 focus:ring-0">
                    <SelectValue>
                     {tutor.isFeatured ? "TRUE" : "FALSE"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {["TRUE", "FALSE"].map((option) => (
                      <SelectItem key={option} value={option.toLocaleLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <Link href={`/tutors/${tutor.id}`}>
                <Eye />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
