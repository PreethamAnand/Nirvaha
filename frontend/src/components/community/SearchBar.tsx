import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

const SUGGESTED_TAGS = ["#happiness", "#habits", "#healing", "#meditation", "#soundhealing"];
const SUGGESTED_PEOPLE = ["Arjun M.", "Sarah Mitchell", "Dr. Anjali Sharma"];
const SUGGESTED_POSTS = ["30-day meditation streak", "Morning routine: pranayama + meditation"];

export default function SearchBar({ onSelect }: { onSelect?: (v: string) => void }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ type: string; value: string }>>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debRef = useRef<number | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (debRef.current) window.clearTimeout(debRef.current);
    debRef.current = window.setTimeout(() => {
      const q = value.trim().toLowerCase();
      if (!q) return setSuggestions([]);

      const tags = SUGGESTED_TAGS.filter((t) => t.toLowerCase().includes(q)).slice(0, 5).map((v) => ({ type: "tag", value: v }));
      const people = SUGGESTED_PEOPLE.filter((p) => p.toLowerCase().includes(q)).slice(0, 5).map((v) => ({ type: "person", value: v }));
      const posts = SUGGESTED_POSTS.filter((p) => p.toLowerCase().includes(q)).slice(0, 5).map((v) => ({ type: "post", value: v }));

      setSuggestions([...tags, ...people, ...posts]);
      setActiveIndex(-1);
    }, 200);
    return () => debRef.current && window.clearTimeout(debRef.current);
  }, [value]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = activeIndex >= 0 ? suggestions[activeIndex].value : value;
      setValue("");
      setSuggestions([]);
      onSelect && onSelect(pick);
    }
  };

  const highlightMatch = (text: string, q: string) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    return (
      <span>
        {before}
        <span className="bg-emerald-50 rounded-sm">{match}</span>
        {after}
      </span>
    );
  };

  return (
    <div className="mb-4 flex items-center justify-center">
      <label className="sr-only">Search posts, tags, or people</label>
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-emerald-600" />
        </div>
        <input
          aria-label="Search posts, tags, or people"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search posts, tags, or people"
          className="w-full rounded-full pl-10 pr-4 py-3 border border-emerald-200 bg-white text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
      </div>

      {suggestions.length > 0 && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Search suggestions"
          className="mt-2 bg-white rounded-lg shadow-md border border-emerald-200 overflow-hidden max-w-[600px] mx-auto"
        >
          {/* Grouped: Tags */}
          {suggestions.filter((s) => s.type === "tag").length > 0 && (
            <li className="px-3 py-2 text-xs text-black/50 font-semibold">Tags</li>
          )}
          {suggestions
            .filter((s) => s.type === "tag")
            .map((s, i) => {
              const idx = suggestions.findIndex((x) => x.type === "tag" && x.value === s.value);
              return (
                <li
                  key={`tag-${s.value}`}
                  role="option"
                  aria-selected={activeIndex === idx}
                  onMouseDown={() => {
                    setValue("");
                    setSuggestions([]);
                    onSelect && onSelect(s.value);
                  }}
                  className={`px-4 py-2 cursor-pointer text-black hover:bg-emerald-50 ${activeIndex === idx ? "bg-emerald-50" : ""}`}
                >
                  {highlightMatch(s.value, value)}
                </li>
              );
            })}

          {suggestions.filter((s) => s.type === "person").length > 0 && (
            <li className="px-3 py-2 text-xs text-black/50 font-semibold">People</li>
          )}
          {suggestions
            .filter((s) => s.type === "person")
            .map((s) => {
              const idx = suggestions.findIndex((x) => x.type === "person" && x.value === s.value);
              return (
                <li
                  key={`person-${s.value}`}
                  role="option"
                  aria-selected={activeIndex === idx}
                  onMouseDown={() => {
                    setValue("");
                    setSuggestions([]);
                    onSelect && onSelect(s.value);
                  }}
                  className={`px-4 py-2 cursor-pointer text-black hover:bg-emerald-50 ${activeIndex === idx ? "bg-emerald-50" : ""}`}
                >
                  {highlightMatch(s.value, value)}
                </li>
              );
            })}

          {suggestions.filter((s) => s.type === "post").length > 0 && (
            <li className="px-3 py-2 text-xs text-black/50 font-semibold">Posts</li>
          )}
          {suggestions
            .filter((s) => s.type === "post")
            .map((s) => {
              const idx = suggestions.findIndex((x) => x.type === "post" && x.value === s.value);
              return (
                <li
                  key={`post-${s.value}`}
                  role="option"
                  aria-selected={activeIndex === idx}
                  onMouseDown={() => {
                    setValue("");
                    setSuggestions([]);
                    onSelect && onSelect(s.value);
                  }}
                  className={`px-4 py-2 cursor-pointer text-black hover:bg-emerald-50 ${activeIndex === idx ? "bg-emerald-50" : ""}`}
                >
                  {highlightMatch(s.value, value)}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

// Comment: Replace SUGGESTED_TAGS with backend tag suggestions when available.
