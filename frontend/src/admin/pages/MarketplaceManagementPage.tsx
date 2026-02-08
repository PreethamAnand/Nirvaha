import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AdminTable } from "@/admin/components/AdminTable";
import { ConfirmModal } from "@/admin/components/ConfirmModal";
import { Search, CheckCircle, Trash2 } from "lucide-react";

const MARKETPLACE_REQUESTS_KEY = "nirvaha_marketplace_requests";

type MarketplaceRequest = {
  id: string;
  type: "session" | "retreat" | "product";
  status: "pending" | "approved";
  data: any;
  createdAt: number;
};

export function MarketplaceManagementPage() {
  const [requests, setRequests] = useState<MarketplaceRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "delete";
    request: MarketplaceRequest;
  } | null>(null);

  const loadRequests = () => {
    try {
      const raw = localStorage.getItem(MARKETPLACE_REQUESTS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setRequests(Array.isArray(parsed) ? parsed : []);
    } catch {
      setRequests([]);
    }
  };

  const saveRequests = (next: MarketplaceRequest[]) => {
    setRequests(next);
    try {
      localStorage.setItem(MARKETPLACE_REQUESTS_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  };

  useEffect(() => {
    loadRequests();
    const handleStorage = () => loadRequests();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleApprove = (request: MarketplaceRequest) => {
    const next: MarketplaceRequest[] = requests.map((item) =>
      item.id === request.id ? { ...item, status: "approved" as const } : item
    );
    saveRequests(next);
  };

  const handleDelete = (request: MarketplaceRequest) => {
    const next = requests.filter((item) => item.id !== request.id);
    saveRequests(next);
  };

  const filteredRequests = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return requests.filter((item) => {
      const title = item.data?.title || item.data?.name || "";
      return title.toLowerCase().includes(query) || item.type.includes(query);
    });
  }, [requests, searchQuery]);

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (item: MarketplaceRequest) => (
        <div>
          <div className="font-medium text-black">
            {item.data?.title || item.data?.name || "Untitled"}
          </div>
          <div className="text-sm text-gray-600">{item.type}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: MarketplaceRequest) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold border ${
            item.status === "approved"
              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
              : "bg-amber-100 text-amber-700 border-amber-200"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Submitted",
      render: (item: MarketplaceRequest) => (
        <span className="text-gray-700">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: MarketplaceRequest) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1"
            onClick={() => setConfirmAction({ type: "approve", request: item })}
            disabled={item.status === "approved"}
          >
            <CheckCircle className="w-4 h-4" />
            Accept
          </Button>
          <Button
            size="sm"
            className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1"
            onClick={() => setConfirmAction({ type: "delete", request: item })}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Marketplace Requests</h1>
        <p className="text-gray-700">Review and approve marketplace submissions</p>
      </div>

      <Card className="bg-white border-emerald-200 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by title or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-emerald-200 text-black placeholder:text-gray-400"
            />
          </div>
        </div>
      </Card>

      <Card className="bg-white border-emerald-200">
        <AdminTable
          data={filteredRequests}
          columns={columns}
          emptyMessage="No marketplace requests yet"
        />
      </Card>

      <ConfirmModal
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={
          confirmAction
            ? `${confirmAction.type === "approve" ? "Accept" : "Delete"} Request`
            : "Confirm"
        }
        description={
          confirmAction
            ? confirmAction.type === "approve"
              ? `Accept ${confirmAction.request.data?.title || confirmAction.request.data?.name || "this request"}?`
              : `Delete ${confirmAction.request.data?.title || confirmAction.request.data?.name || "this request"}?`
            : ""
        }
        confirmText={confirmAction?.type === "approve" ? "Accept" : "Delete"}
        onConfirm={() => {
          if (!confirmAction) return;
          if (confirmAction.type === "approve") {
            handleApprove(confirmAction.request);
          } else {
            handleDelete(confirmAction.request);
          }
          setConfirmAction(null);
        }}
      />
    </div>
  );
}
