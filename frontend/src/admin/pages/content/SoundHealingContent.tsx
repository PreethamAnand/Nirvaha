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
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Upload, X } from "lucide-react";

interface SoundHealing {
  id: string;
  title: string;
  frequency: string;
  mood: string[];
  duration: number;
  level: string;
  category: string;
  description: string;
  status: "Active" | "Draft";
  thumbnail?: string;
  audioUrl?: string;
}

export function SoundHealingContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSound, setSelectedSound] = useState<SoundHealing | null>(null);
  const [formData, setFormData] = useState<Partial<SoundHealing>>({
    title: "",
    frequency: "",
    mood: [],
    duration: 0,
    level: "",
    category: "",
    description: "",
    status: "Active",
  });
  const [moodInput, setMoodInput] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [audioName, setAudioName] = useState("");

  const [sounds, setSounds] = useState<SoundHealing[]>([
    {
      id: "SH-001",
      title: "Tibetan Singing Bowls",
      frequency: "528Hz",
      mood: ["Calm", "Healing", "Relaxation"],
      duration: 25,
      level: "Beginner",
      category: "Singing Bowls",
      description: "Deep healing frequencies from Tibetan singing bowls...",
      status: "Active",
    },
    {
      id: "SH-002",
      title: "Nature Sounds: Ocean Waves",
      frequency: "432Hz",
      mood: ["Peaceful", "Natural", "Meditative"],
      duration: 30,
      level: "Beginner",
      category: "Nature",
      description: "Gentle ocean waves for deep relaxation...",
      status: "Active",
    },
  ]);

  const filteredSounds = useMemo(
    () =>
      sounds.filter(
        (sound) =>
          sound.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sound.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [sounds, searchQuery]
  );

  const handleAdd = () => {
    setSelectedSound(null);
    setFormData({
      title: "",
      frequency: "",
      mood: [],
      duration: 0,
      level: "",
      category: "",
      description: "",
      status: "Active",
    });
    setThumbnailName("");
    setAudioName("");
    setIsModalOpen(true);
  };

  const handleEdit = (sound: SoundHealing) => {
    setSelectedSound(sound);
    setFormData(sound);
    setThumbnailName(sound.thumbnail || "");
    setAudioName(sound.audioUrl || "");
    setIsModalOpen(true);
  };

  const handleDelete = (sound: SoundHealing) => {
    setSelectedSound(sound);
    setIsDeleteModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title) return;
    if (selectedSound) {
      setSounds((prev) =>
        prev.map((s) =>
          s.id === selectedSound.id
            ? { ...s, ...formData, thumbnail: thumbnailName, audioUrl: audioName }
            : s
        )
      );
    } else {
      const newSound: SoundHealing = {
        id: `SH-${Math.floor(Math.random() * 9000 + 1000)}`,
        title: formData.title || "",
        frequency: formData.frequency || "",
        mood: formData.mood || [],
        duration: formData.duration || 0,
        level: formData.level || "Beginner",
        category: formData.category || "",
        description: formData.description || "",
        status: (formData.status as SoundHealing["status"]) || "Active",
        thumbnail: thumbnailName,
        audioUrl: audioName,
      };
      setSounds((prev) => [...prev, newSound]);
    }
    setIsModalOpen(false);
    setSelectedSound(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedSound) {
      setSounds((prev) => prev.filter((s) => s.id !== selectedSound.id));
      setIsDeleteModalOpen(false);
      setSelectedSound(null);
    }
  };

  const addMood = () => {
    if (moodInput.trim() && !formData.mood?.includes(moodInput.trim())) {
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
      mood: formData.mood?.filter((m) => m !== mood) || [],
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
      render: (item: SoundHealing) => (
        <span className="font-mono text-gray-700">{item.frequency}</span>
      ),
    },
    {
      key: "duration",
      header: "Duration",
      render: (item: SoundHealing) => <span className="text-gray-700">{item.duration} min</span>,
    },
    {
      key: "mood",
      header: "Mood Tags",
      render: (item: SoundHealing) => (
        <div className="flex flex-wrap gap-1">
          {item.mood.map((m, idx) => (
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
      render: (item: SoundHealing) => (
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
      render: (item: SoundHealing) => (
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
      </Card>

      <Card className="bg-white border-emerald-200">
        <AdminTable
          data={filteredSounds}
          columns={columns}
          emptyMessage="No sound healing sessions found"
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
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  placeholder="e.g., 528Hz"
                  className="mt-1"
                />
              </div>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="Singing Bowls">Singing Bowls</SelectItem>
                    <SelectItem value="Nature">Nature</SelectItem>
                    <SelectItem value="Binaural Beats">Binaural Beats</SelectItem>
                    <SelectItem value="Chanting">Chanting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="mood">Mood Tags</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="mood"
                  value={moodInput}
                  onChange={(e) => setMoodInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMood())}
                  placeholder="Add mood tag..."
                  className="flex-1"
                />
                <Button type="button" onClick={addMood} variant="outline">
                  Add
                </Button>
              </div>
              {formData.mood && formData.mood.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.mood.map((mood, idx) => (
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
                    setFormData({ ...formData, status: value as SoundHealing["status"] })
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
              {selectedSound ? "Update" : "Create"}
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


