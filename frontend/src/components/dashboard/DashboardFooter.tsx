import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export const DashboardFooter = () => {
    return (
        <footer className="bg-[#0B2E24] pt-8 pb-10 overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                                <img src="/logo.png" alt="Nirvaha" className="w-8 h-8 opacity-90" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>NIRVAHA</span>
                        </div>
                        <p className="text-emerald-100/60 text-lg leading-relaxed mb-8 max-w-sm">
                            Bridging ancient wisdom and modern science to create a digital sanctuary for the modern mind.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-100/60 hover:bg-[#1a5d47] hover:text-white transition-all duration-300 hover:-translate-y-1">
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white text-lg mb-8 uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4 text-emerald-100/50">
                            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Meditation
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Sound Healing
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                AI Companion
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Community
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white text-lg mb-8 uppercase tracking-widest">Company</h4>
                        <ul className="space-y-4 text-emerald-100/50">
                            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Our Story
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Careers
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Case Studies
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Contact
                            </li>
                        </ul>
                    </div>

                    {/* Subscription Section */}
                    <div className="lg:col-span-4">
                        <h4 className="font-bold text-white text-lg mb-8 uppercase tracking-widest">Stay Inspired</h4>
                        <p className="text-emerald-100/50 mb-6 text-sm">Join our newsletter for weekly doses of wisdom and peace.</p>
                        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm focus-within:border-emerald-500/50 transition-all">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent text-white text-sm block w-full px-4 outline-none placeholder:text-white/20"
                            />
                            <button className="bg-emerald-600 text-white rounded-xl px-5 py-2.5 hover:bg-emerald-500 transition-all duration-300 font-bold text-sm shadow-lg">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-emerald-100/30 text-xs tracking-widest uppercase">
                        © 2026 Nirvaha Inc. Crafted with Peace.
                    </p>
                    <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] text-emerald-100/30 uppercase">
                        <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Cookie settings</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
