import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AdminTable } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { ActionMenu } from "@/admin/components/ActionMenu";
import { ConfirmModal } from "@/admin/components/ConfirmModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Calendar as CalendarIcon, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const formatDate = (date: Date | undefined): string => {
  if (!date) return "Select date";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  companionId: string;
  companionName: string;
  companionEmail: string;
  type: "Chat" | "Video";
  platform: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: "upcoming" | "completed" | "cancelled" | "in-progress";
  price: number;
  createdAt: string;
}

const INITIAL_BOOKINGS: Booking[] = [
    {
      id: "BK-001",
      userId: "U-001",
      userName: "Ravi Patel",
      userEmail: "ravi@example.com",
      companionId: "C-001",
      companionName: "Dr. Priya Sharma",
      companionEmail: "priya@example.com",
      type: "Video",
      platform: "Zoom",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: 60,
      status: "upcoming",
      price: 1000,
      createdAt: "2024-01-15",
    },
    {
      id: "BK-002",
      userId: "U-002",
      userName: "Sneha Reddy",
      userEmail: "sneha@example.com",
      companionId: "C-002",
      companionName: "Rajesh Kumar",
      companionEmail: "rajesh@example.com",
      type: "Chat",
      platform: "WhatsApp",
      date: "2024-01-19",
      time: "2:00 PM",
      duration: 30,
      status: "completed",
      price: 300,
      createdAt: "2024-01-12",
    },
    {
      id: "BK-003",
      userId: "U-003",
      userName: "Amit Kumar",
      userEmail: "amit@example.com",
      companionId: "C-003",
      companionName: "Anita Desai",
      companionEmail: "anita@example.com",
      type: "Video",
      platform: "Google Meet",
      date: "2024-01-18",
      time: "4:00 PM",
      duration: 60,
      status: "cancelled",
      price: 1100,
      createdAt: "2024-01-10",
    },
    {
      id: "BK-004",
      userId: "U-004",
      userName: "Meera Shah",
      userEmail: "meera@example.com",
      companionId: "C-001",
      companionName: "Dr. Priya Sharma",
      companionEmail: "priya@example.com",
      type: "Video",
      platform: "Zoom",
      date: "2024-01-21",
      time: "11:00 AM",
      duration: 60,
      status: "upcoming",
      price: 1000,
      createdAt: "2024-01-16",
    },
    {
      id: "BK-005",
      userId: "U-005",
      userName: "Karan Singh",
      userEmail: "karan@example.com",
      companionId: "C-004",
      companionName: "Suresh Patel",
      companionEmail: "suresh@example.com",
      type: "Chat",
      platform: "WhatsApp",
      date: "2024-01-17",
      time: "3:00 PM",
      duration: 45,
      status: "completed",
      price: 450,
      createdAt: "2024-01-08",
    },
  ];

