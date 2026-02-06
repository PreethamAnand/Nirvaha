import React from 'react';

const quotes = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=600&auto=format&fit=crop",
        quote: "Peace comes from within. Do not seek it without.",
        author: "Buddha"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=600&auto=format&fit=crop",
        quote: "The only journey is the one within.",
        author: "Rainer Maria Rilke"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
        quote: "Quiet the mind, and the soul will speak.",
        author: "Ma Jaya Sati Bhagavati"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
        quote: "The soul always knows what to do to heal itself. The challenge is to silence the mind.",
        author: "Caroline Myss"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop",
        quote: "Look deep into nature, and then you will understand everything better.",
        author: "Albert Einstein"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=600&auto=format&fit=crop",
        quote: "The best way to find yourself is to lose yourself in the service of others.",
        author: "Mahatma Gandhi"
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600&auto=format&fit=crop",
        quote: "Happiness is not something readymade. It comes from your own actions.",
        author: "Dalai Lama"
    }
];

export const InspirationalQuotes = () => {
    return (
        <section className="py-8 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="text-left">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1a5d47]/10 text-[#1a5d47]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                        </span>
                        <span className="text-[#1a5d47] font-bold tracking-widest text-[10px] uppercase underline underline-offset-4 decoration-1">Wisdom Daily</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#0F131A] tracking-tight mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Daily Inspiration</h2>
                    <p className="text-gray-500 text-sm">Discover wisdom to guide your journey</p>
                </div>
                <button className="group flex items-center gap-2 text-[#1a5d47] font-semibold hover:text-[#113d2f] transition-colors duration-300 pb-1">
                    <span className="border-b-2 border-transparent group-hover:border-[#1a5d47] transition-all duration-300">View More</span>
                    <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>

            <div className="relative group/carousel">
                {/* Horizontal Scrolling Container */}
                <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-6 md:px-8 no-scrollbar scroll-smooth snap-x snap-mandatory">
                    {quotes.map((q) => (
                        <div key={q.id} className="group shrink-0 w-[320px] h-[480px] cursor-pointer perspective-1000 snap-center">
                            <div className="relative w-full h-full duration-700 preserve-3d group-hover:my-rotate-y-180">

                                {/* Front Side */}
                                <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                                    <img src={q.image} alt="Inspiration" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-0 right-0 text-center">
                                        <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black tracking-[0.2em] text-white uppercase border border-white/20">REVEAL WISDOM</span>
                                    </div>
                                </div>

                                {/* Back Side */}
                                <div className="absolute inset-0 backface-hidden my-rotate-y-180 bg-[#1a5d47] rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden">
                                    {/* Decorative element */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                                    <span className="text-7xl text-white/10 font-serif mb-2 leading-none">“</span>
                                    <p className="text-xl text-white font-medium leading-relaxed font-serif mb-8 italic">{q.quote}</p>
                                    <div className="w-16 h-[1px] bg-white/20 mb-6 font-light italic"></div>
                                    <span className="text-[11px] text-emerald-200 uppercase tracking-[0.3em] font-bold">{q.author}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fade Indicators */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity"></div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .my-rotate-y-180 { transform: rotateY(180deg); }
                .group:hover .group-hover\\:my-rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </section>
    );
};
