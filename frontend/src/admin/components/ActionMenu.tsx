import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Check, X, Ban, Edit, Trash2 } from "lucide-react";

interface ActionMenuProps {
  onView?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onSuspend?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  variant?: "companion" | "booking" | "content" | "user";
}

export function ActionMenu({
  onView,
  onApprove,
  onReject,
  onSuspend,
  onEdit,
  onDelete,
  onCancel,
  onComplete,
  variant = "default",
}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onView && (
          <DropdownMenuItem onClick={onView} className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        )}
        {onApprove && (
          <DropdownMenuItem onClick={onApprove} className="cursor-pointer text-emerald-600">
            <Check className="mr-2 h-4 w-4" />
            Approve
          </DropdownMenuItem>
        )}
        {onReject && (
          <DropdownMenuItem onClick={onReject} className="cursor-pointer text-red-600">
            <X className="mr-2 h-4 w-4" />
            Reject
          </DropdownMenuItem>
        )}
        {onSuspend && (
          <DropdownMenuItem onClick={onSuspend} className="cursor-pointer text-orange-600">
            <Ban className="mr-2 h-4 w-4" />
            Suspend
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
        {onComplete && (
          <DropdownMenuItem onClick={onComplete} className="cursor-pointer text-emerald-600">
            <Check className="mr-2 h-4 w-4" />
            Mark Completed
          </DropdownMenuItem>
        )}
        {onCancel && (
          <DropdownMenuItem onClick={onCancel} className="cursor-pointer text-red-600">
            <X className="mr-2 h-4 w-4" />
            Cancel Booking
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


