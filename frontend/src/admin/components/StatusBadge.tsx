import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "companion" | "booking" | "user" | "default";
  className?: string;
}

export function StatusBadge({ status, variant = "default", className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (variant) {
      case "companion":
        switch (status.toLowerCase()) {
          case "pending":
            return { label: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-300" };
          case "approved":
            return { label: "Approved", className: "bg-emerald-100 text-emerald-800 border-emerald-300" };
          case "rejected":
            return { label: "Rejected", className: "bg-red-100 text-red-800 border-red-300" };
          case "suspended":
            return { label: "Suspended", className: "bg-orange-100 text-orange-800 border-orange-300" };
          default:
            return { label: status, className: "bg-gray-100 text-gray-800 border-gray-300" };
        }
      case "booking":
        switch (status.toLowerCase()) {
          case "upcoming":
            return { label: "Upcoming", className: "bg-blue-100 text-blue-800 border-blue-300" };
          case "completed":
            return { label: "Completed", className: "bg-emerald-100 text-emerald-800 border-emerald-300" };
          case "cancelled":
            return { label: "Cancelled", className: "bg-red-100 text-red-800 border-red-300" };
          case "in-progress":
            return { label: "In Progress", className: "bg-teal-100 text-teal-800 border-teal-300" };
          default:
            return { label: status, className: "bg-gray-100 text-gray-800 border-gray-300" };
        }
      case "user":
        switch (status.toLowerCase()) {
          case "active":
            return { label: "Active", className: "bg-emerald-100 text-emerald-800 border-emerald-300" };
          case "suspended":
            return { label: "Suspended", className: "bg-orange-100 text-orange-800 border-orange-300" };
          case "banned":
            return { label: "Banned", className: "bg-red-100 text-red-800 border-red-300" };
          case "pending":
            return { label: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-300" };
          default:
            return { label: status, className: "bg-gray-100 text-gray-800 border-gray-300" };
        }
      default:
        return { label: status, className: "bg-gray-100 text-gray-800 border-gray-300" };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge
      variant="outline"
      className={cn(
        "border font-medium capitalize",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}


