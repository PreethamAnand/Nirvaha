import React from 'react';
import { motion } from 'motion/react';

const libraryItems = [
    { title: "Meditation", category: "Mindfulness", image: "/services/meditation.png", duration: "10 min" },
    { title: "Sleep Stories", category: "Rest", image: "/services/sound_healing.png", duration: "25 min" },
    { title: "Ancient Wisdom", category: "Philosophy", image: "/Book.png", duration: "Series" },
    { title: "Breathwork", category: "Practice", image: "/services/BF.png", duration: "5 min" },
    { title: "Sound Healing", category: "Therapy", image: "/services/sound_healing.png", duration: "45 min" },
    { title: "Zen Chat", category: "AI Companion", image: "/services/zenchat.png", duration: "Unlimited" },
];


const LibraryCarousel: React.FC = () => {
    return (
        <section className="w-full pt-4 pb-12 bg-white overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="text-left">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F131A] mb-5 uppercase leading-tight"
                        style={{ fontFamily: "'Cinzel', serif" }}
                    >
                        EXPLORE OUR VAST LIBRARY
                    </motion.h2>
                    <p className="text-lg sm:text-xl text-[#595e67] max-w-3xl leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
                        Dive into a curated collection of ancient wisdom and modern practices designed for your inner journey.
                        <span className="font-medium text-[#1a5d47] ml-1">Discover your path inward.</span>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .carousel-track-1 {
                    animation: scroll 70s linear infinite;
                }
                .carousel-track-2 {
                    animation: scroll 50s linear infinite;
                }
            `}</style>

            {/* Row 1 */}
            <div className="flex gap-6 mb-6 w-full overflow-hidden">
                <div className="flex gap-6 pl-4 carousel-track-1 w-max">
                    {[...libraryItems, ...libraryItems].map((item, idx) => (
                        <div
                            key={`r1-${idx}`}
                            className="relative flex-shrink-0 w-[425px] h-[225px] rounded-2xl overflow-hidden shadow-md cursor-pointer group"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/1a5d47?text=Nirvaha' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-5 flex flex-col justify-end">
                                <span className="text-xs text-white/80 font-medium uppercase tracking-wider mb-1">{item.category}</span>
                                <h3 className="text-white text-xl font-bold font-sans">{item.title}</h3>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-xs text-white/90 bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                                        {item.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-6 w-full overflow-hidden">
                <div className="flex gap-6 pl-4 carousel-track-2 w-max">
                    {[...libraryItems].reverse().concat([...libraryItems].reverse()).map((item, idx) => (
                        <div
                            key={`r2-${idx}`}
                            className="relative flex-shrink-0 w-[425px] h-[225px] rounded-2xl overflow-hidden shadow-md cursor-pointer group"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/1a5d47?text=Nirvaha' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-5 flex flex-col justify-end">
                                <span className="text-xs text-white/80 font-medium uppercase tracking-wider mb-1">{item.category}</span>
                                <h3 className="text-white text-xl font-bold font-sans">{item.title}</h3>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-xs text-white/90 bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                                        {item.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </section>
    );
};

export default LibraryCarousel;
