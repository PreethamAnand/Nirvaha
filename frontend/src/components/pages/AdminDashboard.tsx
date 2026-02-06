import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Users,
  BarChart3,
  Settings,
  Shield,
  TrendingUp,
  Activity,
} from "lucide-react";

export function AdminDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect non-admin users
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
      change: "+12%",
    },
    {
      title: "Active Sessions",
      value: "483",
      icon: Activity,
      color: "from-teal-500 to-cyan-500",
      change: "+8%",
    },
    {
      title: "Revenue",
      value: "$45,231",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-500",
      change: "+23%",
    },
    {
      title: "Bookings",
      value: "1,247",
      icon: BarChart3,
      color: "from-blue-500 to-indigo-500",
      change: "+15%",
    },
  ];

  const adminSections = [
    {
      title: "Companion Management",
      description: "Approve, reject, or manage companion applications",
      icon: Users,
      color: "from-emerald-400 to-teal-400",
      link: "#companions",
    },
    {
      title: "Content Management",
      description: "Manage meditations, sounds, courses, and products",
      icon: Settings,
      color: "from-teal-400 to-cyan-400",
      link: "#content",
    },
    {
      title: "Booking Management",
      description: "View and manage all platform bookings",
      icon: BarChart3,
      color: "from-cyan-400 to-blue-400",
      link: "#bookings",
    },
    {
      title: "User Management",
      description: "Monitor and manage user accounts and roles",
      icon: Shield,
      color: "from-blue-400 to-indigo-400",
      link: "#users",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #0a2f2a 0%, #0f3d38 14%, #1a5d54 28%, #2e7f74 42%, #4fa89d 56%, #6dc5b8 70%, #8dd9ce 84%, #a9e7da 100%)",
        }}
      />
      <div className="absolute inset-0 bg-teal-900/20 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-white/80">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-2xl shadow-lg border border-white/20">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Administrator</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/80 text-sm font-medium">
                      {stat.title}
                    </h3>
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="text-emerald-400 text-sm font-semibold">
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admin Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Management Sections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <a
                  key={index}
                  href={section.link}
                  className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all shadow-lg overflow-hidden cursor-pointer"
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity z-0`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {section.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
              View All Companions
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
              View All Bookings
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
