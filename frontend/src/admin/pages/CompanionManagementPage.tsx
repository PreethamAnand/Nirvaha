import React, { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AdminTable } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
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
import { Search, Star, CheckCircle, XCircle, Clock } from "lucide-react";

interface Companion {
  id: string;
  name: string;
  email: string;
  expertise: string;
  specialties: string[];
  languages: string[];
  rating: number;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
  bio: string;
  pricing: {
    chat: number;
    video: number;
  };
  availability: string[];
}

const INITIAL_COMPANIONS: Companion[] = [];

export function CompanionManagementPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [companions, setCompanions] = useState<Companion[]>(INITIAL_COMPANIONS);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "reject" | "delete";
    companion: Companion;
  } | null>(null);

  // Function to load companion applications from localStorage
  const loadApplications = () => {
    try {
      const applicationsRaw = localStorage.getItem('nirvaha_companion_applications');
      if (applicationsRaw) {
        const applications = JSON.parse(applicationsRaw);
        const formattedApplications: Companion[] = applications.map((app: any) => ({
          id: app.id,
          name: app.fullName,
          email: app.email,
          expertise: app.title,
          specialties: app.specialties.split(',').map((s: string) => s.trim()),
          languages: app.languages.split(',').map((l: string) => l.trim()),
          rating: 0,
          status: app.status || 'pending',
          appliedDate: new Date(app.submittedAt).toISOString().split('T')[0],
          bio: app.bio,
          pricing: {
            chat: parseInt(app.callRate) || 0,
            video: parseInt(app.hourlyRate) || 0,
          },
          availability: [app.availability],
        }));
        setCompanions([...formattedApplications, ...INITIAL_COMPANIONS]);
      } else {
        setCompanions([...INITIAL_COMPANIONS]);
      }
    } catch (error) {
      console.error('Failed to load companion applications:', error);
    }
  };

  // Load companion applications on mount and set up polling
  useEffect(() => {
    loadApplications();
    
    // Set up polling to check for new applications every 2 seconds
    const interval = setInterval(() => {
      loadApplications();
    }, 2000);
    
    // Also listen for storage changes (for when localStorage is updated in other tabs)
    const handleStorageChange = () => {
      loadApplications();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const filteredCompanions = useMemo(
    () =>
      companions.filter((companion) => {
        const matchesFilter = filter === "all" || companion.status === filter;
        const matchesSearch =
          companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          companion.expertise.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      }),
    [companions, filter, searchQuery]
  );

  const handleView = (companion: Companion) => {
    setSelectedCompanion(companion);
    setIsViewModalOpen(true);
  };

  const openConfirm = (type: "approve" | "reject" | "delete", companion: Companion) => {
    setConfirmAction({ type, companion });
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;
    if (confirmAction.type === "delete") {
      setCompanions((prev) => prev.filter((c) => c.id !== confirmAction.companion.id));
      // Also remove from localStorage if it's from applications
      try {
        const applicationsRaw = localStorage.getItem('nirvaha_companion_applications');
        if (applicationsRaw) {
          const applications = JSON.parse(applicationsRaw);
          const filtered = applications.filter((app: any) => app.id !== confirmAction.companion.id);
          localStorage.setItem('nirvaha_companion_applications', JSON.stringify(filtered));
        }
      } catch (error) {
        console.error('Failed to delete from localStorage:', error);
      }
    } else {
      const updatedCompanions = companions.map((c) =>
        c.id === confirmAction.companion.id
          ? { ...c, status: confirmAction.type === "approve" ? "approved" : "rejected" }
          : c
      );
      setCompanions(updatedCompanions);
      
      // Update status in localStorage
      try {
        const applicationsRaw = localStorage.getItem('nirvaha_companion_applications');
        if (applicationsRaw) {
          const applications = JSON.parse(applicationsRaw);
          const updated = applications.map((app: any) =>
            app.id === confirmAction.companion.id
              ? { ...app, status: confirmAction.type === "approve" ? "approved" : "rejected" }
              : app
          );
          localStorage.setItem('nirvaha_companion_applications', JSON.stringify(updated));
        }
      } catch (error) {
        console.error('Failed to update localStorage:', error);
      }
      
      // Save approved companion to localStorage
      if (confirmAction.type === "approve") {
        try {
          const approvedRaw = localStorage.getItem('nirvaha_approved_companions') || '[]';
          const approved = JSON.parse(approvedRaw);
          const companion = confirmAction.companion;
          // Add approved companion if not already present
          if (!approved.some((c: any) => c.email === companion.email)) {
            approved.push({
              id: companion.id,
              name: companion.name,
              email: companion.email,
              expertise: companion.expertise,
              status: 'approved'
            });
            localStorage.setItem('nirvaha_approved_companions', JSON.stringify(approved));
          }
        } catch (error) {
          console.error('Failed to save approved companion:', error);
        }
      }
    }
    setConfirmAction(null);
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (item: Companion) => (
        <div>
          <div className="font-medium text-black">{item.name}</div>
          <div className="text-sm text-gray-700">{item.email}</div>
        </div>
      ),
    },
    {
      key: "expertise",
      header: "Expertise",
    },
    {
      key: "rating",
      header: "Rating",
      render: (item: Companion) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-black">{item.rating}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Companion) => <StatusBadge status={item.status} variant="companion" />,
    },
    {
      key: "appliedDate",
      header: "Applied Date",
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Companion) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1"
            onClick={() => openConfirm("approve", item)}
            disabled={item.status === "approved"}
            title="Approve companion application"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </Button>
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1"
            onClick={() => openConfirm("reject", item)}
            disabled={item.status === "rejected"}
            title="Reject companion application"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </Button>
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
            onClick={() => openConfirm("delete", item)}
            title="Hold application for review"
          >
            <Clock className="w-4 h-4" />
            Hold
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Companion Management</h1>
          <p className="text-gray-700">Approve, reject, and manage companion applications</p>
        </div>
      </div>

      <Card className="bg-white border-emerald-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-emerald-200 text-black placeholder:text-gray-400"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-white border-emerald-200 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="bg-white border-emerald-200">
        <AdminTable data={filteredCompanions} columns={columns} emptyMessage="No companions found" />
      </Card>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCompanion?.name}'s Profile</DialogTitle>
            <DialogDescription>Complete companion application details</DialogDescription>
          </DialogHeader>
          {selectedCompanion && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-sm text-gray-600">{selectedCompanion.bio}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompanion.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompanion.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Chat Session</p>
                    <p className="text-lg font-semibold">₹{selectedCompanion.pricing.chat}/hr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Video Session</p>
                    <p className="text-lg font-semibold">₹{selectedCompanion.pricing.video}/hr</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Availability</h3>
                <p className="text-sm text-gray-600">{selectedCompanion.availability.join(", ")}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedCompanion.status} variant="companion" />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{selectedCompanion.rating}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
            {selectedCompanion?.status === "pending" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openConfirm("reject", selectedCompanion);
                  }}
                >
                  Reject
                </Button>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openConfirm("approve", selectedCompanion);
                  }}
                >
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmModal
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={
          confirmAction
            ? `${confirmAction.type.charAt(0).toUpperCase()}${confirmAction.type.slice(1)} Companion`
            : "Confirm"
        }
        description={
          confirmAction
            ? confirmAction.type === "delete"
              ? `Are you sure you want to delete ${confirmAction.companion.name}?`
              : `Are you sure you want to ${confirmAction.type} ${confirmAction.companion.name}?`
            : ""
        }
        confirmText={
          confirmAction?.type === "approve"
            ? "Approve"
            : confirmAction?.type === "reject"
              ? "Reject"
              : "Delete"
        }
        onConfirm={confirmActionHandler}
        variant={confirmAction?.type === "delete" || confirmAction?.type === "reject" ? "destructive" : "default"}
      />
    </div>
  );
}


