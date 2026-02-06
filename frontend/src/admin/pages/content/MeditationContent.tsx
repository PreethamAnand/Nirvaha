import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AdminTable } from "@/admin/components/AdminTable";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Upload, CheckCircle, XCircle, Clock } from "lucide-react";

interface Meditation {
  id: string;
  title: string;
  duration: number;
  level: string;
  category: string;
  description: string;
  status: "Active" | "Draft";
  thumbnail?: string;
  audioUrl?: string;
}

export function MeditationContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  const [formData, setFormData] = useState<Partial<Meditation>>({
    title: "",
    duration: 0,
    level: "Beginner",
    category: "",
    description: "",
    status: "Active",
  });
  const [thumbnailName, setThumbnailName] = useState("");
  const [audioName, setAudioName] = useState("");
  const [meditations, setMeditations] = useState<Meditation[]>([
    {
      id: "M-001",
      title: "Morning Mindfulness",
      duration: 15,
      level: "Beginner",
      category: "Mindfulness",
      description: "Start your day with clarity and peace...",
      status: "Active",
    },
    {
      id: "M-002",
      title: "Deep Sleep Meditation",
      duration: 30,
      level: "Intermediate",
      category: "Sleep",
      description: "Relax and prepare for restful sleep...",
      status: "Active",
    },
    {
      id: "M-003",
      title: "Stress Relief Session",
      duration: 20,
      level: "Beginner",
      category: "Stress",
      description: "Release tension and find inner calm...",
      status: "Draft",
    },
  ]);

  const filteredMeditations = useMemo(
    () =>
      meditations.filter(
        (meditation) =>
          meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meditation.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [meditations, searchQuery]
  );

  const handleAdd = () => {
    setSelectedMeditation(null);
    setFormData({
      title: "",
      duration: 0,
      level: "Beginner",
      category: "",
      description: "",
      status: "Active",
    });
    setThumbnailName("");
    setAudioName("");
    setIsModalOpen(true);
  };

  const handleEdit = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
    setFormData(meditation);
    setThumbnailName(meditation.thumbnail || "");
    setAudioName(meditation.audioUrl || "");
    setIsModalOpen(true);
  };

  const handleDelete = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
    setIsDeleteModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title) return;
    if (selectedMeditation) {
      setMeditations((prev) =>
        prev.map((m) =>
          m.id === selectedMeditation.id
            ? { ...m, ...formData, thumbnail: thumbnailName, audioUrl: audioName }
            : m
        )
      );
    } else {
      const newMeditation: Meditation = {
        id: `M-${Math.floor(Math.random() * 9000 + 1000)}`,
        title: formData.title || "",
        duration: formData.duration || 0,
        level: formData.level || "Beginner",
        category: formData.category || "",
        description: formData.description || "",
        status: (formData.status as Meditation["status"]) || "Active",
        thumbnail: thumbnailName,
        audioUrl: audioName,
      };
      setMeditations((prev) => [...prev, newMeditation]);
    }
    setIsModalOpen(false);
    setSelectedMeditation(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedMeditation) {
      setMeditations((prev) => prev.filter((m) => m.id !== selectedMeditation.id));
      setIsDeleteModalOpen(false);
      setSelectedMeditation(null);
    }
  };

  const columns = [
    {
      key: "title",
      header: "Title",
    },
    {
      key: "duration",
      header: "Duration",
      render: (item: Meditation) => <span className="text-gray-700">{item.duration} min</span>,
    },
    {
      key: "level",
      header: "Level",
      render: (item: Meditation) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300">
          {item.level}
        </span>
      ),
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Meditation) => (
        <ActionMenu
          variant="content"
          onEdit={() => handleEdit(item)}
          onDelete={() => handleDelete(item)}
        />
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Meditation) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300">
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white border-emerald-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search meditations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-emerald-200 text-black placeholder:text-gray-400"
            />
          </div>
          <Button
            onClick={handleAdd}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Meditation
          </Button>
        </div>
      </Card>

      <Card className="bg-white border-emerald-200">
        <AdminTable
          data={filteredMeditations}
          columns={columns}
          emptyMessage="No meditations found"
        />
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMeditation ? "Edit Meditation" : "Add Meditation"}</DialogTitle>
            <DialogDescription>
              {selectedMeditation ? "Update meditation details" : "Create a new meditation session"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="Sleep">Sleep</SelectItem>
                  <SelectItem value="Stress">Stress</SelectItem>
                  <SelectItem value="Focus">Focus</SelectItem>
                  <SelectItem value="Anxiety">Anxiety</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as Meditation["status"] })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Thumbnail Image</Label>
                <div className="mt-2">
                  <label className="w-full">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setThumbnailName(e.target.files?.[0]?.name || "")}
                    />
                    <Button variant="outline" className="w-full" type="button">
                      <Upload className="mr-2 w-4 h-4" />
                      {thumbnailName || "Upload Thumbnail"}
                    </Button>
                  </label>
                </div>
              </div>
              <div>
                <Label>Audio File</Label>
                <div className="mt-2">
                  <label className="w-full">
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => setAudioName(e.target.files?.[0]?.name || "")}
                    />
                    <Button variant="outline" className="w-full" type="button">
                      <Upload className="mr-2 w-4 h-4" />
                      {audioName || "Upload Audio"}
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              onClick={handleSave}
            >
              {selectedMeditation ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Delete Meditation"
        description={`Are you sure you want to delete "${selectedMeditation?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  );
}


