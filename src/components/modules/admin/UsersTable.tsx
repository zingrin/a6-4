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

import { User, UserStatus } from "@/types";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { USER_STATUS } from "@/constants";
import { toast } from "sonner";
import { updateUserStatusAction } from "@/actions/user.action";

export interface UsersTableProps {
  users: User[];
}


export default function UsersTable({ users }: UsersTableProps) {

    const handleStatusChange = async (status : UserStatus, userId : string) => {
       const toastId = toast.loading("Updating user status...");

      try {
        const res = await updateUserStatusAction(status, userId);

        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success(res.data.message || "User status updated successfully", { id: toastId });

      } catch (err) {
        console.log(err)
        toast.error("Failed to update status", { id: toastId });
      }
    }

  if (!users || users.length === 0) {
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
              User
            </TableHead>
            <TableHead >
              Email
            </TableHead>
            <TableHead>
              Phone
            </TableHead>
            <TableHead>
              Role
            </TableHead>
            <TableHead>
              Status
            </TableHead>
            <TableHead>
              Joined
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              
            >
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    {user.image && (
                      <AvatarImage src={user.image} alt={user.name} />
                    )}
                    <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {user.name}
                    </p>
                    {user.emailVerified && (
                      <span className="text-xs text-emerald-600 flex items-center gap-1">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 5.72a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L4.47 9.03a.75.75 0 0 1 1.06-1.06L7.25 9.69l3.47-3.97a.75.75 0 0 1 1.06 0z" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-sm text-slate-600 truncate">
                  {user.email}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm text-slate-500 font-mono">
                  {user.phone || "—"}
                </span>
              </TableCell>

              <TableCell>
                <Badge variant="secondary">{user.role}</Badge>
              </TableCell>

              <TableCell>
                <Select value={user.status} onValueChange={(value) => handleStatusChange(value as UserStatus, user.id)}>
                  <SelectTrigger className="w-27.5 text-sm border-slate-200 focus:ring-0">
                    <SelectValue>
                     {user.status}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {USER_STATUS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {formatDate(user.createdAt as string)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
