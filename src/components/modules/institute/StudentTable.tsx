"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentTableProps {
  enrollments: any[];
}

export default function StudentTable({ enrollments }: StudentTableProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Student</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Enrolled At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No students enrolled yet.
              </TableCell>
            </TableRow>
          ) : (
            enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={enrollment.student.image || undefined} />
                    <AvatarFallback>{enrollment.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{enrollment.student.name}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">{enrollment.student.email}</TableCell>
                <TableCell>{enrollment.course.title}</TableCell>
                <TableCell>
                    <span className="capitalize">{enrollment.status.toLowerCase()}</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
