import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function LeadershipHeroSection() {
    const { ref: sectionRef, inView } = useScrollAnimation();

    return (
        <section
            className="relative w-full overflow-hidden bg-white"
            ref={sectionRef}
        >
            {/* Background Aura Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-[2000ms] ${inView ? 'opacity-20 translate-x-0' : 'opacity-0 translate-x-20'}`}
                    style={{
                        background: 'radial-gradient(circle at center, #d4a574 0%, transparent 70%)',
                        filter: 'blur(120px)',
                    }}
                />
                <div
                    className={`absolute bottom-0 left-0 w-1/3 h-full transition-all duration-[2000ms] ${inView ? 'opacity-10 translate-x-0' : 'opacity-0 -translate-x-20'}`}
                    style={{
                        background: 'radial-gradient(circle at center, #1a5d47 0%, transparent 70%)',
                        filter: 'blur(100px)',
                    }}
                />
            </div>

            <div className="relative py-8 sm:py-10 lg:py-12 px-6 sm:px-10 lg:px-16 w-full">
                {/* Main Glassmorphic Card */}
                <div
                    className={`relative overflow-hidden rounded-[2.5rem] border border-[#e5e7eb] bg-[#f9fafb] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] transition-all duration-1000 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
                        }`}
                >
                    <div className="flex flex-col lg:flex-row min-h-[400px]">

                        {/* Content Side */}
                        <div className="flex-[1.2] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                            {/* Headline */}
                            <h2
                                className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 transition-all duration-1000 ease-out delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                style={{
                                    color: '#0F131A',
                                    fontFamily: "'Cinzel', serif",
                                    letterSpacing: '-0.01em',
                                    lineHeight: 1.1,
                                }}
                            >
                                Become a Coach Who
                                <br />
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #1a5d47 0%, #2d8a6b 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Leads Through Service.
                                </span>
                            </h2>

                            {/* Subheadline */}
                            <p
                                className={`text-base sm:text-lg transition-all duration-1000 ease-out delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                style={{
                                    color: '#444',
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 300,
                                    lineHeight: 1.8,
                                    maxWidth: '600px',
                                }}
                            >
                                Nirvaha empowers purpose-driven individuals to turn compassion into leadership — building the mindset, coaching artistry, and spiritual clarity needed to guide others.
                            </p>

                            {/* Desktop CTA */}
                            <div className={`mt-10 hidden lg:block transition-all duration-1000 ease-out delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <button
                                    className="group relative px-10 py-5 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,93,71,0.3)] hover:-translate-y-2"
                                    style={{
                                        background: 'linear-gradient(135deg, #1a5d47 0%, #2d8a6b 100%)',
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    <span className="absolute inset-0 bg-[#0c3328] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center gap-4">
                                        Start Your Coaching Journey
                                        <svg
                                            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                                <p className="mt-4 text-[#1a5d47] font-medium italic opacity-60">
                                    Transform your calling into impact.
                                </p>
                            </div>

                            {/* Mobile CTA */}
                            <div className="mt-10 lg:hidden text-left">
                                <button
                                    className="px-8 py-4 rounded-full font-semibold text-white bg-[#1a5d47] shadow-lg"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    Start Your Coaching Journey
                                </button>
                            </div>
                        </div>

                        {/* Image/Visual Side */}
                        <div className="hidden lg:flex flex-1 relative bg-[#fdfcfb] overflow-hidden group">
                            {/* The Atmospheric Image */}
                            <img
                                src="/coaching_coach.png"
                                alt="Coaching Transformation"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                                style={{
                                    maskImage: 'linear-gradient(to right, transparent, black 20%)',
                                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)',
                                }}
                            />

                            {/* Overlay Gradient for Transition */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcfb] via-transparent to-transparent opacity-90" />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
}

export default LeadershipHeroSection;
