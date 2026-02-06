import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQSection = () => {
    const faqs = [
        {
            q: "Is Nirvaha suitable for beginners?",
            a: "Absolutely. Our platform is designed for all levels, offering guided paths from foundational mindfulness to advanced spiritual practices.",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
        },
        {
            q: "How does the AI Companion work?",
            a: "Our AI guide uses empathetic language models trained on therapeutic principles to offer 24/7 support, reflection, and resource recommendations.",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop"
        },
        {
            q: "Can I access offline?",
            a: "Yes, Premium members can download meditations and sleep stories for offline use. Perfect for travel or deep focus sessions.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
        },
        {
            q: "What is your approach to privacy?",
            a: "Your emotional data is encrypted and never sold. We adhere to strict HIPAA-compliant standards for data protection and security.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
        },
        {
            q: "Which practices are included?",
            a: "We offer a diverse range of practices including Pranayama, Yoga Nidra, Sound Healing, Vipassana, and modern CBT-based mindfulness exercises.",
            image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop"
        },
        {
            q: "Can I use Nirvaha with my team?",
            a: "Yes, we offer specialized Corporate Wellness plans that include team-building 'Spirit Duels' and collective meditation rooms.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
        },
        {
            q: "Is there a free version available?",
            a: "Yes, we offer a 'Foundation' tier with access to daily quotes, basic breathing exercises, and intro-level meditation modules.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-8 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1a5d47]/10 text-[#1a5d47]">
                                <HelpCircle className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[#1a5d47] font-bold tracking-widest text-[10px] uppercase underline underline-offset-4 decoration-1">Support Center</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0F131A] tracking-tight mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                            Clarity in Every Breath
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Everything you need to know about starting your journey.
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

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left Side - Dynamic Image Container - COMPACT */}
                    <div className="lg:col-span-5 relative h-[500px] overflow-hidden hidden lg:block">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={openIndex !== null ? faqs[openIndex].image : 'default'}
                                src={openIndex !== null ? faqs[openIndex].image : faqs[0].image}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                alt="FAQ Visual"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Right Side - Accordion - COMPACT FONT SIZES */}
                    <div className="lg:col-span-7 divide-y divide-gray-100">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="group bg-transparent transition-all duration-300 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                                >
                                    <span className={`font-semibold text-base md:text-lg tracking-tight transition-all duration-300 ${openIndex === idx ? 'text-[#1a5d47] pl-1' : 'text-[#0F131A] group-hover:text-[#1a5d47]/80'
                                        }`}>
                                        {faq.q}
                                    </span>
                                    <div className={`p-1.5 rounded-full transition-all duration-300 ${openIndex === idx
                                        ? 'bg-[#1a5d47]/10 text-[#1a5d47] rotate-0'
                                        : 'bg-transparent text-gray-300 group-hover:text-gray-500'
                                        }`}>
                                        {openIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-6 pl-1 text-gray-500 text-sm leading-relaxed max-w-xl">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
