import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
    {
        title: "Guided Meditation",
        description: "Experience personalized meditation sessions that adapt to your emotional state. Our AI-powered guidance helps you find peace, clarity, and balance through ancient techniques reimagined for modern life.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        color: "#1a5d47"
    },
    {
        title: "Mood Tracking",
        description: "Gain deep insights into your emotional patterns with our intuitive mood tracking system. Visualize your journey, identify triggers, and celebrate your progress towards emotional wellness.",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
        color: "#e57373"
    },
    {
        title: "Sleep Stories",
        description: "Drift into restful slumber with our collection of soothing audio journeys. From enchanted forests to peaceful shores, let gentle narratives and ambient sounds guide you to deep, restorative sleep.",
        image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&w=800&q=80",
        color: "#7986cb"
    },
    {
        title: "Energy Balance",
        description: "Restore your inner vitality with practices designed to harmonize your energy centers. Through guided exercises and mindful techniques, unlock your body's natural ability to heal and recharge.",
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
        color: "#ffb74d"
    },
    {
        title: "Breathwork",
        description: "Master the art of conscious breathing with powerful techniques from ancient traditions. Reduce stress, boost focus, and transform your state of mind in just a few minutes of daily practice.",
        image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
        color: "#4fc3f7"
    },
    {
        title: "Daily Affirmations",
        description: "Begin each day with intention and positivity. Our curated affirmations are designed to rewire negative thought patterns and cultivate a mindset of abundance, gratitude, and self-love.",
        image: "https://images.unsplash.com/photo-1490730141103-6cac27abb37f?auto=format&fit=crop&w=800&q=80",
        color: "#ce93d8"
    },
];

export const FeaturesBentoGrid = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % features.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setActiveIndex(value);
    };

    // Get visible cards (previous, current, next)
    const getVisibleCards = () => {
        const cards = [];
        for (let i = -2; i <= 2; i++) {
            const idx = (activeIndex + i + features.length) % features.length;
            cards.push({ ...features[idx], position: i, originalIndex: idx });
        }
        return cards;
    };

    return (
        <section className="py-8 bg-white relative overflow-hidden">
            <div className="w-full px-6 md:px-12 lg:px-20">
                {/* Cards Carousel */}
                <div className="relative h-[550px] flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-full">
                        {getVisibleCards().map((card, idx) => {
                            const position = card.position;
                            const isActive = position === 0;
                            const absPos = Math.abs(position);

                            return (
                                <motion.div
                                    key={`${card.originalIndex}-${position}`}
                                    className="absolute rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
                                    style={{
                                        width: isActive ? '550px' : '480px',
                                        height: isActive ? '520px' : '460px',
                                        zIndex: 10 - absPos,
                                    }}
                                    initial={false}
                                    animate={{
                                        x: position * 200,
                                        scale: isActive ? 1 : 0.85 - absPos * 0.05,
                                        opacity: absPos > 1 ? 0.3 : isActive ? 1 : 0.7,
                                        rotateY: position * -8,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    onClick={() => setActiveIndex(card.originalIndex)}
                                >
                                    {/* Card Background Color */}
                                    <div
                                        className="absolute inset-0"
                                        style={{ backgroundColor: card.color }}
                                    />

                                    {/* Card Image */}
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center justify-center gap-4 mt-12">
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#1a5d47] transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Gradient Slider Track with Avatar */}
                    <div className="relative w-[400px] md:w-[600px] h-3 rounded-full overflow-visible"
                        style={{
                            background: `linear-gradient(to right, #f59e0b, #fbbf24, #fb923c, #f97316, #ef4444, #ec4899, #d946ef, #a855f7)`
                        }}
                    >
                        {/* Avatar that moves along the track */}
                        <motion.div
                            className="absolute w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-xl z-10"
                            style={{ top: '-22px' }}
                            initial={false}
                            animate={{
                                left: `calc(${(activeIndex / (features.length - 1)) * 100}% - 28px)`
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <img
                                src={features[activeIndex].image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Dot Indicators */}
                        <div className="absolute inset-0 flex items-center justify-between px-2">
                            {features.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeIndex
                                        ? 'bg-white scale-125 shadow-md'
                                        : 'bg-white/60 hover:bg-white/80'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#1a5d47] transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Feature Content */}
                <div className="mt-12 text-center max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3
                                className="text-2xl md:text-3xl font-bold text-[#0F131A] mb-4"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                {features[activeIndex].title}
                            </h3>
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                {features[activeIndex].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
