import DashPageHeader from '@/components/layout/DashPageHeader';
import { userService } from '@/services/user.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, UserCheck, BookOpen, CheckCircle, DollarSign, Star, MessageSquare, Building2, TrendingUp } from 'lucide-react'
import AdminDashboardCharts from '@/components/modules/admin/AdminDashboardCharts';

export default async function AdminAnalytics() {
  const {data : resData} = await userService.getAdminAnalytics();
  const data = resData.data;

  const statCards = [
    {
      title: 'Total Users',
      value: data.totalUsers,
      icon: Users,
      description: 'Platform wide registrations',
      color: 'text-blue-600'
    },
    {
      title: 'Institutes',
      value: data.totalInstitutes,
      icon: Building2,
      description: 'Educational partners',
      color: 'text-cyan-600'
    },
    {
      title: 'Active Tutors',
      value: data.totalTutors,
      icon: UserCheck,
      description: 'Verified educators',
      color: 'text-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `$${(data.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      description: 'Across all programs',
      color: 'text-emerald-600'
    },
    {
      title: 'Total Bookings',
      value: data.totalBookings,
      icon: BookOpen,
      description: 'Learning sessions',
      color: 'text-orange-600'
    },
    {
      title: 'Completion Rate',
      value: data.totalBookings > 0 
        ? `${((data.completedBookings / data.totalBookings) * 100).toFixed(1)}%`
        : '0%',
      icon: CheckCircle,
      description: 'Session success rate',
      color: 'text-green-600'
    },
    {
      title: 'Avg Rating',
      value: Number(data.averageRating).toFixed(1),
      icon: Star,
      description: 'Student satisfaction',
      color: 'text-amber-600'
    },
    {
      title: 'Total Reviews',
      value: data.totalReviews,
      icon: MessageSquare,
      description: 'Community feedback',
      color: 'text-pink-600'
    }
  ]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <DashPageHeader 
            title='Platform Analytics' 
            description='Comprehensive oversight of SkillBridge ecosystem performance'
        />
        <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold border border-indigo-500/20">
          <TrendingUp className="h-4 w-4" />
          Live Performance
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-slate-100 ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Visual Analytics */}
      <AdminDashboardCharts data={data} />

      {/* Insights Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-indigo-600 text-white overflow-hidden relative">
            <CardHeader>
                <CardTitle className="text-lg">Growth Spotlight</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-indigo-100 leading-relaxed">
                    Student registrations are up by 12% this month. The most popular sector continues to be Web Development and AI.
                </p>
                <div className="mt-8 flex items-end justify-between">
                    <div>
                        <div className="text-3xl font-black">+{data.totalStudents}</div>
                        <div className="text-[10px] uppercase font-bold text-indigo-200">Total Students</div>
                    </div>
                    <Users className="h-12 w-12 opacity-20" />
                </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        </Card>

        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Booking Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm items-center">
                <span className="text-muted-foreground font-medium">Platform Efficiency</span>
                <span className="font-bold">
                     {data.totalBookings > 0 
                        ? `${((data.completedBookings / data.totalBookings) * 100).toFixed(1)}%`
                        : '0%'
                    }
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: data.totalBookings > 0 ? `${(data.completedBookings / data.totalBookings) * 100}%` : '0%' }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
                Platform efficiency measures successfully completed sessions against total bookings.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Monetization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <DollarSign className="h-6 w-6" />
                </div>
                <div>
                    <div className="text-2xl font-black">${(data.totalRevenue || 0).toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Gross Platform Revenue</div>
                </div>
             </div>
             <p className="text-xs text-muted-foreground leading-relaxed font-medium pt-2 border-t">
                Aggregated revenue from all course enrollments and professional tutoring sessions.
             </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}