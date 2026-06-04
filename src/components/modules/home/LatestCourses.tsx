import { BookOpen, Clock, Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { courseService } from "@/services/course.service";
import { Course } from "@/types";
import SectionHeader from "./SectionHeader";
import CourseCarousel from "./CourseCarousel";

const levelColors: Record<string, string> = {
  BEGINNER: "bg-emerald-50 text-emerald-700 border-emerald-200",
  INTERMEDIATE: "bg-amber-50 text-amber-700 border-amber-200",
  ADVANCED: "bg-rose-50 text-rose-700 border-rose-200",
};

export default async function LatestCourses() {
  const { data } = await courseService.getPublicCourses({ limit: "6", sortBy: "createdAt", sortOrder: "desc" }, { cache: "no-store" });
  const courses: Course[] = data?.data?.data ?? data?.data ?? [];

  return (
    <section className="container mx-auto px-8 py-16">
      <SectionHeader title="Latest Courses" description="Freshly added courses from our top institutes" />

      <CourseCarousel>
        {courses.map((course) => (
          <div
            key={course.id}
            className="shrink-0 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]"
          >
            <Card className="border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group h-full">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Thumbnail */}
                <div className="relative h-44 bg-muted overflow-hidden">
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <BookOpen className="w-12 h-12 text-primary/30" />
                    </div>
                  )}

                  {/* Level badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium border ${levelColors[course.level] ?? ""}`}
                    >
                      {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Category */}
                  {course.category && (
                    <span className="text-xs text-primary font-medium mb-1">
                      {course.category.name}
                    </span>
                  )}

                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                    {course.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    {course.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                    )}
                    {course._count?.enrollments !== undefined && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {course._count.enrollments} enrolled
                      </span>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-primary font-bold">
                      <DollarSign className="w-4 h-4" />
                      <span>{course.price}</span>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </CourseCarousel>

      {/* View All */}
      <div className="flex justify-center mt-12">
        <Link href="/courses">
          <Button variant="outline" size="lg" className="px-8 border-gray-300 hover:bg-gray-50">
            Browse All Courses
          </Button>
        </Link>
      </div>
    </section>
  );
}
