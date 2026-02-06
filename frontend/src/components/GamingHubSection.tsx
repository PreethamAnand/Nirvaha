import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Gamepad2, ArrowRight, Play } from 'lucide-react';

const features = [
    {
        id: 'mind-maze',
        title: 'Mind Maze',
        category: 'Cognitive Focus',
        description: 'Sharpen your attention span with adaptive 3D puzzles that evolve as you improve.',
        benefits: ['Boosts focus by 40%', 'Adaptive difficulty'],
        image: '/gaming/mind-maze.png',
        color: 'bg-indigo-500'
    },
    {
        id: 'zen-flow',
        title: 'Zen Flow',
        category: 'Stress Reduction',
        description: 'Sync your breathing and movement in this biofeedback-integrated rhythm game.',
        benefits: ['Lowers cortisol', 'Heart-rate sync'],
        image: '/gaming/zen-flow.png',
        color: 'bg-emerald-500'
    },
    {
        id: 'soul-quest',
        title: 'Soul Quest',
        category: 'Personal Growth',
        description: 'An RPG where your character levels up when you complete real-world wellness habits.',
        benefits: ['Habit building', 'Character customization'],
        image: '/gaming/soul-quest.png',
        color: 'bg-amber-500'
    },
    {
        id: 'spirit-duel',
        title: 'Spirit Duel',
        category: 'Team Building',
        description: 'Connect with colleagues in friendly, high-energy challenges designed to energize teams.',
        benefits: ['Social bonding', 'Team leaderboards'],
        image: '/gaming/spirit-duel.png',
        color: 'bg-rose-500'
    }
];

export const GamingHubSection = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (id: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setActiveId(id);
        }, 100);
    };

    const handleMouseLeave = () => {
        // We rely on the container's mouse leave to reset, or we can simply not reset here
        // to allow smooth transition between cards.
        // Actually, let's reset if the user moves out of the card BUT 
        // usually we want to keep the state until they leave the *section* or enter another card.
        // The container handles the full reset.
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleContainerLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveId(null);
    };

    return (
        <section className="py-8 bg-white relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1a5d47]/10 text-[#1a5d47]">
                                <Gamepad2 className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[#1a5d47] font-bold tracking-widest text-[10px] uppercase underline underline-offset-4 decoration-1">Nirvaha Arcade</span>
                        </div>
                        <h2
                            className="text-3xl font-bold text-[#0F131A] tracking-tight mb-2"
                            style={{ fontFamily: "'Cinzel', serif" }}
                        >
                            Gamified Wellness
                        </h2>
                        <p className="text-gray-500 text-base">
                            Experience premium interactive sessions designed to engage your mind and restore your spirit.
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

                {/* Desktop Interactive Row (Hidden on mobile) */}
                <div className="hidden lg:flex h-[450px] w-full gap-4 items-stretch" onMouseLeave={handleContainerLeave}>
                    {features.map((feature) => {
                        const isActive = activeId === feature.id;
                        const isIdle = activeId === null;

                        return (
                            <motion.div
                                key={feature.id}
                                layout
                                onMouseEnter={() => handleMouseEnter(feature.id)}
                                onMouseLeave={handleMouseLeave}
                                animate={{
                                    flex: isActive ? 3.5 : 1,
                                    opacity: isActive || isIdle ? 1 : 0.6
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 20,
                                    mass: 1
                                }}
                                className={`
                                    relative rounded-3xl overflow-hidden cursor-pointer
                                    shadow-lg hover:shadow-2xl bg-slate-900
                                `}
                            >
                                {/* Background Image - Shrinks to LEFT half on hover */}
                                <motion.div
                                    className="absolute top-0 bottom-0 left-0 bg-slate-900 overflow-hidden"
                                    animate={{
                                        width: isActive ? '50%' : '100%',
                                    }}
                                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                >
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                </motion.div>

                                {/* Idle Title - visible ONLY when no card is active (Idle state) */}
                                <AnimatePresence>
                                    {isIdle && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute bottom-8 left-6 right-6 z-10"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`w-2 h-2 rounded-full ${feature.color}`} />
                                                <span className="text-white/90 text-[10px] font-bold tracking-widest uppercase truncate">{feature.category}</span>
                                            </div>
                                            <h3 className="text-white text-xl font-bold leading-tight truncate">{feature.title}</h3>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Expanded Content Panel - RIGHT SIDE (50% width) */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ x: '100%' }}
                                            animate={{ x: '0%' }}
                                            exit={{ x: '100%' }}
                                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                            className="absolute inset-y-0 right-0 w-[50%] bg-white
                                                flex flex-col justify-center px-8 py-6 z-20 shadow-2xl"
                                        >
                                            <div className="space-y-4">
                                                {/* Header */}
                                                <div>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center text-white shadow-md`}>
                                                            <Gamepad2 className="w-4 h-4" />
                                                        </span>
                                                        <span className="text-slate-500 font-bold text-[10px] tracking-[0.2em] uppercase">{feature.category}</span>
                                                    </div>
                                                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                                                        {feature.title}
                                                    </h3>
                                                </div>

                                                <div className="w-10 h-1 bg-slate-100 rounded-full" />

                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                                    {feature.description}
                                                </p>

                                                <div className="space-y-2 pt-1">
                                                    {feature.benefits.map((benefit, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: 10 }} // Slide from right
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 + (i * 0.05) }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <div className="w-4 h-4 rounded-full bg-[#1a5d47]/10 flex items-center justify-center text-[#1a5d47]">
                                                                <Check className="w-2.5 h-2.5" />
                                                            </div>
                                                            <span className="text-slate-700 text-xs font-medium">{benefit}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="pt-4"
                                                >
                                                    <motion.button
                                                        whileHover={{ scale: 1.02, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`
                                                            w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg 
                                                            flex items-center justify-center gap-3 group/btn relative overflow-hidden
                                                            ${feature.color}
                                                        `}
                                                    >
                                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            Play Now
                                                            <div className="bg-white/20 p-1 rounded-full group-hover/btn:bg-white/30 transition-colors">
                                                                <Play className="w-3 h-3 fill-current" />
                                                            </div>
                                                        </span>
                                                    </motion.button>
                                                </motion.div>
                                            </div>

                                            {/* Decorative side accent - Left Side of Panel */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${feature.color} opacity-20`} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile/Tablet Fallback (Grid Layout) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
                    {features.map((feature) => (
                        <div key={feature.id} className="relative h-[400px] rounded-2xl overflow-hidden group">
                            <img src={feature.image} alt={feature.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${feature.color}`} />
                                    <span className="text-white/90 text-xs font-bold uppercase">{feature.category}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-white/80 text-sm mb-4 line-clamp-2">{feature.description}</p>
                                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                                    Play Now <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
