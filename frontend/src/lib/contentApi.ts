const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export type MeditationItem = {
  id: string;
  title: string;
  duration: number;
  level: string;
  category: string;
  description: string;
  status: "Active" | "Draft";
  thumbnailUrl?: string;
  bannerUrl?: string;
  audioUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SoundItem = {
  id: string;
  title: string;
  artist?: string;
  frequency?: string;
  duration: number;
  category?: string;
  description?: string;
  status: "Active" | "Draft";
  thumbnailUrl?: string;
  bannerUrl?: string;
  audioUrl?: string;
  mood?: string[];
  createdAt?: string;
  updatedAt?: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json();
}

export function getMeditations() {
  return request<MeditationItem[]>("/api/meditations");
}

export function createMeditation(payload: Omit<MeditationItem, "id">) {
  return request<MeditationItem>("/api/meditations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateMeditation(id: string, payload: Partial<MeditationItem>) {
  return request<MeditationItem>(`/api/meditations/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteMeditation(id: string) {
  return request<{ ok: boolean }>(`/api/meditations/${id}`, {
    method: "DELETE",
  });
}

export function getSounds() {
  return request<SoundItem[]>("/api/sounds");
}

export function createSound(payload: Omit<SoundItem, "id">) {
  return request<SoundItem>("/api/sounds", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateSound(id: string, payload: Partial<SoundItem>) {
  return request<SoundItem>(`/api/sounds/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteSound(id: string) {
  return request<{ ok: boolean }>(`/api/sounds/${id}`, {
    method: "DELETE",
  });
}
