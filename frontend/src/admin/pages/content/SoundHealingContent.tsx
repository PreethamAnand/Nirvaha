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
import { Badge } from "@/components/ui/badge";
import { Search, Plus, X } from "lucide-react";
import {
  createSound,
  deleteSound,
  getSounds,
  updateSound,
  type SoundItem,
} from "@/lib/contentApi";

export function SoundHealingContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSound, setSelectedSound] = useState<SoundItem | null>(null);
  const [formData, setFormData] = useState<Partial<SoundItem>>({
    title: "",
    artist: "",
    frequency: "",
    mood: [],
    duration: 0,
    category: "",
    description: "",
    status: "Active",
    thumbnailUrl: "",
    bannerUrl: "",
    audioUrl: "",
  });
  const [moodInput, setMoodInput] = useState("");
  const [sounds, setSounds] = useState<SoundItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getSounds()
      .then((data) => {
        if (isMounted) {
          setSounds(data);
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

  const filteredSounds = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return sounds.filter(
      (sound) =>
        sound.title.toLowerCase().includes(query) ||
        (sound.category || "").toLowerCase().includes(query)
    );
  }, [sounds, searchQuery]);

  const handleAdd = () => {
    setSelectedSound(null);
    setFormData({
      title: "",
      artist: "",
      frequency: "",
      mood: [],
      duration: 0,
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

  const handleEdit = (sound: SoundItem) => {
    setSelectedSound(sound);
    setFormData(sound);
    setThumbnailFile(null);
    setBannerFile(null);
    setAudioFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = (sound: SoundItem) => {
    setSelectedSound(sound);
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
        artist: formData.artist || "",
        frequency: formData.frequency || "",
        mood: formData.mood || [],
        duration: formData.duration,
        category: formData.category || "",
        description: formData.description || "",
        status: (formData.status as SoundItem["status"]) || "Active",
        thumbnailUrl,
        bannerUrl,
        audioUrl,
      };

      if (selectedSound) {
        const updated = await updateSound(selectedSound.id, payload);
        setSounds((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } else {
        const created = await createSound(payload);
        setSounds((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
      setSelectedSound(null);
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
    if (!selectedSound) return;
    try {
      await deleteSound(selectedSound.id);
      setSounds((prev) => prev.filter((s) => s.id !== selectedSound.id));
      setIsDeleteModalOpen(false);
      setSelectedSound(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const addMood = () => {
    if (moodInput.trim() && !(formData.mood || []).includes(moodInput.trim())) {
      setFormData({
        ...formData,
        mood: [...(formData.mood || []), moodInput.trim()],
      });
      setMoodInput("");
    }
  };

  const removeMood = (mood: string) => {
    setFormData({
      ...formData,
      mood: (formData.mood || []).filter((m) => m !== mood),
    });
  };

  const columns = [
    {
      key: "title",
      header: "Title",
    },
    {
      key: "frequency",
      header: "Frequency",
      render: (item: SoundItem) => (
        <span className="font-mono text-gray-700">{item.frequency}</span>
      ),
    },
    {
      key: "duration",
      header: "Duration",
      render: (item: SoundItem) => <span className="text-gray-700">{item.duration} min</span>,
    },
    {
      key: "mood",
      header: "Mood Tags",
      render: (item: SoundItem) => (
        <div className="flex flex-wrap gap-1">
          {(item.mood || []).map((m, idx) => (
            <Badge key={idx} variant="outline" className="text-xs bg-teal-100 text-teal-800 border-teal-300">
              {m}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: SoundItem) => (
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
      render: (item: SoundItem) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
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
              placeholder="Search sound healing sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-emerald-200 text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <Button
            onClick={handleAdd}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Sound Healing
          </Button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </Card>

      <Card className="bg-white border-emerald-200">
        <AdminTable
          data={filteredSounds}
          columns={columns}
          emptyMessage={isLoading ? "Loading sounds..." : "No sound healing sessions found"}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSound ? "Edit Sound Healing" : "Add Sound Healing"}</DialogTitle>
            <DialogDescription>
              {selectedSound ? "Update sound healing session" : "Create a new sound healing session"}
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
                <Label htmlFor="artist">Artist</Label>
                <Input
                  id="artist"
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  placeholder="Sacred Sounds Collective"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  placeholder="e.g., 528 Hz"
                  className="mt-1"
                />
              </div>
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
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Bowl Therapy, Nature Sounds"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="mood">Mood Tags</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="mood"
                  value={moodInput}
                  onChange={(e) => setMoodInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addMood())}
                  placeholder="Add mood tag..."
                  className="flex-1"
                />
                <Button type="button" onClick={addMood} variant="outline">
                  Add
                </Button>
              </div>
              {(formData.mood || []).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(formData.mood || []).map((mood, idx) => (
                    <Badge key={idx} variant="outline" className="bg-teal-100 text-teal-800">
                      {mood}
                      <X
                        className="ml-1 w-3 h-3 cursor-pointer"
                        onClick={() => removeMood(mood)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
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
                    setFormData({ ...formData, status: value as SoundItem["status"] })
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
              {isUploading ? "Uploading..." : selectedSound ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Delete Sound Healing"
        description={`Are you sure you want to delete "${selectedSound?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  );
}


