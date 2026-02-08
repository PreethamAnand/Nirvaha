import React, { useEffect, useMemo, useState } from "react";
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
import { Search, Plus } from "lucide-react";
import {
  createMeditation,
  deleteMeditation,
  getMeditations,
  updateMeditation,
  type MeditationItem,
} from "@/lib/contentApi";

export function MeditationContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationItem | null>(null);
  const [formData, setFormData] = useState<Partial<MeditationItem>>({
    title: "",
    duration: 0,
    level: "Beginner",
    category: "",
    description: "",
    status: "Active",
    thumbnailUrl: "",
    audioUrl: "",
  });
  const [meditations, setMeditations] = useState<MeditationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getMeditations()
      .then((data) => {
        if (isMounted) {
          setMeditations(data);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMeditations = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return meditations.filter(
      (meditation) =>
        meditation.title.toLowerCase().includes(query) ||
        meditation.category.toLowerCase().includes(query)
    );
  }, [meditations, searchQuery]);

  const handleAdd = () => {
    setSelectedMeditation(null);
    setFormData({
      title: "",
      duration: 0,
      level: "Beginner",
      category: "",
      description: "",
      status: "Active",
      thumbnailUrl: "",
      bannerUrl: "",
      audioUrl: "",
    });
    setThumbnailFile(null);
    setBannerFile(null);
    setAudioFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (meditation: MeditationItem) => {
    setSelectedMeditation(meditation);
    setFormData(meditation);
    setThumbnailFile(null);
    setBannerFile(null);
    setAudioFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = (meditation: MeditationItem) => {
    setSelectedMeditation(meditation);
    setIsDeleteModalOpen(true);
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
    const response = await fetch(`${apiBaseUrl}/api/upload`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error("File upload failed");
    }
    
    const data = await response.json();
    return `${apiBaseUrl}${data.url}`;
  };

  const handleSave = async () => {
    if (!formData.title || !Number.isFinite(formData.duration)) return;

    try {
      setIsUploading(true);
      
      // Upload files if selected
      let thumbnailUrl = formData.thumbnailUrl || "";
      let bannerUrl = formData.bannerUrl || "";
      let audioUrl = formData.audioUrl || "";
      
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile);
      }
      
      if (bannerFile) {
        bannerUrl = await uploadFile(bannerFile);
      }
      
      if (audioFile) {
        audioUrl = await uploadFile(audioFile);
      }

      const payload = {
        title: formData.title,
        duration: formData.duration,
        level: formData.level || "Beginner",
        category: formData.category || "",
        description: formData.description || "",
        status: (formData.status as MeditationItem["status"]) || "Active",
        thumbnailUrl,
        bannerUrl,
        audioUrl,
      };

      if (selectedMeditation) {
        const updated = await updateMeditation(selectedMeditation.id, payload);
        setMeditations((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      } else {
        const created = await createMeditation(payload);
        setMeditations((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
      setSelectedMeditation(null);
      setThumbnailFile(null);
      setBannerFile(null);
      setAudioFile(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMeditation) return;
    try {
      await deleteMeditation(selectedMeditation.id);
      setMeditations((prev) => prev.filter((m) => m.id !== selectedMeditation.id));
      setIsDeleteModalOpen(false);
      setSelectedMeditation(null);
    } catch (err) {
      setError((err as Error).message);
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
      render: (item: MeditationItem) => <span className="text-gray-700">{item.duration} min</span>,
    },
    {
      key: "level",
      header: "Level",
      render: (item: MeditationItem) => (
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
      render: (item: MeditationItem) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(item)}
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(item)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
          <ActionMenu
            variant="content"
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: MeditationItem) => (
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
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </Card>

      <Card className="bg-white border-emerald-200">
        <AdminTable
          data={filteredMeditations}
          columns={columns}
          emptyMessage={isLoading ? "Loading meditations..." : "No meditations found"}
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
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Mindfulness, Sleep, Focus"
                className="mt-1"
              />
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
                    setFormData({ ...formData, status: value as MeditationItem["status"] })
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
                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {formData.thumbnailUrl && !thumbnailFile && (
                  <p className="text-xs text-gray-500 mt-1">Current: {formData.thumbnailUrl.split('/').pop()}</p>
                )}
                {thumbnailFile && (
                  <p className="text-xs text-emerald-600 mt-1">New file: {thumbnailFile.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="banner">Banner Image</Label>
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {formData.bannerUrl && !bannerFile && (
                  <p className="text-xs text-gray-500 mt-1">Current: {formData.bannerUrl.split('/').pop()}</p>
                )}
                {bannerFile && (
                  <p className="text-xs text-emerald-600 mt-1">New file: {bannerFile.name}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="audio">Audio File</Label>
              <Input
                id="audio"
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                className="mt-1"
              />
              {formData.audioUrl && !audioFile && (
                <p className="text-xs text-gray-500 mt-1">Current: {formData.audioUrl.split('/').pop()}</p>
              )}
              {audioFile && (
                <p className="text-xs text-emerald-600 mt-1">New file: {audioFile.name}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isUploading}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              onClick={handleSave}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : selectedMeditation ? "Update" : "Create"}
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


