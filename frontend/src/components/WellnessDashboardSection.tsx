import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, User, Bookmark, Calendar } from "lucide-react";
import { EngagementStreak } from "./EngagementStreak";

interface SessionCard {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  image: string;
  participants?: string;
}

interface PracticeCard {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  image: string;
  category: string;
}

export function WellnessDashboardSection() {
  const { user } = useAuth();
  const [selectedDuration, setSelectedDuration] = useState<string>("all");

  const featuredSessions: SessionCard[] = [
    {
      id: "1",
      title: "Starting Your Wellness Journey",
      instructor: "Wellness Team",
      duration: "12 min",
      image: "/profile/OIP1.jpeg",
      participants: "98,543",
    },
    {
      id: "2",
      title: "Three Essential Practices",
      instructor: "Dr. Sarah Williams",
      duration: "18 min",
      image: "/profile/OIP2.jpeg",
      participants: "85,320",
    },
    {
      id: "3",
      title: "The Six Phase Practice",
      instructor: "Michael Chen",
      duration: "22 min",
      image: "/profile/OIP3.jpeg",
      participants: "124,891",
    },
  ];

  const dailyPractices: PracticeCard[] = [
    {
      id: "1",
      title: "Restful Morning Practice",
      instructor: "Elena Rodriguez",
      duration: "4 min",
      image: "/profile/OIP4.jpeg",
      category: "under5",
    },
    {
      id: "2",
      title: "Tranquil Mind Flow",
      instructor: "James Morrison",
      duration: "8 min",
      image: "/profile/OIP5.jpeg",
      category: "under10",
    },
    {
      id: "3",
      title: "Mastering Inner Balance",
      instructor: "Sophia Anderson",
      duration: "15 min",
      image: "/profile/OIP6.jpeg",
      category: "under20",
    },
    {
      id: "4",
      title: "Abundance Transformation",
      instructor: "The Wellness Institute",
      duration: "28 min",
      image: "/profile/OIP7.jpeg",
      category: "over20",
    },
  ];

  const popularContent: SessionCard[] = [
    {
      id: "1",
      title: "The Silva Ultramind System",
      instructor: "José Silva",
      duration: "45 min",
      participants: "108,847",
      image: "/profile/OIP8.jpeg",
    },
    {
      id: "2",
      title: "Superbrain",
      instructor: "Jim Kwik",
      duration: "52 min",
      participants: "97,486",
      image: "/profile/OIP9.jpeg",
    },
    {
      id: "3",
      title: "The Art of Manifesting",
      instructor: "Roxie Nafousi",
      duration: "38 min",
      participants: "210,120",
      image: "/profile/OIP10.jpeg",
    },
  ];

  const durationFilters = [
    { label: "Under 5 min", value: "under5" },
    { label: "Under 10 min", value: "under10" },
    { label: "Under 20 min", value: "under20" },
    { label: "Over 20 min", value: "over20" },
  ];

  const filteredPractices =
    selectedDuration === "all"
      ? dailyPractices
      : dailyPractices.filter((p) => p.category === selectedDuration);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting Header with Profile Section */}
        <div className="mb-12">
          <div className="flex items-flex-start justify-between">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-[#0f131a] mb-3">
                Hi, {user?.name || "Preetham"}
              </h1>
              <p className="text-lg text-[#595b67]">
                Curated experiences designed for your inner balance
              </p>
            </div>
            
            {/* Profile Picture Section */}
            <div className="w-40 h-40 rounded-full border-4 border-[#0f131a] bg-[#595b67]/10 flex items-center justify-center flex-shrink-0 ml-8">
              <User className="w-20 h-20 text-[#595b67]" />
            </div>
          </div>
        </div>

        {/* Featured Sessions Row */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0f131a] mb-8">
            Sessions for you
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {featuredSessions.map((session) => (
              <div
                key={session.id}
                className="flex-shrink-0 w-80 cursor-pointer group"
              >
                <div className="mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#0f131a] mb-2 group-hover:text-[#1a5d47] transition-colors">
                  {session.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#595b67]">
                  <span>{session.instructor}</span>
                  {session.participants && (
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {session.participants}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Practice Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0f131a] mb-4">
              Practices of the day
            </h2>
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => setSelectedDuration("all")}
                className={`transition-colors ${
                  selectedDuration === "all"
                    ? "text-[#0f131a] font-semibold"
                    : "text-[#595b67] hover:text-[#0f131a]"
                }`}
              >
                All
              </button>
              {durationFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedDuration(filter.value)}
                  className={`transition-colors ${
                    selectedDuration === filter.value
                      ? "text-[#0f131a] font-semibold"
                      : "text-[#595b67] hover:text-[#0f131a]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {filteredPractices.map((practice) => (
              <div
                key={practice.id}
                className="flex-shrink-0 w-72 cursor-pointer group"
              >
                <div className="relative mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={practice.image}
                    alt={practice.title}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 right-3 bg-white text-[#0f131a] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {practice.duration}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#0f131a] mb-2 group-hover:text-[#1a5d47] transition-colors">
                  {practice.title}
                </h3>
                <p className="text-sm text-[#595b67]">{practice.instructor}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations Banner */}
        <section className="mb-16">
          <div className="bg-white border-2 border-[#0f131a] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#0f131a] mb-4">
                Your journey evolves with you
              </h2>
              <p className="text-lg text-[#595b67]">
                Personalized sessions based on your activity and interests
              </p>
            </div>
            <button className="bg-[#1a5d47] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#144a38] transition-colors">
              Set your preferences
            </button>
          </div>
        </section>

        {/* Favorites Empty State */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0f131a] mb-8">Favorites</h2>
          <div className="border-2 border-[#595b67]/20 rounded-3xl p-12 text-center">
            <Bookmark className="w-16 h-16 mx-auto mb-4 text-[#595b67]" />
            <p className="text-lg text-[#595b67] max-w-md mx-auto">
              You haven't saved anything yet. Explore sessions and keep what
              resonates.
            </p>
          </div>
        </section>

        {/* User Analytics Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0f131a] mb-8">Your Activity</h2>
          
          {/* Bookings Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bookings Card */}
            <div className="border-2 border-[#0f131a] rounded-3xl p-8 hover:border-[#1a5d47] transition-colors">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#1a5d47] flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-[#595b67]">This Month</span>
              </div>
              <div className="mb-2">
                <h3 className="text-5xl font-bold text-[#0f131a] mb-1">12</h3>
                <p className="text-base text-[#595b67] font-medium">Total Bookings</p>
              </div>
              <div className="mt-4 pt-4 border-t-2 border-[#595b67]/20">
                <p className="text-sm text-[#595b67]">
                  <span className="text-[#1a5d47] font-semibold">+3</span> compared to last month
                </p>
              </div>
            </div>

            {/* Engagement Streak Tracker with Heatmap */}
            <EngagementStreak />
          </div>
        </section>

        {/* Popular Content Row */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#0f131a]">
              Popular right now
            </h2>
            <button className="text-sm text-[#595b67] hover:text-[#0f131a] transition-colors">
              Update profile
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {popularContent.map((content) => (
              <div
                key={content.id}
                className="flex-shrink-0 w-80 cursor-pointer group"
              >
                <div className="mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#0f131a] mb-2 group-hover:text-[#1a5d47] transition-colors">
                  {content.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#595b67]">
                  <span>{content.instructor}</span>
                  {content.participants && (
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {content.participants}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Growth Banner */}
        <section className="mb-16">
          <div className="bg-[#1a5d47] text-white rounded-3xl p-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-6">
                LEVEL UP YOUR
                <br />
                GROWTH
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Unlock full library of programs and meditations, personalized
                learning and exclusive community to transform your growth
                journey
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  Membership + Meditations
                </span>
                <button className="bg-white text-[#1a5d47] px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                  Upgrade now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
