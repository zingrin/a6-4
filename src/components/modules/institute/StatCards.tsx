import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, DollarSign } from "lucide-react";

interface StatCardsProps {
  stats: {
    totalCourses: number;
    totalMentors: number;
    totalEnrollments: number;
    totalRevenue: number;
  };
}

export default function StatCards({ stats }: StatCardsProps) {
  const statItems = [
    {
      title: "Total Mentors",
      value: stats.totalMentors,
      icon: Users,
      description: "Staff instructors",
      color: "text-blue-500",
    },
    {
      title: "Active Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      description: "Programs offered",
      color: "text-indigo-500",
    },
    {
      title: "Total Enrollments",
      value: stats.totalEnrollments,
      icon: GraduationCap,
      description: "Active learners",
      color: "text-emerald-500",
    },
    {
      title: "Total Revenue",
      value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      description: "Lifetime earnings",
      color: "text-amber-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold tracking-tight uppercase text-muted-foreground">{item.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-background shadow-sm ${item.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 opacity-80">
                {item.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
