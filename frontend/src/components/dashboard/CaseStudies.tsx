import React from 'react';
import { ArrowRight, Star, Quote } from 'lucide-react';

export const CaseStudies = () => {
    return (
        <section className="py-8 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex -space-x-1.5 mr-1">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-6 h-6 rounded-full border border-white overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[#1a5d47] font-bold tracking-widest text-[10px] uppercase underline underline-offset-4 decoration-1">5000+ Lives Transformed</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0F131A] tracking-tight mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                            Success Stories
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Real people, real transformations. See how Nirvaha is changing lives through the power of ancient wisdom and modern science.
                        </p>
                    </div>
                    <button className="group flex items-center gap-2 text-[#1a5d47] font-semibold hover:text-[#113d2f] transition-all duration-300 pb-1">
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

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Featured Case Study - Left */}
                    <div className="lg:col-span-7 group relative h-full min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white">
                        <img
                            src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop"
                            alt="Transformation"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                        <div className="absolute top-8 left-8">
                            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-[0.2em] uppercase border border-white/20">
                                Featured Transformation
                            </span>
                        </div>

                        <div className="absolute bottom-10 left-10 right-10">
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                From 14-Hour Workdays to Inner Stillness
                            </h3>
                            <p className="text-gray-200 text-lg mb-6 line-clamp-2 max-w-xl">
                                "The guided meditation protocols didn't just help me sleep; they helped me rediscover the joy in my work."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden shadow-lg">
                                    <img src="https://i.pravatar.cc/100?img=32" alt="Client" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">Alexandra Chen</p>
                                    <p className="text-white/60 text-xs tracking-wider uppercase">Senior Architect, NYC</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Smaller Case Studies - Right */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="flex-1 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Quote className="w-20 h-20 text-[#1a5d47]" />
                            </div>
                            <span className="text-[#1a5d47] font-bold text-xs tracking-widest uppercase mb-4 block">Personal Growth</span>
                            <h3 className="text-2xl font-bold text-[#0F131A] mb-4">Overcoming Anxiety Through Sound</h3>
                            <p className="text-gray-600 mb-6 flex-grow italic">
                                "The binaural beats and ancient chanting modules provided a sanctuary I didn't know I needed."
                            </p>
                            <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#1a5d47] font-bold">M</div>
                                    <p className="text-[#0F131A] font-bold text-sm">Marcus J.</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-[#1a5d47] group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>

                        <div className="flex-1 bg-[#1a5d47] p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 group relative">
                            <div className="absolute bottom-0 right-0 p-8 opacity-10">
                                <Star className="w-24 h-24 text-white" />
                            </div>
                            <span className="text-white/60 font-bold text-xs tracking-widest uppercase mb-4 block">Health Mastery</span>
                            <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Chronic Pain Relief via Ayurvedic Wisdom</h3>
                            <p className="text-emerald-50/80 mb-6 flex-grow">
                                Reversing years of back pain through consistent yoga nidra and herbal guidance.
                            </p>
                            <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-auto">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">S</div>
                                    <p className="font-bold text-sm">Sarah P.</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
