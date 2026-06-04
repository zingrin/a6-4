export const dynamic = "force-dynamic";

import DashPageHeader from '@/components/layout/DashPageHeader'
import { userService } from '@/services/user.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, Clock, Sparkles, TrendingUp, ArrowRight, PlusCircle, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import StudentDashboardCharts from '@/components/modules/student/DashboardCharts'
import StudentStatCards from '@/components/modules/student/StatCards'

export default async function StudentDashboard() {
  const [userRes, statsRes] = await Promise.all([
    await userService.getSession(),
    await userService.getStudentStats()
  ])

  const user = userRes.data.user;
  const stats = statsRes.data.data;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashPageHeader 
          title={`Welcome back, ${user.name.split(' ')[0]}!`} 
          description='Track your progress and manage your learning journey'
        />
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20 animate-pulse">
          <Sparkles className="h-4 w-4" />
          Learning Growth
        </div>
      </div>

      <StudentStatCards stats={stats} />

      {stats && <StudentDashboardCharts stats={stats} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        {/* Recent Enrollments (8 Columns) */}
        <Card className="lg:col-span-8 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              Recent Enrollments
            </CardTitle>
            <Link href="/dashboard/courses" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium bg-primary/5 px-3 py-1.5 rounded-md transition-all font-bold">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentEnrollments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 bg-muted/20 rounded-xl border border-dashed">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                   <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <h5 className="font-semibold">No enrollments yet</h5>
                    <p className="text-sm text-muted-foreground">Start your learning journey by exploring courses.</p>
                </div>
                <Link href="/courses">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        Browse Catalog
                    </button>
                </Link>
              </div>
            ) : (
                <div className="space-y-3">
                    {stats.recentEnrollments.map((enrollment: any) => (
                        <div key={enrollment.id} className="group flex items-center gap-4 p-4 border border-transparent hover:border-border/50 bg-background/50 hover:bg-background/80 rounded-xl transition-all duration-300">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-indigo-500 shrink-0 group-hover:scale-110 transition-transform">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold truncate tracking-tight">{enrollment.course.title}</h4>
                                    <Badge variant="secondary" className="text-[10px] px-1.5 h-4 font-bold uppercase tracking-tighter">
                                        {enrollment.course.category?.name}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground font-medium">
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {enrollment.course.institute?.name}</span>
                                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                    <span>{new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <Link href="/dashboard/courses" className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 transition-colors">
                                    Continue
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Accelerator Hub (4 Columns) */}
        <Card className="lg:col-span-4 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
                Accelerator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                <h4 className="font-bold flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4" /> Power Up
                </h4>
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                    Take your skills to the next level by booking a 1-on-1 session with an expert mentor.
                </p>
                <Link 
                    href="/tutors" 
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-indigo-700 rounded-xl text-xs font-bold hover:bg-white/90 transition-colors shadow-sm"
                >
                    <PlusCircle className="h-4 w-4" /> Book a Mentor
                </Link>
            </div>

            <div className="space-y-4">
                <h5 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Upcoming Sessions</h5>
                {stats.upcomingBookings.length === 0 ? (
                     <div className="p-4 border border-dashed rounded-xl text-center">
                        <p className="text-[11px] text-muted-foreground font-medium">No sessions scheduled.</p>
                     </div>
                ) : (
                    <div className="space-y-3">
                        {stats.upcomingBookings.map((booking: any) => (
                            <Link 
                                href="/dashboard/bookings" 
                                key={booking.id}
                                className="flex items-center gap-3 p-3 bg-background/50 border border-transparent hover:border-border/50 hover:bg-background rounded-xl transition-all group"
                            >
                                <Avatar className="h-8 w-8 rounded-lg group-hover:scale-110 transition-transform">
                                    <AvatarImage src={booking.tutor.user.image} />
                                    <AvatarFallback className="text-[10px] rounded-lg">
                                        {booking.tutor.user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[11px] font-bold truncate tracking-tight">{booking.subject.name}</div>
                                    <div className="text-[9px] text-muted-foreground flex items-center gap-1 font-semibold">
                                        <Clock className="h-2.5 w-2.5" /> {booking.availability.day}, {booking.availability.startTime}
                                    </div>
                                </div>
                                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-2 pt-2 border-t border-border/40">
                <h5 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Quick Access</h5>
                <Link 
                    href="/dashboard/payments" 
                    className="flex items-center justify-between p-3 bg-background/50 hover:bg-background rounded-xl transition-all group border border-transparent hover:border-border/50"
                >
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Clock className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold tracking-tight">Payment History</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}