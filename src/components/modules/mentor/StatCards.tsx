"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Star, Clock } from "lucide-react";

interface MentorStatCardsProps {
  stats: {
    totalCourses: number;
    totalStudents: number;
    avgRating: number;
    totalReviews: number;
  };
}

export default function MentorStatCards({ stats }: MentorStatCardsProps) {
  const cards = [
    {
      title: "Assigned Courses",
      value: stats.totalCourses,
      description: "Active programs",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      description: "Across all courses",
      icon: GraduationCap,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Avg. Rating",
      value: stats.avgRating.toFixed(1),
      description: `From ${stats.totalReviews} reviews`,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Engagement",
      value: "High",
      description: "Based on activity",
      icon: Clock,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold tracking-tight text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tighter">{card.value}</div>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
