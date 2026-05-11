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
import { Line, Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  stats: {
    serviceMix: { name: string; value: number }[];
    categoryDistribution: { name: string; value: number }[];
    spendingTrend: { month: string; amount: number }[];
  };
}

export default function StudentDashboardCharts({ stats }: DashboardChartsProps) {
  const { spendingTrend, serviceMix, categoryDistribution } = stats;

  // Spending Trend Data
  const trendData = {
    labels: spendingTrend.map((t) => t.month),
    datasets: [
      {
        fill: true,
        label: "Spending ($)",
        data: spendingTrend.map((t) => t.amount),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(99, 102, 241)",
      },
    ],
  };

  // Learning Mix Data (Courses vs Tutoring)
  const mixData = {
    labels: serviceMix.map((s) => s.name),
    datasets: [
      {
        data: serviceMix.map((s) => s.value),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  // Category Distribution Data
  const categoryData = {
    labels: categoryDistribution.map((c) => c.name),
    datasets: [
      {
        data: categoryDistribution.map((c) => c.value),
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(244, 63, 94, 0.8)",
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
      {/* Spending Trend */}
      <Card className="lg:col-span-8 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Learning Investment</CardTitle>
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

      {/* Service Mix */}
      <Card className="lg:col-span-4 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Service Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Doughnut data={mixData} options={donutOptions} />
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card className="lg:col-span-12 overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Interests by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full max-w-md h-full">
               <Doughnut data={categoryData} options={donutOptions} />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
