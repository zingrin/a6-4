export const dynamic = "force-dynamic";

import { courseService } from "@/services/course.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Clock,
  DollarSign,
  GraduationCap,
  Tag,
  Users,
  BarChart2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseEnrollButton from "@/components/modules/course/coursePage/CourseEnrollButton";
import CourseCard from "@/components/modules/course/coursePage/CourseCard";

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-700 border-green-200",
  INTERMEDIATE: "bg-orange-100 text-orange-700 border-orange-200",
  ADVANCED: "bg-red-100 text-red-700 border-red-200",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const courseRes = await courseService.getCourseDetails(id);
  const course = courseRes?.data?.data;

  if (!course) return notFound();

  const levelColor = LEVEL_COLORS[course.level] || "";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-6">
        {/* Back button */}
        <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2 mb-2">
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </Button>

        {/* Top Section: Thumbnail + Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <Card className="lg:col-span-2">
            {/* Thumbnail */}
            {course.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
            ) : (
              <div className="w-full h-48 bg-primary/10 flex items-center justify-center rounded-t-xl">
                <BookOpen className="h-16 w-16 text-primary/30" />
              </div>
            )}

            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{course.title}</CardTitle>
                  {course.category && (
                    <CardDescription className="flex items-center gap-2 text-base">
                      <Tag className="h-4 w-4" />
                      {course.category.name}
                    </CardDescription>
                  )}
                </div>
                <Badge className={`text-sm px-3 py-1 border ${levelColor}`}>
                  <BarChart2 className="h-3 w-3 mr-1" />
                  {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-xl font-bold">${course.price}</p>
                  </div>
                </div>

                {course.duration && (
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-lg font-bold">{course.duration}</p>
                    </div>
                  </div>
                )}

                {course._count !== undefined && (
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Enrolled</p>
                      <p className="text-xl font-bold">{course._count.enrollments}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">About this Course</h3>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Institute Card */}
          <div className="space-y-4">
            {course.institute && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <GraduationCap className="h-5 w-5" />
                    Offered By
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    {course.institute.logoUrl || course.institute.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={course.institute.logoUrl || course.institute.user?.image || ""}
                        alt={course.institute.name}
                        className="h-14 w-14 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-7 w-7 text-primary/60" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-lg">{course.institute.name}</p>
                    </div>
                  </div>
                  {course.institute.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {course.institute.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="h-5 w-5" />
                  Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    Level: {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
                  </li>
                  {course.duration && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      Duration: {course.duration}
                    </li>
                  )}
                  {course.category && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      Category: {course.category.name}
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    {course.mentors?.length || 0} instructor
                    {(course.mentors?.length || 0) !== 1 ? "s" : ""}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mentors Section */}
        {course.mentors && course.mentors.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Course Instructors
              </CardTitle>
              <CardDescription>Meet the mentors teaching this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.mentors.map((mentor: any) => (
                  <div
                    key={mentor.id}
                    className="flex items-center gap-4 p-4 border rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors"
                  >
                    <Avatar className="h-14 w-14 border-2 border-primary/10">
                      <AvatarImage
                        src={mentor.user.image || ""}
                        alt={mentor.user.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                        {getInitials(mentor.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-base">{mentor.user.name}</p>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      {mentor.expertise && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {mentor.expertise}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enroll CTA */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
            <div>
              <h3 className="text-xl font-bold">Ready to get started?</h3>
              <p className="text-muted-foreground text-sm">
                Enroll now and start your learning journey for just{" "}
                <span className="font-bold text-primary">${course.price}</span>
              </p>
            </div>
            <CourseEnrollButton courseId={course.id} />
          </CardContent>
        </Card>

        {/* Related Courses */}
        {course.relatedCourses && course.relatedCourses.length > 0 && (
          <div className="pt-20 pb-10">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight">
                Recommended <span className="text-primary">Courses</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                Explore other world-class programs in {course.category?.name}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {course.relatedCourses.map((related: any) => (
                <CourseCard key={related.id} course={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
