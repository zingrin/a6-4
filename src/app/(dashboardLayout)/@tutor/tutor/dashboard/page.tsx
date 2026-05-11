
export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  DollarSign,
  Star,
  ArrowRight,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { tutorService } from "@/services/tutor.service";
import { StarRating } from "@/components/ui/start-rating";
import { StatCard } from "@/components/modules/tutor/overview/stat-card";
import { TutorOverviewData } from "@/types";
import DashPageHeader from "@/components/layout/DashPageHeader";
import { userService } from "@/services/user.service";

export default async function TutorDashboardOverview() {

  const [tutorRes, userRes] = await Promise.all([
      tutorService.getTutorOverview(),
      userService.getSession()
    ]);

  const { profile, stats, upcomingBookings, recentReviews, availability } : TutorOverviewData = tutorRes.data.data;
  const userData = userRes.data.user;

  const completionRate = stats.totalBookings > 0 ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <DashPageHeader title={`Hello ${userData.name.split(" ")[0]}!`} description="Welcome back, here's what's happening" className="mb-0"/>

          {profile.isFeatured && (
            <Badge
              variant="secondary"
              className="self-start sm:self-auto w-fit bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
            >
              ✦ Featured Tutor
            </Badge>
          )}
        </div>

        <Card>
          <CardContent className="pt-5 pb-5 px-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3">
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {profile.category && (
                      <Badge variant="outline">{profile.category.name}</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      ${profile.hourlyRate ?? "—"} / hr
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {profile.subjects.map((s) => (
                      <Badge
                        key={s.id}
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="text-sm font-semibold">
                  {Number(profile.avgRating).toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({profile.totalReviews})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <StatCard
            icon={BookOpen}
            label="Total Bookings"
            value={stats.totalBookings}
            color="bg-blue-500"
          />
          <StatCard
            icon={CheckCircle}
            label="Completed"
            value={stats.completedBookings}
            sub={`${completionRate}% completion`}
            color="bg-emerald-500"
          />
          <StatCard
            icon={XCircle}
            label="Cancelled"
            value={stats.cancelledBookings}
            color="bg-red-500"
          />
          <StatCard
            icon={CalendarDays}
            label="Upcoming"
            value={stats.upcomingCount}
            color="bg-violet-500"
          />
          <StatCard
            icon={DollarSign}
            label="Total Earnings"
            value={`$${stats.totalEarnings.toLocaleString()}`}
            color="bg-amber-500"
          />
        </div>

        <Card>
          <CardContent className="pt-5 pb-5 px-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium">Completion Rate</span>
              </div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {completionRate}%
              </span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Upcoming Bookings */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Upcoming Bookings
                </CardTitle>
                <Link
                  href="/tutor/bookings"
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors"
                >
                  See all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 flex-1 flex flex-col gap-3">
              {upcomingBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No upcoming bookings
                </p>
              ) : (
                upcomingBookings.map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/tutor/bookings/${booking.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={booking.student.image ?? undefined} />
                      <AvatarFallback className="text-xs">
                        {booking.student.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {booking.student.name}
                      </p>
                      {booking.availability && (
                        <p className="text-xs text-muted-foreground">
                          {booking.availability.day} ·{" "}
                          {booking.availability.startTime} –{" "}
                          {booking.availability.endTime}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${booking.price}</p>
                      <Badge variant={booking.status === "CONFIRMED" ? "secondary" : "outline"} className="text-xs">
                        {booking.status}
                      </Badge>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Recent Reviews
                </CardTitle>
                <Link
                href="/tutor/reviews"
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors"
              >
                See All <ArrowRight className="w-3 h-3" />
              </Link>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 flex-1 flex flex-col gap-3">
              {recentReviews.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No reviews yet
                </p>
              ) : (
                recentReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={rev.student.image ?? undefined} />
                      <AvatarFallback className="text-xs">
                        {rev.student.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {rev.student.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <StarRating rating={rev.rating} />
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {rev.review}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Availability This Week
              </CardTitle>
              <Link
                href="/tutor/availability"
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors"
              >
                Manage <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {availability.activeSlots} active slot
              {availability.activeSlots !== 1 ? "s" : ""} of{" "}
              {availability.total} total
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            {availability.slots.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No availability slots set.{" "}
                <Link
                  href="/tutor/availability"
                  className="underline hover:text-foreground transition-colors"
                >
                  Add one now
                </Link>
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {availability.slots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`rounded-lg border p-2.5 text-center ${
                      slot.status === "AVAILABLE"
                        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
                        : "bg-muted border-muted"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        slot.status === "AVAILABLE"
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {slot.day.slice(0, 3)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {slot.startTime}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {slot.endTime}
                    </p>
                    {slot.status !== "AVAILABLE" && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        {slot.status.charAt(0) +
                          slot.status.slice(1).toLowerCase()}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}