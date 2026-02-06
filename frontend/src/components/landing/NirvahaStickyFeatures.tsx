import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// --- Data for Nirvaha features ---
const nirvahFeatures = [
    {
        title: "Guided Meditation",
        description: "Mudra-based practices and guided voice sessions designed for all levels.",
        imageUrl: "/services/meditation.png",
        bgColor: "#f4f7f4",
    },
    {
        title: "AI Wellness Chat",
        description: "24/7 spiritual guidance and emotional support tailored to your journey.",
        imageUrl: "/services/zenchat.png",
        bgColor: "#f0f8f0",
    },
    {
        title: "Sound Healing",
        description: "Frequency therapy and sacred sound sessions to align body and mind.",
        imageUrl: "/services/sound_healing.png",
        bgColor: "#edfafa",
    },
    {
        title: "Personalized Care",
        description: "Customized sessions with certified experts addressing your unique spiritual and emotional needs.",
        imageUrl: "/services/PS.png",
        bgColor: "#f7f9f5",
    },
];

export function NirvahaStickyFeatures() {
    const { ref: sectionRef, inView } = useScrollAnimation();

    return (
        <section
            className="w-full py-12 sm:py-16 lg:py-20 overflow-hidden bg-white"
            ref={sectionRef}
        >
            <div className="w-full px-6 sm:px-10 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

                    {/* Left Side: Sticky Header Content */}
                    <div className="lg:w-1/4">
                        <div className={`lg:sticky lg:top-24 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[1.5px] w-10 bg-[#1a5d47]" />
                                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a5d47', fontWeight: 600 }}>The Inner Path</span>
                            </div>

                            <h2
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F131A] leading-[1.2] mb-4"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Gentle Services for Your <br className="hidden lg:block" />
                                <span className="text-[#1a5d47]">Inner Journey</span>
                            </h2>

                            <p
                                className="text-sm text-[#595e67] leading-relaxed mb-6"
                                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
                            >
                                Explore a curated collection of meditations, sound healing, and guided practices designed to bring harmony to your mental and spiritual wellness.
                            </p>

                            <button
                                className="group flex items-center gap-3 text-[#1a5d47] font-semibold text-sm transition-all duration-300"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                <span className="relative">
                                    Start Your Journey
                                    <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#1a5d47] transition-all duration-300 group-hover:w-full" />
                                </span>
                                <div className="w-7 h-7 rounded-full border border-[#1a5d47]/20 flex items-center justify-center group-hover:bg-[#1a5d47] group-hover:text-white transition-all duration-300">
                                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Bento Grid */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[160px]">

                            {/* Card 1: Meditation (Large) */}
                            <div
                                className={`lg:col-span-12 lg:row-span-2 group relative overflow-hidden rounded-[1.5rem] bg-white transition-all duration-1000 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                            >
                                <img
                                    src="/services/meditation.png"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                                    alt="Guided Meditation"
                                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
                                    <h3 style={{ fontFamily: "'Cinzel', serif" }} className="text-xl sm:text-2xl font-bold mb-2">Guided Meditation</h3>
                                    <p className="text-xs sm:text-sm text-white/80 font-light max-w-xl">
                                        Ancient Mudra practices and high-fidelity guided voice sessions designed to bring immediate clarity and peace.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: AI Wellness (Half-width) */}
                            <div
                                className={`lg:col-span-6 lg:row-span-1 group relative overflow-hidden rounded-[1.5rem] bg-[#f0f8f0] transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                            >
                                <img
                                    src="/services/zenchat.png"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-70"
                                    alt="AI Wellness Chat"
                                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop"; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 text-[#0F131A] z-10">
                                    <h3 style={{ fontFamily: "'Cinzel', serif" }} className="text-lg font-bold mb-1">AI Wellness Chat</h3>
                                    <p className="text-[11px] text-[#595e67] font-light">24/7 spiritual and emotional guidance.</p>
                                </div>
                            </div>

                            {/* Card 3: Sound Healing (Half-width) */}
                            <div
                                className={`lg:col-span-6 lg:row-span-1 group relative overflow-hidden rounded-[1.5rem] bg-[#edfafa] transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                            >
                                <img
                                    src="/services/sound_healing.png"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-70"
                                    alt="Sound Healing"
                                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1514525253361-bee8a19de09a?q=80&w=800&auto=format&fit=crop"; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 text-[#0F131A] z-10">
                                    <h3 style={{ fontFamily: "'Cinzel', serif" }} className="text-lg font-bold mb-1">Sound Healing</h3>
                                    <p className="text-[11px] text-[#595e67] font-light">Harmonize your vibration.</p>
                                </div>
                            </div>

                            {/* Card 4: Personalized (Bottom Full) */}
                            <div
                                className={`lg:col-span-12 lg:row-span-1 group relative overflow-hidden rounded-[2rem] bg-[#f7f9f5] transition-all duration-1000 delay-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                            >
                                <div className="absolute inset-0 flex flex-col md:flex-row">
                                    <div className="flex-[1.2] p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative z-10">
                                        <h3 style={{ fontFamily: "'Cinzel', serif" }} className="text-xl font-bold mb-2 text-[#0F131A]">Personalized Care</h3>
                                        <p className="text-xs text-[#595e67] font-light max-w-lg">
                                            Work directly with our team of spiritual mentors and wellness experts to craft a path tailored specifically to your healing journey.
                                        </p>
                                    </div>
                                    <div className="flex-1 overflow-hidden h-full">
                                        <img
                                            src="/services/PS.png"
                                            className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                                            alt="Personalized Care"
                                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop"; }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default NirvahaStickyFeatures;
