import React from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Award } from "lucide-react";

export default function PostCard({
  post,
  onProfileClick,
  onLike,
}: {
  post: any;
  onProfileClick?: (p: any) => void;
  onLike?: (p: any) => void;
}) {
  const title = post.title || post.content?.split(".")?.[0] || "Post";

  return (
    <article className="bg-white rounded-lg p-3 border border-black/10 hover:shadow-md transition-shadow" role="article">
      <header className="flex items-start gap-3 mb-1">
        <button onClick={() => onProfileClick && onProfileClick(post)} className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10">
            <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-0 -right-0 w-4 h-4 bg-lime-400 rounded-full border-2 border-white flex items-center justify-center">
            <Award className="w-3 h-3 text-white" />
          </div>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-black truncate">{title}</h3>
              <div className="text-xs text-black/50 mt-1">{post.author} · {post.role} · {post.time}</div>
            </div>
            <button className="p-1 rounded hover:bg-black/5 text-black/60">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-black/60 mt-2 line-clamp-2">{post.content}</p>

          <footer className="mt-2 flex items-center gap-3 text-black/60 text-sm">
            <div className="flex items-center gap-2">
              <button onClick={() => onLike && onLike(post)} className="flex items-center gap-1 px-1 py-1 rounded hover:bg-black/5">
                <Heart className="w-4 h-4 text-teal-600" />
                <span className="text-xs">{post.likes}</span>
              </button>

              <button className="flex items-center gap-1 px-1 py-1 rounded hover:bg-black/5">
                <MessageCircle className="w-4 h-4 text-black/60" />
                <span className="text-xs">{post.comments}</span>
              </button>

              <button className="flex items-center gap-1 px-1 py-1 rounded hover:bg-black/5">
                <Share2 className="w-4 h-4 text-black/60" />
                <span className="text-xs">Share</span>
              </button>
            </div>
          </footer>
        </div>
      </header>
    </article>
  );
}

// Comment: Hook `onLike` to backend like endpoint; extend `post` shape to include `id`.
