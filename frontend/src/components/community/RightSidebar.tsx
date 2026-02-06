import React from "react";
import { TrendingUp, Award, Star, Plus } from "lucide-react";

export default function RightSidebar({ trending = [], mentors = [], onFollow, onViewProfile, onCreate, onTrendClick }: { trending?: any[]; mentors?: any[]; onFollow?: (id: string) => void; onViewProfile?: (profile: any) => void; onCreate?: () => void; onTrendClick?: (tag: string) => void }) {
  const trends = trending.length ? trending : [
    { title: "#meditation", count: "12.3K" },
    { title: "#soundhealing", count: "8.4K" },
    { title: "#habits", count: "6.1K" },
  ];

  const certs = mentors.length ? mentors : [
    { name: "Dr. Anjali Sharma", specialty: "Vedic Meditation", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
    { name: "Elena Costa", specialty: "Sound Therapy", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  ];

  return (
    <aside className="hidden lg:block w-72 sticky top-20 self-start">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-black flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Trending
          </div>
          <button onClick={() => onCreate && onCreate()} className="flex items-center gap-2 text-sm text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded-full">
            <Plus className="w-4 h-4" /> Create
          </button>
        </div>

        <div className="bg-white rounded-2xl p-2 shadow-sm border border-emerald-200">
          <ol className="space-y-1">
            {trends.map((t, i) => (
              <li key={i} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 text-emerald-600 font-semibold">{i + 1}</span>
                  <button onClick={() => onTrendClick && onTrendClick(t.title)} className="text-black truncate text-sm text-left hover:text-emerald-600">
                    {t.title}
                  </button>
                </div>
                <span className="text-black/60 text-xs">{t.count}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-2xl p-3 shadow-sm border border-emerald-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <h4 className="text-black font-semibold">Certified Profiles</h4>
          </div>

          <div className="space-y-2">
            {certs.map((m, i) => (
              <div key={m.id || i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-emerald-200">
                  <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm text-black truncate">{m.name}</h5>
                    <Star className="w-3 h-3 text-emerald-500" />
                  </div>
                  <div className="text-xs text-black/60">{m.specialty}</div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <button onClick={() => onFollow && onFollow(m.id)} className="text-sm text-white px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-600">{m.followed ? 'Following' : 'Follow'}</button>
                  <button onClick={() => onViewProfile && onViewProfile(m)} className="text-xs text-black/60 underline">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// Comment: Replace static trending and mentors with API-driven props when backend is available.
