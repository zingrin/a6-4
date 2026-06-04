"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Course } from "@/types";
import { Calendar, DollarSign, Users, BookOpen, Layers, Clock, Tag } from "lucide-react";

interface CourseDetailsModalProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusVariant = (status?: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "PUBLISHED": return "default";
    case "DRAFT": return "secondary";
    case "ARCHIVED": return "destructive";
    default: return "outline";
  }
};

const levelLabel = (level: string) => {
  switch (level) {
    case "BEGINNER": return "Beginner";
    case "INTERMEDIATE": return "Intermediate";
    case "ADVANCED": return "Advanced";
    default: return level;
  }
};

export default function CourseDetailsModal({
  course,
  open,
  onOpenChange,
}: CourseDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between pr-6 gap-2">
            <DialogTitle className="text-xl font-bold leading-tight">
              {course.title}
            </DialogTitle>
            <Badge variant={course.isPublished ? "default" : "secondary"} className="shrink-0 mt-0.5">
              {course.isPublished ? "PUBLISHED" : "DRAFT"}
            </Badge>
          </div>
          <DialogDescription className="text-sm mt-1">
            Detailed information about this course.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-2">
          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" /> Description
            </h4>
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg whitespace-pre-wrap leading-relaxed">
              {course.description}
            </div>
          </div>

          {/* Price + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold uppercase tracking-wider">
                <DollarSign className="h-3 w-3" /> Price
              </span>
              <span className="text-xl font-bold text-primary">${course.price}</span>
            </div>
            <div className="p-3 border rounded-lg flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Calendar className="h-3 w-3" /> Created
              </span>
              <span className="text-sm font-semibold">
                {new Date(course.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Category + Level + Duration */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 border rounded-lg flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Tag className="h-3 w-3" /> Category
              </span>
              <span className="text-sm font-bold truncate">
                {course.category?.name ?? "Uncategorized"}
              </span>
            </div>
            <div className="p-3 border rounded-lg flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Layers className="h-3 w-3" /> Level
              </span>
              <span className="text-sm font-bold">
                {levelLabel(course.level)}
              </span>
            </div>
            <div className="p-3 border rounded-lg flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Clock className="h-3 w-3" /> Duration
              </span>
              <span className="text-sm font-bold">
                {course.duration ?? "N/A"}
              </span>
            </div>
          </div>

          {/* Mentors */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" /> Assigned Mentors
            </h4>
            {course.mentors && course.mentors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg border border-accent/50"
                  >
                    <Avatar className="h-9 w-9 ring-2 ring-background shrink-0">
                      <AvatarImage src={mentor.user.image || undefined} />
                      <AvatarFallback>{mentor.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold truncate">{mentor.user.name}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Instructor
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm italic text-muted-foreground bg-muted/30 p-4 rounded-lg text-center border-dashed border-2">
                No mentors assigned to this course yet.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
