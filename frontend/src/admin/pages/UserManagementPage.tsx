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
import { Search } from "lucide-react";

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "companion" | "admin";
  status: "active" | "suspended" | "banned" | "pending";
  joinDate: string;
  lastActive: string;
}

export function UserManagementPage() {
  const [filter, setFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<PlatformUser[]>([
    {
      id: "U-001",
      name: "Ravi Patel",
      email: "ravi@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-01",
      lastActive: "2024-01-18",
    },
    {
      id: "U-002",
      name: "Sneha Reddy",
      email: "sneha@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-05",
      lastActive: "2024-01-19",
    },
    {
      id: "U-003",
      name: "Dr. Priya Sharma",
      email: "priya@example.com",
      role: "companion",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
    },
    {
      id: "U-004",
      name: "Amit Kumar",
      email: "amit@example.com",
      role: "user",
      status: "suspended",
      joinDate: "2023-12-20",
      lastActive: "2024-01-15",
    },
    {
      id: "U-005",
      name: "Admin User",
      email: "admin@nirvaha.com",
      role: "admin",
      status: "active",
      joinDate: "2023-11-01",
      lastActive: "2024-01-19",
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "suspend" | "unsuspend";
    user: PlatformUser;
  } | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [roleDraft, setRoleDraft] = useState<PlatformUser["role"]>("user");
  const [roleTarget, setRoleTarget] = useState<PlatformUser | null>(null);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const matchesFilter = filter === "all" || user.status === filter;
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesSearch =
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesRole && matchesSearch;
      }),
    [users, filter, roleFilter, searchQuery]
  );

  const handleView = (user: PlatformUser) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleAction = (type: string, user: PlatformUser) => {
    if (type === "change-role") {
      setRoleTarget(user);
      setRoleDraft(user.role);
      setRoleModalOpen(true);
    } else {
      const actionType: "suspend" | "unsuspend" =
        user.status === "suspended" ? "unsuspend" : "suspend";
      setConfirmAction({ type: actionType, user });
    }
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === confirmAction.user.id
          ? { ...u, status: confirmAction.type === "suspend" ? "suspended" : "active" }
          : u
      )
    );
    setConfirmAction(null);
  };

  const handleRoleSave = () => {
    if (!roleTarget) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === roleTarget.id ? { ...u, role: roleDraft } : u))
    );
    setRoleModalOpen(false);
    setRoleTarget(null);
  };

  const getRoleBadge = (role: string) => {
    const configs = {
      admin: { label: "Admin", className: "bg-purple-100 text-purple-800 border-purple-300" },
      companion: { label: "Companion", className: "bg-teal-100 text-teal-800 border-teal-300" },
      user: { label: "User", className: "bg-blue-100 text-blue-800 border-blue-300" },
    };
    const config = configs[role as keyof typeof configs] || configs.user;
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (item: PlatformUser) => (
        <div>
          <div className="font-medium text-black">{item.name}</div>
          <div className="text-sm text-gray-700">{item.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (item: PlatformUser) => getRoleBadge(item.role),
    },
    {
      key: "status",
      header: "Status",
      render: (item: PlatformUser) => (
        <StatusBadge status={item.status} variant="user" />
      ),
    },
    {
      key: "joinDate",
      header: "Join Date",
    },
    {
      key: "lastActive",
      header: "Last Active",
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: PlatformUser) => (
        <ActionMenu
          variant="user"
          onView={() => handleView(item)}
          onSuspend={() => handleAction("suspend", item)}
          onEdit={() => handleAction("change-role", item)}
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">User Management</h1>
          <p className="text-gray-700">Monitor and manage user accounts and roles</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white border-emerald-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-emerald-200 text-black placeholder:text-gray-400"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full bg-white border-emerald-200 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="companion">Companion</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full bg-white border-emerald-200 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Table */}
      <Card className="bg-white border-emerald-200">
        <AdminTable
          data={filteredUsers}
          columns={columns}
          emptyMessage="No users found"
        />
      </Card>

      {/* View User Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Complete user account information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedUser.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                    <p><span className="font-medium">User ID:</span> {selectedUser.id}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Account Details</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Role:</span> {getRoleBadge(selectedUser.role)}</p>
                    <p><span className="font-medium">Status:</span> <StatusBadge status={selectedUser.status} variant="user" /></p>
                    <p><span className="font-medium">Join Date:</span> {selectedUser.joinDate}</p>
                    <p><span className="font-medium">Last Active:</span> {selectedUser.lastActive}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
            {selectedUser?.status === "active" && selectedUser.role !== "admin" && (
              <Button
                variant="destructive"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleAction("suspend", selectedUser);
                }}
              >
                Suspend User
              </Button>
            )}
            {selectedUser?.role !== "admin" && (
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleAction("change-role", selectedUser);
                }}
              >
                Change Role
              </Button>
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
            ? `${confirmAction.type === "suspend" ? "Suspend" : "Unblock"} User`
            : "Confirm"
        }
        description={
          confirmAction
            ? `Are you sure you want to ${
                confirmAction.type === "suspend" ? "block" : "unblock"
              } ${confirmAction.user.name}?`
            : ""
        }
        confirmText={confirmAction?.type === "suspend" ? "Block" : "Unblock"}
        onConfirm={confirmActionHandler}
        variant={confirmAction?.type === "suspend" || confirmAction?.type === "ban" ? "destructive" : "default"}
      />

      {/* Change Role Modal */}
      <Dialog open={roleModalOpen} onOpenChange={setRoleModalOpen}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription>Select a new role for this user.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={roleDraft} onValueChange={(value) => setRoleDraft(value as PlatformUser["role"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="companion">Companion</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              onClick={handleRoleSave}
            >
              Save Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


