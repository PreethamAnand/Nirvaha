import { motion } from "motion/react";
import {
  Users,
  Star,
  Clock,
  Video,
  Calendar,
  DollarSign,
  Award,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Copy,
  Check,
  MapPin,
  Globe,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CompanionApplicationModal from "../companion/CompanionApplicationModal";

export function CompanionPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<any>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "liked">("all");
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [companionMode, setCompanionMode] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [booking, setBooking] = useState<{
    open: boolean;
    companion: any | null;
    type: "chat" | "video" | null;
    platform: string;
    date: string;
    time: string;
  }>({ open: false, companion: null, type: null, platform: "", date: "", time: "" });

  // Check if user has already applied and if approved
  useEffect(() => {
    try {
      const applications = localStorage.getItem('nirvaha_companion_applications');
      if (applications) {
        const parsed = JSON.parse(applications);
        if (parsed.length > 0) {
          setHasApplied(true);
          const userEmail = parsed[0]?.email;

          // Check if user is approved as companion
          const companionsRaw = localStorage.getItem('nirvaha_approved_companions');
          if (companionsRaw) {
            const approved = JSON.parse(companionsRaw);
            const isUserApproved = approved.some((c: any) => c.email === userEmail);
            setIsApproved(isUserApproved);
          }
        }
      }
    } catch { }
  }, []);

  // Poll for approval status changes every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const applications = localStorage.getItem('nirvaha_companion_applications');
        if (applications) {
          const parsed = JSON.parse(applications);
          if (parsed.length > 0) {
            const userEmail = parsed[0]?.email;
            const companionsRaw = localStorage.getItem('nirvaha_approved_companions');
            if (companionsRaw) {
              const approved = JSON.parse(companionsRaw);
              const isUserApproved = approved.some((c: any) => c.email === userEmail);
              setIsApproved(isUserApproved);
            }
          }
        }
      } catch { }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const companions = [
    {
      id: "dr-anjali-sharma",
      name: "Dr. Anjali Sharma",
      title: "Mindfulness & Meditation Expert",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      coverImage: "https://images.unsplash.com/photo-1676747484510-755c231ae83e?w=800",
      rating: 4.9,
      reviews: 342,
      sessions: 1247,
      location: "Mumbai, India",
      languages: ["English", "Hindi", "Marathi"],
      specialties: ["Breath Work", "Chakra Healing", "Stress Management"],
      bio: "20+ years of experience in mindfulness meditation and holistic wellness. Certified yoga instructor and spiritual guide.",
      hourlyRate: "$60",
      callRate: "$25",
      availability: "Available",
      responseTime: "2 hours",
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: "master-li-wei",
      name: "Master Li Wei",
      title: "Energy Healing & Qi Gong Master",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      coverImage: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800",
      rating: 5.0,
      reviews: 218,
      sessions: 892,
      location: "Singapore",
      languages: ["English", "Mandarin", "Cantonese"],
      specialties: ["Qi Gong", "Energy Healing", "Traditional Chinese Medicine"],
      bio: "Master practitioner with 30+ years experience in Eastern healing arts. Trained in Shaolin Temple traditions.",
      hourlyRate: "$90",
      callRate: "$40",
      availability: "Available",
      responseTime: "1 hour",
      color: "from-purple-400 to-indigo-500",
    },
    {
      id: "elena-costa",
      name: "Elena Costa",
      title: "Sound Healing Therapist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      coverImage: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800",
      rating: 4.8,
      reviews: 567,
      sessions: 2103,
      location: "Barcelona, Spain",
      languages: ["English", "Spanish", "Catalan"],
      specialties: ["Sound Bowls", "Frequency Therapy", "Vibrational Healing"],
      bio: "Certified sound healing therapist and musician. Specializing in Tibetan singing bowls and crystal bowl therapy.",
      hourlyRate: "$75",
      callRate: "$35",
      availability: "Busy",
      responseTime: "4 hours",
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: "yogi-ravi",
      name: "Yogi Ravi Kumar",
      title: "Pranayama & Breathwork Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      rating: 4.9,
      reviews: 891,
      sessions: 3421,
      location: "Rishikesh, India",
      languages: ["English", "Hindi", "Sanskrit"],
      specialties: ["Pranayama", "Kundalini", "Hatha Yoga"],
      bio: "Traditional yogi trained in the Himalayas. Expert in ancient breathing techniques and energy cultivation.",
      hourlyRate: "$55",
      callRate: "$20",
      availability: "Available",
      responseTime: "3 hours",
      color: "from-orange-400 to-red-500",
    },
    {
      id: "sarah-mitchell",
      name: "Sarah Mitchell",
      title: "Spiritual Life Coach",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      coverImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
      rating: 4.7,
      reviews: 423,
      sessions: 1567,
      location: "Los Angeles, USA",
      languages: ["English", "French"],
      specialties: ["Life Coaching", "Manifestation", "Inner Child Work"],
      bio: "Transformational coach helping clients unlock their spiritual potential and manifest their dreams.",
      hourlyRate: "$85",
      callRate: "$45",
      availability: "Available",
      responseTime: "1 hour",
      color: "from-lime-400 to-emerald-500",
    },
    {
      id: "alex-rivera",
      name: "Alex Rivera",
      title: "Spiritual Awakening Guide",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      coverImage: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800",
      rating: 5.0,
      reviews: 734,
      sessions: 2891,
      location: "Sedona, USA",
      languages: ["English", "Spanish"],
      specialties: ["Spiritual Awakening", "Shadow Work", "Consciousness Expansion"],
      bio: "Guide for those experiencing spiritual awakening. Specializing in navigating consciousness shifts and integration.",
      hourlyRate: "$95",
      callRate: "$50",
      availability: "Available",
      responseTime: "2 hours",
      color: "from-pink-400 to-rose-500",
    },
  ];

  const copyProfileLink = (id: string) => {
    const link = `https://nirvaha.app/companion/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Load/save liked companions
  useEffect(() => {
    try {
      const raw = localStorage.getItem("nirvaha_liked_companions");
      if (raw) setLikedIds(JSON.parse(raw));
    } catch { }
  }, []);

  const saveLiked = (next: string[]) => {
    setLikedIds(next);
    try {
      localStorage.setItem("nirvaha_liked_companions", JSON.stringify(next));
    } catch { }
  };

  const toggleLike = (id: string) => {
    const next = likedIds.includes(id)
      ? likedIds.filter((x) => x !== id)
      : [id, ...likedIds];
    saveLiked(next);
  };

  const filteredCompanions = useMemo(
    () => (filter === "liked" ? companions.filter((c) => likedIds.includes(c.id)) : companions),
    [filter, companions, likedIds]
  );

  // Booking helpers
  const openBooking = (companion: any, type: "chat" | "video") => {
    setBooking({ open: true, companion, type, platform: "", date: "", time: "" });
  };

  const submitBooking = () => {
    if (!booking.open || !booking.companion || !booking.type || !booking.platform || !booking.date || !booking.time) return;
    const record = {
      id: crypto.randomUUID?.() || `${Date.now()}`,
      companionId: booking.companion.id,
      companionName: booking.companion.name,
      type: booking.type,
      platform: booking.platform,
      date: booking.date,
      time: booking.time,
      createdAt: Date.now(),
    };
    try {
      const raw = localStorage.getItem("nirvaha_bookings");
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(record);
      localStorage.setItem("nirvaha_bookings", JSON.stringify(arr));
    } catch { }
    setBooking({ open: false, companion: null, type: null, platform: "", date: "", time: "" });
    alert("Booking requested successfully. You'll receive details soon.");
  };

  const handleApplicationSubmit = (formData: any) => {
    const application = {
      id: crypto.randomUUID?.() || `${Date.now()}`,
      ...formData,
      status: 'pending',
      submittedAt: Date.now(),
    };

    try {
      const raw = localStorage.getItem('nirvaha_companion_applications');
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(application);
      localStorage.setItem('nirvaha_companion_applications', JSON.stringify(arr));
      setHasApplied(true);
      setIsApplicationOpen(false);
      alert('Application submitted successfully! We will review it and get back to you soon.');
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleCancelApplication = () => {
    if (confirm('Are you sure you want to cancel your application?')) {
      try {
        localStorage.removeItem('nirvaha_companion_applications');
        setHasApplied(false);
        alert('Application cancelled successfully.');
      } catch { }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#fdfcfb] via-[#f8f7f4] to-[#f5f4f1]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6" style={{ color: '#0f131a' }}>
            Find Your Perfect Spiritual Guide
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-8" style={{ color: '#595b67' }}>
            Book 1-on-1 sessions with experienced spiritual teachers, meditation
            guides, and wellness coaches. Pay per hour or per call.
          </p>

          {hasApplied ? (
            <div className="flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-white rounded-full shadow-xl transition-all flex items-center gap-2"
                style={{ backgroundColor: '#595b67' }}
                disabled
              >
                <Check className="w-5 h-5" />
                Request Pending
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelApplication}
                className="px-6 py-4 bg-white border-2 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                style={{ color: '#0f131a', borderColor: '#1a5d47' }}
              >
                Cancel Request
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsApplicationOpen(true)}
              className="px-8 py-4 text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto"
              style={{ backgroundColor: '#1a5d47' }}
            >
              <Users className="w-5 h-5" />
              Become a Companion
              <span className="ml-2">→</span>
            </motion.button>
          )}
        </motion.div>

        {/* Filter and Connect Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-12 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white/80 backdrop-blur-xl rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
            style={{ color: '#0f131a', borderColor: '#1a5d47' }}
          >
            Filter
          </motion.button>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
              style={{ backgroundColor: '#1a5d47' }}
            >
              <Clock className="w-5 h-5" />
              24/7 Connect
            </motion.button>
            {isApproved && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCompanionMode(!companionMode)}
                className="px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-semibold border-2"
                style={{
                  backgroundColor: companionMode ? '#1a5d47' : 'white',
                  color: companionMode ? 'white' : '#0f131a',
                  borderColor: '#1a5d47'
                }}
              >
                <Award className="w-5 h-5" />
                {companionMode ? 'User Mode' : 'Companion Mode'}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Companions Grid OR Companion Dashboard */}
        {companionMode ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8" style={{ color: '#0f131a' }}>Your Bookings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Fetch user's bookings from localStorage */}
              {(() => {
                try {
                  const bookingsRaw = localStorage.getItem('nirvaha_bookings');
                  const bookings = bookingsRaw ? JSON.parse(bookingsRaw) : [];
                  if (bookings.length === 0) {
                    return (
                      <div className="col-span-full text-center py-12">
                        <p className="text-xl" style={{ color: '#595b67' }}>
                          No bookings yet. Book appointments and they'll appear here.
                        </p>
                      </div>
                    );
                  }
                  return bookings.map((booking: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="bg-white rounded-[32px] p-6 border-2 shadow-lg"
                      style={{ borderColor: '#1a5d47' }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold" style={{ color: '#0f131a' }}>
                            {booking.companionName}
                          </h3>
                          <p className="text-sm" style={{ color: '#595b67' }}>
                            {booking.type === 'chat' ? 'Chat Session' : 'Video Call'}
                          </p>
                        </div>
                        <div
                          className="px-3 py-1 rounded-full text-xs text-white font-semibold"
                          style={{ backgroundColor: '#1a5d47' }}
                        >
                          {booking.status || 'Confirmed'}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2" style={{ color: '#595b67' }}>
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#595b67' }}>
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#595b67' }}>
                          <Globe className="w-4 h-4" />
                          <span className="text-sm">{booking.platform}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-6 py-3 rounded-full text-white font-semibold transition-all"
                        style={{ backgroundColor: '#1a5d47' }}
                      >
                        Join Session
                      </motion.button>
                    </motion.div>
                  ));
                } catch {
                  return (
                    <div className="col-span-full text-center py-12">
                      <p className="text-xl" style={{ color: '#595b67' }}>
                        Error loading bookings
                      </p>
                    </div>
                  );
                }
              })()}
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCompanions.map((companion, i) => (
              <motion.div
                key={companion.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${companion.color} rounded-[40px] blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
                />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-xl border border-emerald-200/30 h-[500px] flex flex-col">
                  {/* Cover Image */}
                  <div className="relative h-[17.5%] min-h-[88px] overflow-hidden">
                    <img
                      src={companion.coverImage}
                      alt={companion.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                    {/* Availability Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs backdrop-blur-xl shadow-lg flex items-center gap-2 ${companion.availability === "Available"
                            ? "bg-emerald-500/90 text-white"
                            : "bg-orange-500/90 text-white"
                          }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${companion.availability === "Available"
                              ? "bg-lime-300 animate-pulse"
                              : "bg-orange-200"
                            }`}
                        />
                        {companion.availability}
                      </div>
                    </div>
                  </div>

                  {/* Profile Avatar */}
                  <div className="relative px-6 -mt-12 mb-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-20 h-20 rounded-[20px] border-4 border-white shadow-xl overflow-hidden"
                    >
                      <img
                        src={companion.avatar}
                        alt={companion.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Profile Info */}
                  <div className="px-6 pb-4 flex-1 flex flex-col overflow-hidden">
                    <h3 className="text-teal-800 mb-1 truncate">{companion.name}</h3>
                    <p className="text-sm text-teal-600 mb-3 truncate">
                      {companion.title}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-lime-400 text-lime-400" />
                        <span className="text-teal-800">{companion.rating}</span>
                        <span className="text-teal-600">
                          ({companion.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-teal-600">
                        <Video className="w-4 h-4" />
                        {companion.sessions} sessions
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-teal-600 mb-2 truncate">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{companion.location}</span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-teal-700 mb-3 line-clamp-2 overflow-hidden">
                      {companion.bio}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-3 overflow-hidden">
                      {companion.specialties.slice(0, 2).map((specialty, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {companion.specialties.length > 2 && (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                          +{companion.specialties.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-3 mb-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-teal-600 mb-1">Per Hour</p>
                          <p className="text-lg text-teal-800">
                            {companion.hourlyRate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-teal-600 mb-1">Per Call</p>
                          <p className="text-lg text-teal-800">
                            {companion.callRate}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-3 mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCompanion(companion)}
                        className="flex-1 py-3 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        style={{ backgroundColor: '#1a5d47' }}
                      >
                        Book Session
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(companion.id)}
                        aria-pressed={likedIds.includes(companion.id)}
                        className={`w-12 h-12 bg-white border-2 rounded-2xl flex items-center justify-center transition-colors ${likedIds.includes(companion.id) ? 'border-rose-200 bg-rose-50' : 'border-emerald-200 hover:bg-emerald-50'}`}
                      >
                        <Heart className={`w-5 h-5 ${likedIds.includes(companion.id) ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}`} />
                      </motion.button>
                    </div>

                    {/* Response Time - Compact */}
                    <div className="flex items-center justify-center gap-2 text-xs text-teal-600">
                      <Clock className="w-3 h-3" />
                      {companion.responseTime}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Profile Modal */}
        {selectedCompanion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCompanion(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Cover */}
              <div className="relative h-40 rounded-t-3xl overflow-hidden flex-shrink-0">
                <img
                  src={selectedCompanion.coverImage}
                  alt={selectedCompanion.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCompanion(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg
                    className="w-5 h-5 text-teal-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-0">
                {/* Avatar positioned at left bottom of banner - NO additional cover image */}
                <div className="relative h-0 overflow-visible px-8 -mt-12 mb-6">
                  <img
                    src={selectedCompanion.avatar}
                    alt={selectedCompanion.name}
                    className="w-24 h-24 rounded-2xl shadow-xl object-cover border-4 border-white"
                  />
                </div>

                <div className="px-8 pb-8 max-h-[60vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-emerald-50">
                  {/* Profile Info */}
                  <div className="mt-8 mb-6">
                    <h2 className="text-teal-800 mb-1">
                      {selectedCompanion.name}
                    </h2>
                    <p className="text-teal-600 mb-3">
                      {selectedCompanion.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-lime-400 text-lime-400" />
                        <span className="text-teal-800">
                          {selectedCompanion.rating}
                        </span>
                        <span className="text-teal-600">
                          ({selectedCompanion.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-teal-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      {selectedCompanion.location}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-teal-800 mb-2">About</h4>
                      <p className="text-sm text-teal-700">{selectedCompanion.bio}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-teal-800 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompanion.specialties.map(
                          (specialty: string, j: number) => (
                            <span
                              key={j}
                              className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-teal-800 mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompanion.languages.map(
                          (language: string, j: number) => (
                            <span
                              key={j}
                              className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full"
                            >
                              {language}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 mt-6 mb-6">
                    <h4 className="text-sm font-semibold text-teal-800 mb-3">Booking Options</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-teal-600">Hourly Rate</p>
                            <p className="text-lg font-bold text-teal-800">
                              {selectedCompanion.hourlyRate}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openBooking(selectedCompanion, 'chat')}
                          className={`w-full py-2 bg-gradient-to-r ${selectedCompanion.color} text-white rounded-lg text-sm font-semibold`}
                        >
                          Book Chat
                        </motion.button>
                      </div>

                      <div className="bg-white rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-teal-600">Per Call</p>
                            <p className="text-lg font-bold text-teal-800">
                              {selectedCompanion.callRate}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openBooking(selectedCompanion, 'video')}
                          className={`w-full py-2 bg-gradient-to-r ${selectedCompanion.color} text-white rounded-lg text-sm font-semibold`}
                        >
                          Book Video
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => copyProfileLink(selectedCompanion.id)}
                    className="w-full py-3 bg-white border-2 border-emerald-200 rounded-2xl text-teal-800 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {copiedId === selectedCompanion.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        Profile Link Copied!
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        Share Profile Card
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Booking Modal */}
        {booking.open && booking.companion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBooking({ open: false, companion: null, type: null, platform: "", date: "", time: "" })}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] max-w-lg w-full shadow-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={booking.companion.avatar} alt={booking.companion.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="text-teal-800">Book {booking.companion.name}</h4>
                  <p className="text-sm text-teal-600">{booking.type === 'chat' ? 'Chat Session' : 'Video Call'}</p>
                </div>
              </div>

              {/* Platform selection */}
              <div className="mb-4">
                <p className="text-sm text-teal-700 mb-2">Choose Platform</p>
                <div className="grid grid-cols-2 gap-2">
                  {(booking.type === 'chat'
                    ? ['In-App Chat', 'WhatsApp', 'Telegram', 'Signal']
                    : ['Google Meet', 'Zoom', 'Microsoft Teams'])
                    .map((p) => (
                      <button
                        key={p}
                        onClick={() => setBooking({ ...booking, platform: p })}
                        className={`px-3 py-2 rounded-xl border text-sm ${booking.platform === p ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent' : 'bg-white border-emerald-200 text-teal-800 hover:bg-emerald-50'}`}
                      >
                        {p}
                      </button>
                    ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-sm text-teal-700 mb-1">Date</p>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200 text-teal-800 bg-white"
                  />
                </div>
                <div>
                  <p className="text-sm text-teal-700 mb-1">Time</p>
                  <input
                    type="time"
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200 text-teal-800 bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setBooking({ open: false, companion: null, type: null, platform: '', date: '', time: '' })}
                  className="flex-1 px-4 py-3 rounded-xl border border-emerald-200 text-teal-800 hover:bg-emerald-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitBooking}
                  disabled={!booking.platform || !booking.date || !booking.time}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Companion Application Modal */}
        {isApplicationOpen && (
          <CompanionApplicationModal
            onClose={() => setIsApplicationOpen(false)}
            onSubmit={handleApplicationSubmit}
          />
        )}
      </div>
    </div>
  );
}
