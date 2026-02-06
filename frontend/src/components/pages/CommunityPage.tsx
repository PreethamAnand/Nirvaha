import { motion } from "motion/react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Star, Award, Users, TrendingUp, X, Send } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LeftSidebar from "../community/LeftSidebar";
import SearchBar from "../community/SearchBar";
import Feed from "../community/Feed";
import RightSidebar from "../community/RightSidebar";

export function CommunityPage() {
  const { user } = useAuth();
  const [showPostModal, setShowPostModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [postContent, setPostContent] = useState("");
  const [filter, setFilter] = useState<string>("Recent");
  const [posts, setPosts] = useState([
    {
      author: "Sarah Mitchell",
      role: "Meditation Guide",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      time: "2 hours ago",
      content: "Just completed a 30-day meditation streak! 🎉 The journey has been transformative. Grateful for this amazing community's support. Remember, consistency is more important than perfection. 🙏",
      likes: 127,
      comments: 23,
      type: "milestone",
    },
    {
      author: "David Chen",
      role: "Wellness Enthusiast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      time: "5 hours ago",
      content: "Sharing my favorite morning routine: 10 min pranayama + 20 min meditation + sound healing. Game changer for productivity and mental clarity! ✨",
      likes: 89,
      comments: 15,
      type: "tip",
    },
    {
      author: "Maya Patel",
      role: "Sound Healer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      time: "8 hours ago",
      content: "New sound healing session just dropped! 432 Hz crystal bowl meditation. Perfect for deep relaxation and cellular healing. Who's joining? 🔮",
      likes: 156,
      comments: 34,
      type: "announcement",
    },
    {
      author: "Alex Rivera",
      role: "Mindfulness Coach",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      time: "12 hours ago",
      content: "Reminder: Your breath is your anchor. In moments of stress, just three conscious breaths can shift your entire state. Try it now. 🌬️",
      likes: 203,
      comments: 41,
      type: "wisdom",
    },
  ]);

  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost = {
        author: user?.name || "You",
        role: user?.role || "Wellness Seeker",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        time: "just now",
        content: postContent,
        likes: 0,
        comments: 0,
        type: "user",
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
      setShowPostModal(false);
    }
  };

  const handleProfileClick = (post: any) => {
    setSelectedProfile(post);
    setShowProfileModal(true);
  };

  const [topMentors, setTopMentors] = useState<any[]>([
    {
      id: "m1",
      name: "Dr. Anjali Sharma",
      specialty: "Vedic Meditation",
      students: "2.3K",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      followed: false,
    },
    {
      id: "m2",
      name: "Master Li Wei",
      specialty: "Qi Gong & Energy",
      students: "1.8K",
      rating: 5.0,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      followed: false,
    },
    {
      id: "m3",
      name: "Elena Costa",
      specialty: "Sound Therapy",
      students: "3.1K",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      followed: false,
    },
  ]);

  const SUGGESTED_TAGS = ["#happiness", "#habits", "#healing", "#meditation", "#soundhealing", "#wellness"];
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

  return (
    <div className="community-theme bg-white text-black min-h-screen pt-24 pb-16">
      <div className="w-full mx-0 px-0">
        {/* Compact header removed to match Reddit-like layout */}

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-6 px-6">
          <aside className="hidden lg:block sticky top-24 self-start px-4 border-r border-black/10">
            <LeftSidebar active={filter} onSelect={(k) => setFilter(k)} />
          </aside>

          {/* Main Feed (center) */}
          <main className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[760px]">
                <SearchBar onSelect={(v) => console.log("search select", v)} />
              </div>
            </div>

            {/* Removed center create-post — Create button moved to right sidebar */}

            {/* Center feed (page scroll) */}
            {/* <div className="space-y-3">
              <div className="max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 hide-scrollbar">
                <div className="w-full max-w-[760px] mx-auto">
                  <Feed posts={posts} onProfileClick={handleProfileClick} filter={filter} />
                </div>
              </div>
            </div> */}
            <div className="w-full max-w-[760px] mx-auto">
  <div
    className="h-[calc(100vh-6rem)] overflow-y-scroll hide-scrollbar"
    style={{
      scrollbarWidth: "none",   
      msOverflowStyle: "none", 
    }}
  >
    <Feed
      posts={posts}
      onProfileClick={handleProfileClick}
      filter={filter}
    />
  </div>
</div>

          </main>

          <aside className="hidden lg:block sticky top-24 self-start px-4">
            <RightSidebar
              trending={[]}
              mentors={topMentors}
              onCreate={() => setShowPostModal(true)}
              onTrendClick={(tag) => setFilter(tag)}
              onFollow={(id) => {
                setTopMentors((prev) => prev.map((m) => (m.id === id ? { ...m, followed: !m.followed } : m)));
              }}
              onViewProfile={(p) => {
                // open profile modal with more details
                setSelectedProfile({
                  author: p.name,
                  role: p.specialty,
                  avatar: p.avatar,
                  time: "Certified Mentor",
                  content: `${p.name} is a certified mentor specializing in ${p.specialty}.`,
                  likes: 0,
                  comments: 0,
                });
                setShowProfileModal(true);
              }}
            />
          </aside>
        </div>

        {/* Create Post Modal */}
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPostModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-[32px] p-8 shadow-2xl"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPostModal(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-teal-600"
              >
                <X className="w-6 h-6" />
              </motion.button>

              <h3 className="text-2xl text-emerald-800 mb-6">Share Your Journey</h3>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-300 flex-shrink-0">
                  <img src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"} alt="You" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-teal-800 font-semibold">{user?.name || "You"}</p>
                  <p className="text-sm text-teal-600">{user?.role || "Wellness Seeker"}</p>
                </div>
              </div>

              <div className="relative">
                <textarea
                  id="create-post-textarea"
                  value={postContent}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPostContent(v);
                    // detect tag token at end
                    const m = v.match(/#([a-zA-Z0-9_]*)$/);
                    if (m) {
                      const q = m[1].toLowerCase();
                      const picks = SUGGESTED_TAGS.filter((t) => t.toLowerCase().includes(q));
                      setTagSuggestions(picks);
                    } else {
                      setTagSuggestions([]);
                    }
                  }}
                  placeholder="What's on your mind? Share your wellness journey, tips, or celebrations..."
                  className="w-full h-40 p-4 rounded-2xl border border-emerald-200/50 focus:border-emerald-500 focus:outline-none resize-none text-teal-800 placeholder-teal-400"
                />

                {tagSuggestions.length > 0 && (
                  <div className="absolute right-0 left-0 mt-2 max-w-md mx-auto bg-white border border-emerald-200 rounded-md shadow z-20 overflow-hidden">
                    {tagSuggestions.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          // replace last token with tag + space
                          const newContent = postContent.replace(/#([a-zA-Z0-9_]*)$/, t + " ");
                          setPostContent(newContent);
                          setTagSuggestions([]);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-emerald-50"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 px-6 py-3 rounded-full border border-emerald-300 text-teal-800 hover:bg-emerald-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreatePost}
                  disabled={!postContent.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Profile View Modal */}
        {showProfileModal && selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-gradient-to-br from-white via-emerald-100 to-teal-200 rounded-[32px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileModal(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-teal-600 z-10"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Profile Card */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-emerald-400 mx-auto mb-6">
                  <img src={selectedProfile.avatar} alt={selectedProfile.author} className="w-full h-full object-cover" />
                </div>

                <h3 className="text-2xl text-emerald-800 font-bold mb-2">{selectedProfile.author}</h3>
                <p className="text-teal-700 font-semibold mb-4">{selectedProfile.role}</p>

                {/* Followers/Following/Posts Stats */}
                <div className="flex justify-around gap-4 mb-6 bg-white/70 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-2xl text-emerald-600 font-bold">156</p>
                    <p className="text-xs text-teal-600">Followers</p>
                  </div>
                  <div className="w-px bg-emerald-300/30" />
                  <div className="text-center">
                    <p className="text-2xl text-emerald-600 font-bold">84</p>
                    <p className="text-xs text-teal-600">Following</p>
                  </div>
                  <div className="w-px bg-emerald-300/30" />
                  <div className="text-center">
                    <p className="text-2xl text-emerald-600 font-bold">23</p>
                    <p className="text-xs text-teal-600">Posts</p>
                  </div>
                </div>

                {/* Recent Post Preview */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-6 text-left">
                  <p className="text-xs text-teal-600 font-semibold mb-2">Latest Post</p>
                  <p className="text-teal-800 text-sm leading-relaxed mb-4">{selectedProfile.content}</p>
                  <div className="flex gap-4 text-xs text-teal-600">
                    <span>❤️ {selectedProfile.likes} Likes</span>
                    <span>💬 {selectedProfile.comments} Comments</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Follow
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}