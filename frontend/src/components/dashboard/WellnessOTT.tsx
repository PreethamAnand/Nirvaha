import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const videos = [
    {
        title: "Morning Calm",
        category: "Meditation",
        duration: "10 min",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Deep Sleep Guide",
        category: "Sleep",
        duration: "45 min",
        thumbnail: "https://images.unsplash.com/photo-1511296933631-18b520a86d8b?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Anxiety Relief",
        category: "Stress",
        duration: "20 min",
        thumbnail: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Focus Flow",
        category: "Productivity",
        duration: "30 min",
        thumbnail: "https://images.unsplash.com/photo-1499209974431-2761386a123d?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Chakra Balance",
        category: "Energy",
        duration: "15 min",
        thumbnail: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=600&auto=format&fit=crop"
    },
];

export const WellnessOTT = () => {
    return (
        <section className="py-8 bg-[#f8faf9] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1a5d47]/10 text-[#1a5d47]">
                                <Play className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[#1a5d47] font-bold tracking-widest text-[10px] uppercase underline underline-offset-4 decoration-1">Nirvaha Stream</span>
                        </div>
                        <h2
                            className="text-3xl font-bold text-[#0F131A] tracking-tight mb-2"
                            style={{ fontFamily: "'Cinzel', serif" }}
                        >
                            Wellness OTT
                        </h2>
                        <p className="text-gray-500 text-base">
                            Stream your path to peace.
                        </p>
                    </div>
                    <motion.button
                        className="group flex items-center gap-2 text-[#1a5d47] font-semibold hover:text-[#113d2f] transition-all duration-300 pb-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="border-b-2 border-transparent group-hover:border-[#1a5d47] transition-all duration-300">View More</span>
                        <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.button>
                </div>

                {/* Video Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    {videos.map((vid, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            {/* Thumbnail */}
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <img
                                    src={vid.thumbnail}
                                    alt={vid.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F131A]/80 via-transparent to-transparent opacity-80" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-14 h-14 bg-[#1a5d47] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1a5d47] text-xs font-semibold rounded-full">
                                        {vid.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3
                                    className="font-bold text-[#0F131A] group-hover:text-[#1a5d47] transition-colors"
                                    style={{ fontFamily: "'Cinzel', serif" }}
                                >
                                    {vid.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
