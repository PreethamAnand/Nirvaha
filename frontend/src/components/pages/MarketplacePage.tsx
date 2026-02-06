import { motion } from "motion/react";
import {
  ShoppingBag,
  BookOpen,
  Star,
  Heart,
  Clock,
  Users,
  Truck,
  Shield,
  Filter,
  Search,
  Award,
  MapPin,
  CalendarRange,
  Plus,
} from "lucide-react";
import { useState } from "react";
import AddItemModal from "../marketplace/AddItemModal";

export function MarketplacePage() {
  const [activeTab, setActiveTab] =
    useState<"sessions" | "retreats" | "products">("sessions");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedAddType, setSelectedAddType] = useState<
    "session" | "retreat" | "product"
  >("session");

  const sessions = [
    {
      title: "Live Breathwork Reset",
      host: "Dr. Anjali Sharma",
      schedule: "Tue · 7:00 PM GMT",
      duration: "90 min live",
      attendees: "520 joined",
      rating: 4.9,
      price: "$39",
      image: "https://images.unsplash.com/photo-1676747484510-755c231ae83e?w=600",
      color: "from-emerald-400 to-teal-500",
      topics: ["Zoom", "Guided", "Recording included"],
    },
    {
      title: "Chakra Alignment Studio",
      host: "Master Li Wei",
      schedule: "Thu · 5:30 PM PST",
      duration: "75 min interactive",
      attendees: "410 joined",
      rating: 5.0,
      price: "$49",
      image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600",
      color: "from-purple-400 to-indigo-500",
      topics: ["Breakout rooms", "Energy scan", "Worksheets"],
    },
    {
      title: "Sound Bath for Sleep",
      host: "Elena Costa",
      schedule: "Sat · 9:00 PM CET",
      duration: "60 min stream",
      attendees: "1,102 joined",
      rating: 4.8,
      price: "$29",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600",
      color: "from-cyan-400 to-blue-500",
      topics: ["Binaural", "Restorative", "Replay access"],
    },
    {
      title: "Pranayama Pulse",
      host: "Yogi Ravi Kumar",
      schedule: "Daily · 6:30 AM IST",
      duration: "30 min live",
      attendees: "3,102 joined",
      rating: 4.9,
      price: "$19",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
      color: "from-orange-400 to-red-500",
      topics: ["Morning reset", "Live Q&A", "Recordings"],
    },
    {
      title: "Mudra Micro-Practice Lab",
      host: "Sarah Mitchell",
      schedule: "Fri · 11:00 AM EST",
      duration: "45 min live",
      attendees: "2,567 joined",
      rating: 4.7,
      price: "$24",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600",
      color: "from-lime-400 to-emerald-500",
      topics: ["Camera on", "Feedback", "PDF guide"],
    },
    {
      title: "Soul Journey Circles",
      host: "Alex Rivera",
      schedule: "Sun · 4:00 PM GMT",
      duration: "2 hr live",
      attendees: "4,521 joined",
      rating: 5.0,
      price: "$59",
      image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=600",
      color: "from-pink-400 to-rose-500",
      topics: ["Breakout sharing", "Guided journaling", "Replay"],
    },
  ];

  const retreats = [
    {
      title: "Himalayan Silent Retreat",
      guide: "Swami Ravi",
      location: "Rishikesh, India",
      dates: "Mar 12 - Mar 18, 2026",
      capacity: "40 seats",
      rating: 5.0,
      price: "$1,299",
      image: "https://images.unsplash.com/photo-1523419400524-33de15b45d5b?w=600",
      color: "from-amber-400 to-orange-500",
      highlights: ["Lodging", "Plant-based meals", "Ganga aarti"],
    },
    {
      title: "Desert Breathwork Camp",
      guide: "Nadia El Ameen",
      location: "Sahara, Morocco",
      dates: "Apr 4 - Apr 9, 2026",
      capacity: "28 seats",
      rating: 4.9,
      price: "$1,599",
      image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600",
      color: "from-orange-500 to-red-500",
      highlights: ["Sunset circles", "Camel trek", "Star bathing"],
    },
    {
      title: "Forest Detox & Yoga",
      guide: "Elena Costa",
      location: "Ubud, Bali",
      dates: "May 16 - May 21, 2026",
      capacity: "32 seats",
      rating: 4.8,
      price: "$1,899",
      image: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?w=600",
      color: "from-emerald-400 to-teal-500",
      highlights: ["Eco villas", "Sound baths", "Waterfall hike"],
    },
    {
      title: "Sacred Clay & Breath",
      guide: "Diego Martínez",
      location: "Oaxaca, Mexico",
      dates: "Jun 6 - Jun 10, 2026",
      capacity: "24 seats",
      rating: 4.9,
      price: "$1,249",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
      color: "from-lime-400 to-green-500",
      highlights: ["Ceramic lab", "Temazcal", "Farm-to-table"],
    },
    {
      title: "Nordic Cold Plunge Reset",
      guide: "Freya Lund",
      location: "Lofoten, Norway",
      dates: "Jul 2 - Jul 6, 2026",
      capacity: "18 seats",
      rating: 5.0,
      price: "$2,099",
      image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=600",
      color: "from-cyan-400 to-blue-500",
      highlights: ["Fjords", "Cold immersion", "Sauna rituals"],
    },
    {
      title: "Mediterranean Mindful Sailing",
      guide: "Sara Leone",
      location: "Amalfi Coast, Italy",
      dates: "Sep 9 - Sep 14, 2026",
      capacity: "22 seats",
      rating: 4.8,
      price: "$2,499",
      image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600",
      color: "from-purple-400 to-rose-500",
      highlights: ["Yacht stay", "Meditation decks", "Chef onboard"],
    },
  ];

  const products = [
    {
      name: "Crystal Healing Set",
      description: "Premium collection of 7 chakra-aligned crystals",
      price: "$89",
      rating: 4.9,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1663899940872-6dba376bbfdb?w=600",
      category: "Crystals",
      color: "from-purple-400 to-pink-500",
      inStock: true,
    },
    {
      name: "Tibetan Singing Bowl",
      description: "Hand-crafted meditation bowl with mallet",
      price: "$149",
      rating: 5.0,
      reviews: 218,
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600",
      category: "Sound Healing",
      color: "from-orange-400 to-red-500",
      inStock: true,
    },
    {
      name: "Meditation Cushion Set",
      description: "Organic cotton zafu and zabuton combo",
      price: "$79",
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600",
      category: "Meditation",
      color: "from-emerald-400 to-teal-500",
      inStock: true,
    },
    {
      name: "Sacred Incense Collection",
      description: "Natural aromatic incense sticks - 12 varieties",
      price: "$39",
      rating: 4.7,
      reviews: 891,
      image: "https://images.unsplash.com/photo-1610294645949-149e5a5ff15d?w=600",
      category: "Aromatherapy",
      color: "from-cyan-400 to-blue-500",
      inStock: true,
    },
    {
      name: "Mala Bead Necklace",
      description: "108 sandalwood beads for meditation practice",
      price: "$59",
      rating: 4.9,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
      category: "Spiritual Tools",
      color: "from-amber-400 to-orange-500",
      inStock: true,
    },
    {
      name: "Essential Oil Diffuser",
      description: "Ultrasonic aromatherapy diffuser with LED",
      price: "$69",
      rating: 4.6,
      reviews: 734,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600",
      category: "Aromatherapy",
      color: "from-lime-400 to-emerald-500",
      inStock: true,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#fdfcfb] via-[#f8f7f4] to-[#f5f4f1] text-slate-900">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-slate-900 text-6xl md:text-7xl font-extrabold mb-6">
            Marketplace
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-700 leading-relaxed">
            <span className="block">
              "Sessions that meet you where you are, retreats that take you where you dream."
            </span>
            <span className="block">
              Curated journeys, soulful products, and the spaces between.
            </span>
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-2 shadow-xl border border-emerald-200/30 inline-flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("sessions")}
              className={`px-8 py-4 rounded-[24px] transition-all flex items-center gap-2 ${activeTab === "sessions"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "text-teal-700 hover:bg-emerald-50"
                }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Sessions</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("retreats")}
              className={`px-8 py-4 rounded-[24px] transition-all flex items-center gap-2 ${activeTab === "retreats"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "text-teal-700 hover:bg-emerald-50"
                }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Retreats</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("products")}
              className={`px-8 py-4 rounded-[24px] transition-all flex items-center gap-2 ${activeTab === "products"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "text-teal-700 hover:bg-emerald-50"
                }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Products</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mb-12 md:items-center"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-xl rounded-[24px] border border-emerald-200/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-teal-800 placeholder:text-teal-400"
            />
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedAddType(activeTab === "products" ? "product" : activeTab === "retreats" ? "retreat" : "session");
                setIsAddOpen(true);
              }}
              className="px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-[24px] shadow-lg flex items-center gap-2 hover:from-teal-600 hover:to-emerald-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 bg-white/80 backdrop-blur-xl rounded-[24px] border border-emerald-200/30 shadow-lg text-teal-800 flex items-center gap-2 hover:bg-emerald-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </motion.button>
          </div>
        </motion.div>

        {/* Sessions Grid */}
        {activeTab === "sessions" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sessions.map((session, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${session.color} rounded-[40px] blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
                />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-xl border border-emerald-200/30 h-[500px] flex flex-col">
                  {/* Course Image */}
                  <div className="relative h-[35%] min-h-[170px] overflow-hidden">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Heart className="w-5 h-5 text-rose-500" />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`px-4 py-2 bg-gradient-to-r ${session.color} text-white rounded-full text-sm shadow-lg`}
                      >
                        Online Session
                      </span>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6 flex-1 flex flex-col overflow-hidden">
                    <h3 className="text-teal-800 mb-2 truncate">{session.title}</h3>

                    <p className="text-sm text-teal-600 mb-3 truncate">
                      Host: {session.host}
                    </p>

                    <div className="flex items-center gap-4 mb-3 text-sm text-teal-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarRange className="w-4 h-4" />
                        {session.schedule}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-lime-400 text-lime-400" />
                        <span className="text-teal-800">{session.rating}</span>
                      </div>
                      <span className="text-sm text-teal-600">{session.attendees}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 overflow-hidden">
                      {session.topics.map((topic, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-emerald-200/30 mt-auto min-h-[75px]">
                      <div>
                        <div className="text-2xl text-teal-800">
                          {session.price}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl shadow-lg"
                      >
                        Join Live
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Retreats Grid */}
        {activeTab === "retreats" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {retreats.map((retreat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${retreat.color} rounded-[40px] blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
                />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-xl border border-emerald-200/30 h-[500px] flex flex-col">
                  <div className="relative h-[35%] min-h-[170px] overflow-hidden">
                    <img
                      src={retreat.image}
                      alt={retreat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Heart className="w-5 h-5 text-rose-500" />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`px-4 py-2 bg-gradient-to-r ${retreat.color} text-white rounded-full text-sm shadow-lg`}
                      >
                        Offline Retreat
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col overflow-hidden">
                    <div>
                      <h3 className="text-teal-800 mb-1 truncate">{retreat.title}</h3>
                      <p className="text-sm text-teal-600 truncate">Led by {retreat.guide}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-teal-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {retreat.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarRange className="w-4 h-4" />
                        {retreat.dates}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-teal-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {retreat.capacity}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-lime-400 text-lime-400" />
                        {retreat.rating}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 overflow-hidden">
                      {retreat.highlights.map((item, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-emerald-200/30 mt-auto min-h-[75px]">
                      <div>
                        <div className="text-2xl text-teal-800">{retreat.price}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl shadow-lg"
                      >
                        Request Spot
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {activeTab === "products" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-[40px] blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
                />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-xl border border-emerald-200/30 h-[500px] flex flex-col">
                  {/* Product Image */}
                  <div className="relative h-[35%] min-h-[170px] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Heart className="w-5 h-5 text-rose-500" />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-xl text-teal-800 rounded-full text-sm shadow-lg">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex-1 flex flex-col overflow-hidden">
                    <h4 className="text-teal-800 mb-2 truncate">{product.name}</h4>

                    <p className="text-sm text-teal-600 mb-3 overflow-hidden">
                      {product.description.length > 120
                        ? `${product.description.slice(0, 120)}...`
                        : product.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-lime-400 text-lime-400" />
                        <span className="text-teal-800">{product.rating}</span>
                      </div>
                      <span className="text-sm text-teal-600">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {product.inStock ? (
                        <div className="flex items-center gap-2 text-sm text-emerald-600">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          In Stock
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-rose-600">
                          <div className="w-2 h-2 rounded-full bg-rose-500" />
                          Out of Stock
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-emerald-200/30 mt-auto min-h-[75px]">
                      <div>
                        <div className="text-2xl text-teal-800">
                          {product.price}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl shadow-lg"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-lg border border-emerald-200/30">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h5 className="text-teal-800 mb-1">Secure Payment</h5>
              <p className="text-sm text-teal-600">100% protected transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-lg border border-emerald-200/30">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <h5 className="text-teal-800 mb-1">Quality Guaranteed</h5>
              <p className="text-sm text-teal-600">Curated by experts</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-lg border border-emerald-200/30">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h5 className="text-teal-800 mb-1">Fast Delivery</h5>
              <p className="text-sm text-teal-600">Free shipping over $50</p>
            </div>
          </div>
        </motion.div>

        {isAddOpen && (
          <AddItemModal
            onClose={() => setIsAddOpen(false)}
            selectedAddType={selectedAddType}
            setSelectedAddType={setSelectedAddType}
          />
        )}
      </div>
    </div>
  );
}
