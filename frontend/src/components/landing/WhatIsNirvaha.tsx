import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const pillars = [
    {
        id: "01",
        title: "Systemic Diagnostics",
        desc: "We analyze your organizational pulse through confidential, culturally-aware assessments to identify latent stressors.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "02",
        title: "Scalable Protocols",
        desc: "Deployment of curated wellness frameworks that adapt to team size, location, and operational intensity.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "03",
        title: "Leadership Synergy",
        desc: "Equipping managers with high-EQ toolkits to foster psychological safety and resilient decision-making.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "04",
        title: "Cultural Integration",
        desc: "Weaving emotional intelligence into the daily fabric of operations, transforming wellness from a perk to a practice.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "05",
        title: "Impact & ROI",
        desc: "Real-time analytics measuring engagement, retention shifts, and emotional capital growth.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
    }
];

const WhatIsNirvaha: React.FC = () => {
    // Initialize as null so nothing is open by default
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="mb-12 lg:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#0F131A] mb-4 tracking-tight"
                        style={{ fontFamily: "'Cinzel', serif" }}
                    >
                        What is Nirvaha?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-[#595e67] max-w-2xl text-lg font-light tracking-wide font-sans"
                    >
                        Constructing the bridge between corporate performance and human well-being.
                    </motion.p>
                </div>

                {/* Unified Card Container - Side by Side, Attached */}
                <div className="flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden min-h-[500px] border border-gray-100 items-stretch">

                    {/* LEFT COLUMN: Dynamic Visual - Attached 50% width, matches height */}
                    <div className="relative w-full lg:w-1/2 bg-gray-900 overflow-hidden min-h-[300px]">
                        <AnimatePresence mode="popLayout">
                            {activeIndex !== null && (
                                <motion.img
                                    key={activeIndex}
                                    src={pillars[activeIndex].image}
                                    alt={pillars[activeIndex].title}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            )}

                            {/* Default Empty State when nothing hovered */}
                            {activeIndex === null && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0 bg-[#0F131A] flex flex-col items-center justify-center p-10 text-center"
                                >
                                    <span className="text-white/20 text-5xl lg:text-9xl mb-4 opacity-10 font-bold">N</span>
                                    <h3 className="text-white/40 text-xl font-serif italic tracking-wider">Hover over a pillar to reveal insights</h3>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Subtle Overlay Gradient (Visual only, no text) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>

                    {/* RIGHT COLUMN: Interactive Accordion - Attached 50% width */}
                    <div
                        className="w-full lg:w-1/2 bg-[#fafafa] flex flex-col border-l border-gray-100"
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        {pillars.map((pillar, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <div
                                    key={pillar.id}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    // Smooth CSS transition relative to motion
                                    className={`group relative flex-1 flex flex-col justify-center border-b border-gray-200 last:border-0 px-8 lg:px-10 py-6 cursor-pointer transition-all duration-700 ease-in-out 
                                        ${isActive ? 'bg-[#1a5d47]' : 'bg-[#fafafa] hover:bg-white'}`}
                                >
                                    <div className="flex items-center justify-between pointer-events-none">
                                        <h4 className={`text-xl font-medium transition-colors duration-500 delay-100 ${isActive ? 'text-white' : 'text-[#0F131A]/60'}`}>
                                            <span className={`text-sm font-mono mr-4 opacity-60 transition-colors duration-500 ${isActive ? 'text-[#4ade80]' : 'text-[#1a5d47]/60'}`}>
                                                {pillar.id}
                                            </span>
                                            {pillar.title}
                                        </h4>
                                        <motion.div
                                            animate={{
                                                rotate: isActive ? 90 : 0,
                                                color: isActive ? '#4ade80' : '#d1d5db',
                                                x: isActive ? 5 : 0
                                            }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.div>
                                    </div>

                                    {/* Accordion Description - Very Smooth */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-white/80 text-base leading-relaxed pl-10 pr-4 font-light">
                                                    {pillar.desc}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatIsNirvaha;
