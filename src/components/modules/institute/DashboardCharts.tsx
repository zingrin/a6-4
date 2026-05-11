"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstituteOverview } from "@/types";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DashboardChartsProps {
  overview: InstituteOverview;
}

export default function DashboardCharts({ overview }: DashboardChartsProps) {
  const { enrollmentsTrend, enrollmentsByCourse, coursesByLevel, coursesByStatus } = overview;

  // Enrollment Trend Data
  const trendData = {
    labels: enrollmentsTrend.map((t) => t.month),
    datasets: [
      {
        fill: true,
        label: "Enrollments",
        data: enrollmentsTrend.map((t) => t.enrollments),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(99, 102, 241)",
      },
    ],
  };

  // Top Courses Data
  const coursesData = {
    labels: enrollmentsByCourse.map((c) => c.name),
    datasets: [
      {
        label: "Students",
        data: enrollmentsByCourse.map((c) => c.enrollments),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(244, 63, 94, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderRadius: 6,
      },
    ],
  };

  // Distribution Data (Level)
  const levelData = {
    labels: coursesByLevel.map((l) => l.name),
    datasets: [
      {
        data: coursesByLevel.map((l) => l.value),
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  // Distribution Data (Status)
  const statusData = {
    labels: coursesByStatus.map((s) => s.name),
    datasets: [
      {
        data: coursesByStatus.map((s) => s.value),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(148, 163, 184, 0.8)",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const donutOptions = {
    ...commonOptions,
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
      {/* Enrollment Trend */}
      <Card className="lg:col-span-8 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Enrollment Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Line
            data={trendData}
            options={{
              ...commonOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: true,
                    color: "rgba(0,0,0,0.05)",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Course Level Distribution */}
      <Card className="lg:col-span-4 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Content Level</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Doughnut data={levelData} options={donutOptions} />
        </CardContent>
      </Card>

      {/* Top Courses by Enrollment */}
      <Card className="lg:col-span-8 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Popular Courses</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <Bar
            data={coursesData}
            options={{
              ...commonOptions,
              indexAxis: "y" as const,
              scales: {
                x: {
                  beginAtZero: true,
                  grid: {
                    display: true,
                    color: "rgba(0,0,0,0.05)",
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Course Status Distribution */}
      <Card className="lg:col-span-4 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Publishing Status</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <Doughnut data={statusData} options={donutOptions} />
        </CardContent>
      </Card>
    </div>
  );
}
