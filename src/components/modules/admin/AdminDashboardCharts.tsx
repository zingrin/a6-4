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

interface AdminChartsProps {
  data: {
    platformTrend: { month: string; revenue: number; signups: number }[];
    roleDistribution: { name: string; value: number }[];
    bookingDistribution: { name: string; value: number }[];
  };
}

export default function AdminDashboardCharts({ data }: AdminChartsProps) {
  const { platformTrend, roleDistribution, bookingDistribution } = data;

  // Platform Growth Trend (Revenue & Signups)
  const trendData = {
    labels: platformTrend.map((t) => t.month),
    datasets: [
      {
        fill: true,
        label: "Platform Revenue ($)",
        data: platformTrend.map((t) => t.revenue),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: "New User Signups",
        data: platformTrend.map((t) => t.signups),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  // User Role Distribution
  const roleData = {
    labels: roleDistribution.map((r) => r.name),
    datasets: [
      {
        data: roleDistribution.map((r) => r.value),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(148, 163, 184, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Booking Status Distribution
  const bookingData = {
    labels: bookingDistribution.map((b) => b.name),
    datasets: [
      {
        data: bookingDistribution.map((b) => b.value),
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 11 },
        },
      },
    },
  };

  const lineOptions = {
    ...options,
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: { display: true, text: 'Revenue ($)' },
        beginAtZero: true,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: { display: true, text: 'User Signups' },
        beginAtZero: true,
        grid: { drawOnChartArea: false },
      },
    },
  };

  const donutOptions = {
    ...options,
    cutout: "70%",
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
      {/* Platform Trends */}
      <Card className="lg:col-span-8 border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Platform Performance Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <Line data={trendData} options={lineOptions} />
        </CardContent>
      </Card>

      {/* User Mix */}
      <Card className="lg:col-span-4 border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base font-semibold">User Role Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <Doughnut data={roleData} options={donutOptions} />
        </CardContent>
      </Card>

      {/* Booking Health */}
      <Card className="lg:col-span-12 border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Global Booking Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
             <Bar 
                data={bookingData} 
                options={{
                    ...options,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }} 
            />
        </CardContent>
      </Card>
    </div>
  );
}
