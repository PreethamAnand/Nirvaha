import React, { useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";

export default function Feed({ posts: initialPosts, onProfileClick, filter = 'Recent' }: { posts: any[]; onProfileClick?: (p: any) => void; filter?: string }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setPosts(initialPosts || []), [initialPosts]);

  // Very lightweight infinite scroll: when sentinel appears, append cloned posts (placeholder behavior)
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          // simulate fetching
          setTimeout(() => {
            const more = (initialPosts || []).map((p: any, i: number) => ({ ...p, time: "some time ago" }));
            setPosts((s) => [...s, ...more]);
            setLoading(false);
          }, 800);
        }
      });
    }, { rootMargin: "200px" });

    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [initialPosts, loading]);

  const handleLike = (post: any) => {
    setPosts((prev) => prev.map((p) => (p === post ? { ...p, likes: (p.likes || 0) + 1 } : p)));
    // Comment: Call backend like API here when available
  };
  // Apply simple filters based on left nav
  const visible = (() => {
    if (filter === "Popular") return [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    if (filter === "All") return posts;
    if (filter === "Games") return [];
    // Recent / Recommended
    return posts;
  })();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-black/80">Recommended for you</h3>
        <div className="text-xs text-black/50">Best</div>
      </div>

      <div className="space-y-5">
        {visible.length === 0 && <div className="text-center py-8 text-sm text-black/50">No posts in this section yet.</div>}
        {visible.map((post, i) => (
          <PostCard key={i} post={post} onProfileClick={onProfileClick} onLike={handleLike} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-8" aria-hidden />
      {loading && <div className="text-center py-4 text-sm text-black/50">Loading more...</div>}
    </div>
  );
}
