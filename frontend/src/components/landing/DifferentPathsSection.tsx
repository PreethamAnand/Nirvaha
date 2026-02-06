import React from 'react';
import { Sprout, Scale, Zap } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// --- Content Data ---
const pathCards = [
    {
        icon: <Sprout className="w-16 h-16" />,
        title: "Schools & Universities",
        description: "Emotional foundations for young minds."
    },
    {
        icon: <Scale className="w-16 h-16" />,
        title: "Corporates",
        description: "Burnout prevention and meaningful focus."
    },
    {
        icon: <Zap className="w-16 h-16" />,
        title: "Athletes",
        description: "Mental resilience under pressure."
    }
];

export function DifferentPathsSection() {
    const { ref: sectionRef, inView } = useScrollAnimation<HTMLDivElement>();

    return (
        <section className="relative w-full overflow-hidden" style={{ backgroundColor: '#ffffff' }}>


            {/* Background decorative shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div
                    className="absolute w-96 h-96 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, #d4e4d4 0%, transparent 70%)',
                        top: '10%',
                        left: '-10%',
                    }}
                />
                <div
                    className="absolute w-80 h-80 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, #dce9dc 0%, transparent 70%)',
                        bottom: '5%',
                        right: '-5%',
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative pt-20 pb-4" ref={sectionRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <div className="text-center mb-16 sm:mb-20">
                        <h2
                            className={`text-3xl sm:text-4xl lg:text-5xl font-bold transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{
                                color: '#0F131A',
                                fontFamily: "'Cinzel', serif",
                                letterSpacing: '0.01em',
                                lineHeight: 1.3,
                            }}
                        >
                            Designed for different paths.
                            <br />
                            Built on the same core.
                        </h2>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 mb-12">
                        {pathCards.map((card, index) => (
                            <div
                                key={index}
                                className={`group transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                style={{
                                    transitionDelay: `${400 + index * 200}ms`,
                                }}
                            >
                                <div
                                    className="group relative p-10 sm:p-12 rounded-3xl min-h-[420px] flex flex-col overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl bg-[#fafafa]"
                                    style={{
                                        border: '1px solid #e5e7eb',
                                    }}
                                >
                                    {/* Liquid Curved Fill - Rising to 60% */}
                                    <div
                                        className="absolute inset-x-0 bottom-0 bg-[#e6f4ea] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-[40%]"
                                        style={{
                                            height: '100%',
                                            zIndex: 0,
                                            borderRadius: '100% 100% 0 0 / 15% 15% 0 0'
                                        }}
                                    />

                                    {/* Content stays fixed above the fill */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Title - Stays top half (Dark) */}
                                        <h3
                                            className="text-2xl sm:text-3xl font-semibold mb-8"
                                            style={{ color: '#0F131A', fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            {card.title}
                                        </h3>

                                        {/* Description - Middle area (Stays dark for readability on pale green) */}
                                        <div className="flex-grow">
                                            <p
                                                className="text-base sm:text-lg leading-relaxed mb-6 transition-colors duration-500 group-hover:text-[#2c3333]"
                                                style={{ color: '#595e67', fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
                                            >
                                                <span
                                                    className="font-semibold transition-colors duration-500 group-hover:text-[#0F131A]"
                                                    style={{ color: '#0F131A' }}
                                                >
                                                    {card.description}
                                                </span>
                                                {' '}
                                                {index === 0
                                                    ? 'Prevent burnout, reduce absenteeism, and build emotional resilience with complete support.'
                                                    : index === 1
                                                        ? 'Help your clients improve well-being and productivity with evidence-based programs.'
                                                        : 'Build mental strength and focus under pressure with tailored practices.'
                                                }
                                            </p>
                                        </div>

                                        {/* Learn More - Bottom area (Stays dark green) */}
                                        <div
                                            className="mt-auto flex items-center gap-2 font-semibold transition-colors duration-500 group-hover:text-[#0a3629]"
                                            style={{ color: '#1a5d47' }}
                                        >
                                            <div className="flex items-center gap-2">
                                                Learn more
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer text */}
                    < div
                        className={`text-center transition-all duration-1000 ease-out delay-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        <p
                            className="text-lg sm:text-xl"
                            style={{
                                color: '#595e67',
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 400,
                                fontStyle: 'italic',
                            }}
                        >
                            Different environments. The same inner challenges.
                        </p>
                    </div>
                </div>
            </div>


        </section >
    );
}

export default DifferentPathsSection;
