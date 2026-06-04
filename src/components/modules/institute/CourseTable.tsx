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
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import DeleteCourseDialog from "./DeleteCourseDialog";
import EditCourseModal from "./EditCourseModal";
import CourseDetailsModal from "./CourseDetailsModal";
import { Course, Category, Mentor } from "@/types";

interface CourseTableProps {
  courses: Course[];
  mentors: Mentor[];
  categories: Category[];
}

export default function CourseTable({ courses, mentors, categories }: CourseTableProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleAction = (course: Course, type: "view" | "edit" | "delete") => {
    setSelectedCourse(course);
    if (type === "view") setIsViewOpen(true);
    if (type === "edit") setIsEditOpen(true);
    if (type === "delete") setIsDeleteOpen(true);
  };
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "default";
      case "DRAFT":
        return "secondary";
      case "ARCHIVED":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead>Mentor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No courses found.
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>
                  {course.mentors && course.mentors.length > 0 ? (
                    <div className="flex -space-x-2">
                      {course.mentors.slice(0, 3).map((mentor) => (
                        <Avatar key={mentor.id} className="h-6 w-6 border-2 border-background" title={mentor.user.name}>
                          <AvatarImage src={mentor.user.image || undefined} />
                          <AvatarFallback>{mentor.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {course.mentors.length > 3 && (
                        <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-background bg-muted text-[10px] font-medium z-10" title={`${course.mentors.length - 3} more`}>
                          +{course.mentors.length - 3}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs italic">Unassigned</span>
                  )}
                </TableCell>
                <TableCell>
                  {course.category ? (
                    <Badge variant="outline" className="font-normal">
                      {course.category.name}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-xs italic">Uncategorized</span>
                  )}
                </TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>
                  <Badge variant={course.isPublished ? "default" : "secondary"}>
                    {course.isPublished ? "PUBLISHED" : "DRAFT"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(course.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleAction(course, "view")}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleAction(course, "edit")}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                        onClick={() => handleAction(course, "delete")}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {selectedCourse && (
        <>
          <CourseDetailsModal
            course={selectedCourse}
            open={isViewOpen}
            onOpenChange={setIsViewOpen}
          />
          <EditCourseModal
            course={selectedCourse}
            mentors={mentors}
            categories={categories}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
          <DeleteCourseDialog
            courseId={selectedCourse.id}
            courseTitle={selectedCourse.title}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
          />
        </>
      )}
    </div>
  );
}
