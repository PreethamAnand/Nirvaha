import React, { useState } from "react";
import { Home, Clock, Star, Grid, Gamepad, Menu } from "lucide-react";

export default function LeftSidebar({ active = "Recent", onSelect }: { active?: string; onSelect?: (key: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);

  const sections = [
    { key: "Recent", icon: Home },
    { key: "Popular", icon: Star },
    { key: "All", icon: Grid },
    { key: "Games", icon: Gamepad },
  ];

  return (
    <aside className="hidden lg:block w-48 sticky top-20 self-start">
      <div className="rounded-2xl p-2">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-black font-semibold">Feed</h4>
          <button aria-label="Toggle sidebar" onClick={() => setCollapsed((s) => !s)} className="p-2 rounded hover:bg-black/5">
            <Menu className="w-4 h-4 text-black/60" />
          </button>
        </div>

        <div className="p-1">
          <nav aria-label="Community navigation" className="space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = s.key === active;
              return (
                <button
                  key={s.key}
                  onClick={() => onSelect && onSelect(s.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors focus:outline-none ${
                    isActive ? "bg-emerald-50 text-emerald-700" : "text-black/80 hover:bg-black/5"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-black/40"}`} />
                  <span className="truncate text-sm">{s.key}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-3 pt-3 text-sm text-black/50">
            <div className="font-semibold mb-1">Games</div>
            <div className="text-xs">(coming soon)</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
