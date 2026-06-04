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
import { Users, GraduationCap, ChevronRight } from "lucide-react";
import Link from "next/link";

interface MentorCourseTableProps {
  courses: any[];
}

export default function MentorCourseTable({ courses }: MentorCourseTableProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="font-bold">Course Details</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Level</TableHead>
            <TableHead className="font-bold text-center">Enrollments</TableHead>
            <TableHead className="text-right font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                No courses assigned yet.
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id} className="group hover:bg-muted/20 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold tracking-tight">{course.title}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold mt-0.5">
                      Created: {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] font-bold tracking-tight">
                    {course.category?.name || "Uncategorized"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-medium capitalize">{course.level.toLowerCase()}</span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold">
                    <Users className="h-3 w-3" />
                    {course._count.enrollments}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/mentor/rosters?courseId=${course.id}`}>
                    <button className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                      View Roster <ChevronRight className="h-3 w-3" />
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
