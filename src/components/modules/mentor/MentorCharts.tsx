"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface MentorChartsProps {
  overview: {
    enrollmentsTrend: Array<{ month: string; enrollments: number }>;
    coursesByLevel: Array<{ name: string; value: number }>;
    topCourses: Array<{ name: string; enrollments: number }>;
  };
}

export default function MentorCharts({ overview }: MentorChartsProps) {
  // Line Chart Data
  const enrollmentData = {
    labels: overview.enrollmentsTrend.map((item) => item.month),
    datasets: [
      {
        fill: true,
        label: "Students Enrolled",
        data: overview.enrollmentsTrend.map((item) => item.enrollments),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(99, 102, 241)",
      },
    ],
  };

  // Doughnut Chart Data
  const levelData = {
    labels: overview.coursesByLevel.map((item) => item.name),
    datasets: [
      {
        data: overview.coursesByLevel.map((item) => item.value),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Horizontal Bar Chart Data
  const barData = {
    labels: overview.topCourses.map((c) => c.name),
    datasets: [
      {
        label: "Enrollments",
        data: overview.topCourses.map((c) => c.enrollments),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Line Chart */}
      <Card className="lg:col-span-2 border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Enrollment Velocity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <Line data={enrollmentData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Doughnut Chart */}
      <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Course Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={levelData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                      font: {
                        size: 12,
                        weight: "bold",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="lg:col-span-3 border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Class Popularity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <Bar
              data={barData}
              options={{
                indexAxis: "y",
                ...chartOptions,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