export function BookingManagementPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "cancel" | "complete";
    booking: Booking;
  } | null>(null);

  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const matchesFilter = filter === "all" || booking.status === filter;
        const matchesSearch =
          booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.companionName.toLowerCase().includes(searchQuery.toLowerCase());
        const bookingDate = new Date(booking.date);
        const inRange =
          (!dateFrom || bookingDate >= dateFrom) && (!dateTo || bookingDate <= dateTo);
        return matchesFilter && matchesSearch && inRange;
      }),
    [bookings, filter, searchQuery, dateFrom, dateTo]
  );

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleAction = (type: string, booking: Booking) => {
    setConfirmAction({ type: type as "cancel" | "complete", booking });
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === confirmAction.booking.id
          ? { ...b, status: confirmAction.type === "cancel" ? "cancelled" : "completed" }
          : b
      )
    );
    setConfirmAction(null);
  };

  const columns = [
    {
      key: "id",
      header: "Booking ID",
      render: (item: Booking) => (
        <span className="font-mono text-black font-medium">{item.id}</span>
      ),
    },
    {
      key: "userName",
      header: "User",
      render: (item: Booking) => (
        <div>
          <div className="font-medium text-gray-900">{item.userName}</div>
          <div className="text-sm text-gray-600">{item.userEmail}</div>
        </div>
      ),
    },
    {
      key: "companionName",
      header: "Companion",
      render: (item: Booking) => (
        <div>
          <div className="font-medium text-gray-900">{item.companionName}</div>
          <div className="text-sm text-gray-600">{item.companionEmail}</div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (item: Booking) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            item.type === "Video"
              ? "bg-blue-100 text-blue-800 border border-blue-300"
              : "bg-teal-100 text-teal-800 border border-teal-300"
          }`}
        >
          {item.type}
        </span>
      ),
    },
    {
      key: "platform",
      header: "Platform",
      render: (item: Booking) => (
        <span className="text-gray-700">{item.platform}</span>
      ),
    },
    {
      key: "datetime",
      header: "Date & Time",
      render: (item: Booking) => (
        <div>
          <div className="text-black">{item.date}</div>
          <div className="text-sm text-gray-700">{item.time}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Booking) => (
        <StatusBadge status={item.status} variant="booking" />
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (item: Booking) => (
        <span className="font-semibold text-black">₹{item.price}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Booking) => (
        <ActionMenu
          variant="booking"
          onView={() => handleView(item)}
          onCancel={() => handleAction("cancel", item)}
          onComplete={() => handleAction("complete", item)}
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Booking Management</h1>
          <p className="text-gray-700">View and manage all platform bookings</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
          <Download className="mr-2 w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white border-emerald-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by ID, user, or companion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-emerald-200 text-black placeholder:text-gray-400"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full bg-white border-emerald-200 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white border-emerald-200 text-black hover:bg-emerald-50",
                  !dateFrom && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? formatDate(dateFrom) : <span>Date Range</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white">
              <div className="p-4 space-y-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">From</label>
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">To</label>
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    className="rounded-md border"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>

      {/* Table */}
      <Card className="bg-white border-emerald-200">
        <AdminTable
          data={filteredBookings}
          columns={columns}
          emptyMessage="No bookings found"
        />
      </Card>

      {/* View Booking Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details - {selectedBooking?.id}</DialogTitle>
            <DialogDescription>Complete booking information</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">User Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedBooking.userName}</p>
                    <p><span className="font-medium">Email:</span> {selectedBooking.userEmail}</p>
                    <p><span className="font-medium">User ID:</span> {selectedBooking.userId}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Companion Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedBooking.companionName}</p>
                    <p><span className="font-medium">Email:</span> {selectedBooking.companionEmail}</p>
                    <p><span className="font-medium">Companion ID:</span> {selectedBooking.companionId}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Session Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Type:</span> {selectedBooking.type}</p>
                    <p><span className="font-medium">Platform:</span> {selectedBooking.platform}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Date:</span> {selectedBooking.date}</p>
                    <p><span className="font-medium">Time:</span> {selectedBooking.time}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Duration:</span> {selectedBooking.duration} minutes</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Price:</span> ₹{selectedBooking.price}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Status</h3>
                <StatusBadge status={selectedBooking.status} variant="booking" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
            {selectedBooking?.status === "upcoming" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleAction("cancel", selectedBooking);
                  }}
                >
                  Cancel Booking
                </Button>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleAction("complete", selectedBooking);
                  }}
                >
                  Mark Completed
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={
          confirmAction
            ? `${confirmAction.type.charAt(0).toUpperCase()}${confirmAction.type.slice(1)} Booking`
            : "Confirm"
        }
        description={
          confirmAction
            ? `Are you sure you want to ${confirmAction.type} booking ${confirmAction.booking.id}?`
            : ""
        }
        confirmText={confirmAction?.type === "complete" ? "Mark Completed" : "Confirm"}
        onConfirm={confirmActionHandler}
        variant={confirmAction?.type === "cancel" ? "destructive" : "default"}
      />
    </div>
  );
}

