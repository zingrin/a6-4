import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Clock, DollarSign, GraduationCap, Users } from "lucide-react";
import { Course } from "@/types";
import Link from "next/link";

interface CourseCardProps {
  course: Course & {
    institute?: { name: string; logoUrl?: string | null; user?: { image?: string | null } };
    mentors?: { id: string; user: { name: string; image: string | null } }[];
    _count?: { enrollments: number };
  };
}

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-700",
  INTERMEDIATE: "bg-orange-100 text-orange-700",
  ADVANCED: "bg-red-100 text-red-700",
};

export default function CourseCard({ course }: CourseCardProps) {
  const levelColor = LEVEL_COLORS[course.level] || "bg-secondary text-secondary-foreground";

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg flex flex-col">
      {/* Thumbnail */}
      {course.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-primary/10 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-primary/40" />
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg leading-snug line-clamp-2">{course.title}</h3>
          <Badge className={`shrink-0 text-xs font-medium ${levelColor}`}>
            {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
          </Badge>
        </div>

        {/* Institute */}
        {course.institute && (
          <div className="flex items-center gap-2 mt-1">
            {course.institute.logoUrl || course.institute.user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={course.institute.logoUrl || course.institute.user?.image || ""}
                alt={course.institute.name}
                className="h-5 w-5 rounded-full object-cover"
              />
            ) : (
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">{course.institute.name}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">${course.price}</span>
          </span>

          {course.duration && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
          )}

          {course._count !== undefined && (
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {course._count.enrollments} enrolled
            </span>
          )}
        </div>

      </CardContent>

      <CardFooter className="bg-background border-t p-4">
        <Button asChild className="w-full font-semibold" variant="default">
          <Link href={`/courses/${course.id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
