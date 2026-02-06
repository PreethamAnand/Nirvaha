import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const goals = [
    {
        id: 1,
        title: "INNER PEACE",
        subtitle: "I'm looking to find",
        image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
        desc: "Calm the mind and soothe the soul through mindful meditation and breathwork."
    },
    {
        id: 2,
        title: "EMOTIONAL HEALING",
        subtitle: "I'm looking for",
        image: "https://images.unsplash.com/photo-1499209974431-2761386a123d?q=80&w=800&auto=format&fit=crop",
        desc: "Process emotions and find balance with ancient healing practices."
    },
    {
        id: 3,
        title: "PHYSICAL VITALITY",
        subtitle: "I'm looking to boost",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=800&auto=format&fit=crop",
        desc: "Energize the body and spirit with holistic wellness techniques."
    },
    {
        id: 4,
        title: "SPIRITUAL CONNECTION",
        subtitle: "I'm looking for a",
        image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop",
        desc: "Deepen connection to self and universe through sacred wisdom."
    },
    {
        id: 5,
        title: "STRESS RELIEF",
        subtitle: "I'm seeking",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
        desc: "Release tension and restore harmony with proven relaxation methods."
    }
];

export function AncientWisdomSection() {
    const cardWidth = 340; // Slightly larger for better visuals
    const gap = 16; // Tighter gap for better visual flow
    const [currentIndex, setCurrentIndex] = useState(goals.length); // Start in middle set
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Create triple buffer for infinite loop illusion
    const extendedGoals = [...goals, ...goals, ...goals];

    // Handle Resize/Centering
    const [centerOffset, setCenterOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateOffset = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                setCenterOffset((containerWidth - cardWidth) / 2);
            }
        };

        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, []);

    // Handle Infinite Loop Reset - Fixed for smoother transitions
    useEffect(() => {
        if (!isTransitioning) return;

        const timeout = setTimeout(() => {
            setIsTransitioning(false);
        }, 800);

        return () => clearTimeout(timeout);
    }, [currentIndex, isTransitioning]);

    // Reset position when reaching boundaries (seamless infinite scroll)
    useEffect(() => {
        if (isTransitioning) return;

        if (currentIndex >= goals.length * 2) {
            setCurrentIndex(goals.length);
        } else if (currentIndex < goals.length) {
            setCurrentIndex(goals.length + (currentIndex % goals.length));
        }
    }, [currentIndex, isTransitioning]);

    const handleNext = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const translateX = -(currentIndex * (cardWidth + gap)) + centerOffset;

    return (
        <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
            <div className="w-full relative z-10">
                {/* Header - Constrained width */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F131A] mb-5 whitespace-nowrap"
                        style={{ fontFamily: "'Cinzel', serif" }}
                    >
                        WHY ANCIENT WISDOM?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg sm:text-xl text-[#595e67] max-w-3xl leading-relaxed"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
                    >
                        Grow your inner peace, elevate your consciousness, establish deep connections, uplift your health and more.
                        <span className="font-medium text-[#1a5d47] ml-1">Tell us your goals</span>, and become a better you like never before.
                    </motion.p>
                </div>

                {/* Carousel Wrapper - Handles overflow for cards only */}
                <div className="w-full overflow-hidden" ref={containerRef}>
                    <div
                        className="flex gap-4 px-4 py-8"
                        style={{
                            transform: `translateX(${translateX}px)`,
                            transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                            width: 'max-content',
                        }}
                    >
                        {extendedGoals.map((goal, index) => {
                            const isActive = index === currentIndex;
                            const distanceFromCenter = Math.abs(index - currentIndex);

                            return (
                                <div
                                    key={`${goal.id}-${index}`}
                                    onClick={() => {
                                        if (index !== currentIndex && !isTransitioning) {
                                            setIsTransitioning(true);
                                            setCurrentIndex(index);
                                        }
                                    }}
                                    className={`relative flex-shrink-0 w-[340px] h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                                        ${isActive
                                            ? 'scale-110 z-20 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.25)]'
                                            : distanceFromCenter === 1
                                                ? 'scale-95 opacity-75 blur-[0.3px] z-10 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.15)]'
                                                : 'scale-85 opacity-45 grayscale-[50%] blur-[1px] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)]'
                                        }`}
                                >
                                    <img
                                        src={goal.image}
                                        alt={goal.title}
                                        className="w-full h-full object-cover transition-transform duration-[800ms] ease-out"
                                        draggable={false}
                                        style={{ userSelect: 'none' }}
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-8 transition-all duration-[600ms] ease-out
                                        ${isActive ? 'opacity-100' : 'opacity-90'}`}
                                    >
                                        <p className="text-white/80 text-[0.7rem] font-bold mb-3 tracking-[0.25em] font-sans uppercase">
                                            {goal.subtitle}
                                        </p>
                                        <h3 className="text-white text-3xl font-black uppercase leading-[0.95] font-sans tracking-wider mb-4">
                                            {goal.title}
                                        </h3>

                                        {/* Description - Only show on active card */}
                                        <div className={`overflow-hidden transition-all duration-700 ease-out ${isActive ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-white/90 text-sm font-medium leading-relaxed">
                                                {goal.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation Controls - Outside Overflow Container */}
                <div className="flex items-center justify-center gap-10 mt-2">
                    <button
                        onClick={handlePrev}
                        disabled={isTransitioning}
                        className="w-16 h-16 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#0F131A] hover:bg-[#1a5d47] hover:text-white transition-all duration-300 ease-out hover:-translate-x-2 hover:shadow-[0_12px_40px_rgba(26,93,71,0.25)] active:scale-95 active:shadow-[0_4px_15px_rgba(26,93,71,0.2)] group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:bg-white disabled:hover:text-[#0F131A]"
                        aria-label="Previous goal"
                    >
                        <ChevronLeft size={30} className="transition-all duration-300 ease-out group-hover:scale-125 group-hover:-translate-x-0.5 group-active:scale-110" strokeWidth={2.5} />
                    </button>

                    {/* Current indicator */}
                    <div className="flex gap-2.5">
                        {goals.map((_, idx) => {
                            const normalizedIndex = currentIndex % goals.length;
                            const isCurrentDot = idx === normalizedIndex;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (!isTransitioning) {
                                            setIsTransitioning(true);
                                            const targetIndex = goals.length + idx;
                                            setCurrentIndex(targetIndex);
                                        }
                                    }}
                                    className={`transition-all duration-700 ease-out rounded-full ${isCurrentDot
                                        ? 'w-12 h-3 bg-[#1a5d47] shadow-[0_4px_12px_rgba(26,93,71,0.3)]'
                                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
                                        }`}
                                    aria-label={`Go to goal ${idx + 1}`}
                                />
                            );
                        })}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={isTransitioning}
                        className="w-16 h-16 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#0F131A] hover:bg-[#1a5d47] hover:text-white transition-all duration-300 ease-out hover:translate-x-2 hover:shadow-[0_12px_40px_rgba(26,93,71,0.25)] active:scale-95 active:shadow-[0_4px_15px_rgba(26,93,71,0.2)] group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:bg-white disabled:hover:text-[#0F131A]"
                        aria-label="Next goal"
                    >
                        <ChevronRight size={30} className="transition-all duration-300 ease-out group-hover:scale-125 group-hover:translate-x-0.5 group-active:scale-110" strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AncientWisdomSection;
