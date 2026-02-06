import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Shield,
  Music,
  Headphones,
  ShoppingBag,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [contentOpen, setContentOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      exact: true,
    },
    {
      title: "Companion Management",
      icon: Users,
      path: "/admin/companions",
    },
    {
      title: "Booking Management",
      icon: Calendar,
      path: "/admin/bookings",
    },
    {
      title: "Content Management",
      icon: FileText,
      children: [
        {
          title: "Meditation",
          icon: Music,
          path: "/admin/content/meditation",
        },
        {
          title: "Sound Healing",
          icon: Headphones,
          path: "/admin/content/sound",
        },
        {
          title: "Marketplace Products",
          icon: ShoppingBag,
          path: "/admin/content/products",
        },
      ],
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
    {
      title: "User Management",
      icon: Shield,
      path: "/admin/users",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white border-b border-emerald-200 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-gray-900 font-bold text-lg">Admin Panel</h2>
                  <p className="text-gray-600 text-xs">Nirvaha Wellness</p>
                </div>
              </div>
            </div>

            {/* Right: User Info and Logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                    {user?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-gray-900 text-sm font-medium">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {user?.email || "admin@nirvaha.com"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-4 flex items-center gap-1 overflow-x-auto pb-2">
            {menuItems.map((item) => {
              if (item.children) {
                return (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 whitespace-nowrap",
                          item.children.some((child) => isActive(child.path)) &&
                            "bg-emerald-50 text-emerald-700"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.title}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-white border-emerald-200 shadow-lg z-[100] min-w-[200px]">
                      {item.children.map((child) => (
                        <DropdownMenuItem
                          key={child.title}
                          onSelect={() => navigate(child.path)}
                          className={cn(
                            "flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 focus:bg-emerald-50 focus:text-emerald-700",
                            isActive(child.path) && "bg-emerald-50 text-emerald-700"
                          )}
                        >
                          <child.icon className="w-4 h-4" />
                          {child.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Button
                  key={item.title}
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 whitespace-nowrap",
                    isActive(item.path, item.exact) && "bg-emerald-50 text-emerald-700"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="min-h-full p-6 bg-gradient-to-br from-emerald-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto">{children || <Outlet />}</div>
        </div>
      </main>
    </div>
  );
}

