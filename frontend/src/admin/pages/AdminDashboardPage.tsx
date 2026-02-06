import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  BarChart3,
  TrendingUp,
  Activity,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { AdminTable } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data for previews
  const recentCompanions = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      expertise: "Yoga & Meditation",
      rating: 4.8,
      status: "pending",
      appliedDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      expertise: "Sound Healing",
      rating: 4.9,
      status: "approved",
      appliedDate: "2024-01-14",
    },
    {
      id: "3",
      name: "Anita Desai",
      expertise: "Wellness Counseling",
      rating: 4.7,
      status: "pending",
      appliedDate: "2024-01-13",
    },
  ];

  const recentBookings = [
    {
      id: "BK-001",
      userName: "Ravi Patel",
      companionName: "Dr. Priya Sharma",
      type: "Video",
      platform: "Zoom",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "upcoming",
    },
    {
      id: "BK-002",
      userName: "Sneha Reddy",
      companionName: "Rajesh Kumar",
      type: "Chat",
      platform: "WhatsApp",
      date: "2024-01-19",
      time: "2:00 PM",
      status: "completed",
    },
    {
      id: "BK-003",
      userName: "Amit Kumar",
      companionName: "Anita Desai",
      type: "Video",
      platform: "Google Meet",
      date: "2024-01-18",
      time: "4:00 PM",
      status: "cancelled",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
      change: "+12%",
      path: "/admin/users",
    },
    {
      title: "Active Sessions",
      value: "483",
      icon: Activity,
      color: "from-teal-500 to-cyan-500",
      change: "+8%",
      path: "/admin/bookings",
    },
    {
      title: "Revenue",
      value: "$45,231",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-500",
      change: "+23%",
      path: "/admin/analytics",
    },
    {
      title: "Bookings",
      value: "1,247",
      icon: BarChart3,
      color: "from-blue-500 to-indigo-500",
      change: "+15%",
      path: "/admin/bookings",
    },
  ];

  const pendingApprovals = recentCompanions.filter((c) => c.status === "pending").length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Dashboard Overview</h1>
        <p className="text-gray-700">Welcome back, {user?.name || "Admin"}</p>
      </div>

      {/* Stats Grid - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              onClick={() => navigate(stat.path)}
              className="bg-white border-emerald-200 hover:border-emerald-400 hover:shadow-lg cursor-pointer transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-700 text-sm font-medium">{stat.title}</h3>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-black">{stat.value}</span>
                  <span className="text-emerald-600 text-sm font-semibold">{stat.change}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Alerts / Pending Approvals */}
      {pendingApprovals > 0 && (
        <Card className="bg-yellow-50 border-yellow-300">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <h3 className="text-black font-semibold mb-1">
                  {pendingApprovals} Companion Application{pendingApprovals > 1 ? "s" : ""} Pending Approval
                </h3>
                <p className="text-gray-700 text-sm">
                  Review and approve companion applications to expand your network
                </p>
              </div>
              <Button
                onClick={() => navigate("/admin/companions?filter=pending")}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
              >
                Review Now
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companion Applications */}
        <Card className="bg-white border-emerald-200 shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Recent Companion Applications</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/companions")}
                className="text-emerald-700 hover:text-black hover:bg-emerald-50"
              >
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <AdminTable
              data={recentCompanions}
              columns={[
                {
                  key: "name",
                  header: "Name",
                },
                {
                  key: "expertise",
                  header: "Expertise",
                },
                {
                  key: "status",
                  header: "Status",
                  render: (item) => <StatusBadge status={item.status} variant="companion" />,
                },
                {
                  key: "appliedDate",
                  header: "Applied",
                },
              ]}
              emptyMessage="No recent companion applications"
            />
          </div>
        </Card>

        {/* Recent Bookings */}
        <Card className="bg-white border-emerald-200 shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Recent Bookings</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/bookings")}
                className="text-emerald-700 hover:text-black hover:bg-emerald-50"
              >
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <AdminTable
              data={recentBookings}
              columns={[
                {
                  key: "id",
                  header: "ID",
                },
                {
                  key: "userName",
                  header: "User",
                },
                {
                  key: "companionName",
                  header: "Companion",
                },
                {
                  key: "status",
                  header: "Status",
                  render: (item) => <StatusBadge status={item.status} variant="booking" />,
                },
                {
                  key: "date",
                  header: "Date",
                  render: (item) => (
                    <span className="text-gray-700 text-sm">
                      {item.date} {item.time}
                    </span>
                  ),
                },
              ]}
              emptyMessage="No recent bookings"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}


