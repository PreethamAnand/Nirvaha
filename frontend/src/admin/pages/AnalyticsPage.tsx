import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, FileText, FileDown } from "lucide-react";

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");

  // Mock data
  const userGrowthData = [
    { date: "Jan 1", users: 1200 },
    { date: "Jan 8", users: 1350 },
    { date: "Jan 15", users: 1450 },
    { date: "Jan 22", users: 1600 },
    { date: "Jan 29", users: 1800 },
    { date: "Feb 5", users: 2100 },
    { date: "Feb 12", users: 2543 },
  ];

  const bookingsData = [
    { day: "Mon", bookings: 45 },
    { day: "Tue", bookings: 52 },
    { day: "Wed", bookings: 48 },
    { day: "Thu", bookings: 61 },
    { day: "Fri", bookings: 55 },
    { day: "Sat", bookings: 72 },
    { day: "Sun", bookings: 68 },
  ];

  const revenueData = [
    { name: "Chat Sessions", value: 45231, color: "#10b981" },
    { name: "Video Sessions", value: 82340, color: "#14b8a6" },
    { name: "Products", value: 25680, color: "#06b6d4" },
    { name: "Courses", value: 34210, color: "#3b82f6" },
  ];

  const COLORS = ["#10b981", "#14b8a6", "#06b6d4", "#3b82f6"];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Analytics & Insights</h1>
          <p className="text-gray-700">Track platform performance and user engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] bg-white border-emerald-200 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="bg-white border-emerald-200 text-black hover:bg-emerald-50"
          >
            <Download className="mr-2 w-4 h-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            className="bg-white border-emerald-200 text-black hover:bg-emerald-50"
          >
            <FileText className="mr-2 w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Line Chart */}
        <Card className="bg-white border-emerald-200 p-6">
          <h2 className="text-xl font-bold text-black mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#10b98140" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #10b981",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                strokeWidth={2}
                name="Total Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bookings Per Day Bar Chart */}
        <Card className="bg-white border-emerald-200 p-6">
          <h2 className="text-xl font-bold text-black mb-4">Bookings Per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#10b98140" />
              <XAxis
                dataKey="day"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #10b981",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Bar dataKey="bookings" fill="#14b8a6" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Breakdown Pie Chart */}
        <Card className="bg-white border-emerald-200 p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-black mb-4">Revenue Breakdown</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #10b981",
                    borderRadius: "4px",
                  }}
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 flex flex-col justify-center">
              {revenueData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-black font-medium">{item.name}</span>
                  </div>
                  <span className="text-black font-bold">
                    ₹{item.value.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-4 border-t border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-black font-bold text-lg">Total Revenue</span>
                  <span className="text-emerald-600 font-bold text-xl">
                    ₹{revenueData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "2,543", change: "+12%" },
          { label: "Active Sessions", value: "483", change: "+8%" },
          { label: "Total Bookings", value: "1,247", change: "+15%" },
          { label: "Revenue (MTD)", value: "₹187,461", change: "+23%" },
        ].map((metric, index) => (
          <Card
            key={index}
            className="bg-white border-emerald-200 p-6"
          >
            <p className="text-gray-700 text-sm mb-2">{metric.label}</p>
            <p className="text-black text-2xl font-bold mb-1">{metric.value}</p>
            <p className="text-emerald-600 text-sm font-semibold">{metric.change}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}


