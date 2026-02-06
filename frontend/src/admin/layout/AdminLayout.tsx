import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  Music,
  Headphones,
  ShoppingBag,
  LogOut,
  ChevronDown,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  exact?: boolean;
  children?: MenuItem[];
}

interface DropdownPosition {
  top: number;
  left: number;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<DropdownPosition>({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Check if click is on a dropdown trigger button
        const isDropdownTrigger = Object.values(buttonRefs.current).some(
          (btn) => btn && btn.contains(event.target as Node)
        );
        if (!isDropdownTrigger) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      exact: true,
    },
    {
      title: "Management",
      icon: Users,
      children: [
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
              title: "Marketplace",
              icon: ShoppingBag,
              path: "/admin/content/products",
            },
          ],
        },
      ],
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      children: [
        {
          title: "User Management",
          icon: Shield,
          path: "/admin/users",
        },
        {
          title: "Platform Settings",
          icon: Settings,
          path: "/admin/settings",
        },
      ],
    },
  ];

  const isActive = (path?: string, exact = false): boolean => {
    if (!path) return false;
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const isDropdownActive = (children?: MenuItem[]): boolean => {
    if (!children) return false;
    return children.some((child) => 
      child.path ? isActive(child.path) : isDropdownActive(child.children)
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderMenuItemContent = (item: MenuItem, isSubmenu = false) => (
    <>
      <item.icon className={cn("flex-shrink-0", isSubmenu ? "w-4 h-4" : "w-4 h-4")} />
      <span>{item.title}</span>
      {item.children && !isSubmenu && (
        <ChevronDown className={cn(
          "w-4 h-4 ml-auto transition-transform",
          openDropdown === item.title && "rotate-180"
        )} />
      )}
    </>
  );

  const renderDropdown = (item: MenuItem) => {
    const isOpen = openDropdown === item.title;
    
    const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isOpen) {
        setOpenDropdown(null);
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        setDropdownPos({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
        setOpenDropdown(item.title);
      }
    };

    return (
      <div key={item.title}>
        <Button
          ref={(el) => {
            if (el) buttonRefs.current[item.title] = el;
          }}
          variant="ghost"
          onClick={handleDropdownClick}
          className={cn(
            "flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 whitespace-nowrap",
            (isOpen || isDropdownActive(item.children)) && "bg-emerald-50 text-emerald-700"
          )}
        >
          {renderMenuItemContent(item)}
        </Button>

        {isOpen && item.children && createPortal(
          // eslint-disable-next-line react/no-unknown-property
          <div 
            ref={dropdownRef}
            className="fixed bg-white border border-emerald-200 rounded-3xl shadow-xl z-[9999] min-w-[240px] py-2"
            style={{
              top: `${dropdownPos.top}px`,
              left: `${dropdownPos.left}px`,
            } as React.CSSProperties}
          >
            {item.children.map((child) => (
              <div key={child.title}>
                {child.children ? (
                  // Nested category
                  <div className="px-0 py-1">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      {child.title}
                    </div>
                    {child.children.map((grandchild) => (
                      <button
                        key={grandchild.title}
                        onClick={() => {
                          navigate(grandchild.path!);
                          setOpenDropdown(null);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-6 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-left",
                          isActive(grandchild.path) && "bg-emerald-50 text-emerald-700 font-medium"
                        )}
                      >
                        <grandchild.icon className="w-4 h-4 flex-shrink-0" />
                        <span>{grandchild.title}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  // Regular item
                  <button
                    onClick={() => {
                      navigate(child.path!);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-left",
                      isActive(child.path) && "bg-emerald-50 text-emerald-700 font-medium"
                    )}
                  >
                    <child.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{child.title}</span>
                  </button>
                )}
              </div>
            ))}
          </div>,
          document.body
        )}
      </div>
    );
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

            {/* Center-Right: Navigation Menu */}
            <nav className="flex items-center gap-1 overflow-x-auto overflow-y-visible">
            {menuItems.map((item) => {
              if (item.children) {
                return renderDropdown(item);
              }

              return (
                <Button
                  key={item.title}
                  variant="ghost"
                  onClick={() => navigate(item.path!)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 whitespace-nowrap",
                    isActive(item.path, item.exact) && "bg-emerald-50 text-emerald-700"
                  )}
                >
                  {renderMenuItemContent(item)}
                </Button>
              );
            })}
            </nav>

            {/* Right: User Info and Logout */}
            <div className="flex items-center gap-4 ml-8">
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
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
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

