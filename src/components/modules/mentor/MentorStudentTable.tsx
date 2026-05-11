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
import { Badge } from "@/components/ui/badge";
import { Mail, Book } from "lucide-react";

interface MentorStudentTableProps {
  enrollments: any[];
}

export default function MentorStudentTable({ enrollments }: MentorStudentTableProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="font-bold">Student</TableHead>
            <TableHead className="font-bold">Contact</TableHead>
            <TableHead className="font-bold">Course Program</TableHead>
            <TableHead className="font-bold">Progress</TableHead>
            <TableHead className="text-right font-bold">Enrolled</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                No students enrolled in your courses yet.
              </TableCell>
            </TableRow>
          ) : (
            enrollments.map((enrollment) => (
              <TableRow key={enrollment.id} className="group hover:bg-muted/20 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <AvatarImage src={enrollment.student.image || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {enrollment.student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-bold tracking-tight text-sm">{enrollment.student.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="text-xs font-medium">{enrollment.student.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                            <Book className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-bold truncate max-w-[150px]">{enrollment.course.title}</span>
                   </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest">
                    {enrollment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-xs text-muted-foreground font-semibold">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
