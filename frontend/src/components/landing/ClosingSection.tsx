import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const ClosingSection: React.FC = () => {
    const navigate = useNavigate();

    const handleStartJourney = () => {
        navigate('/login');
    };
    return (
        <section className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: '#0c3328' }}>
            {/* Curved Section Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, #1a5d47 0%, transparent 70%)', filter: 'blur(100px)' }} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-12 md:space-y-16"
                >
                    {/* Tagline */}
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Where technology, culture, and <span className="text-[#86efac] font-medium">consciousness meet.</span>
                    </h2>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
                        <motion.a
                            href="#about"
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-white/80 text-lg md:text-xl font-medium hover:text-white transition-all duration-300"
                        >
                            About Nirvaha
                        </motion.a>
                        <div className="text-white/20">•</div>
                        <motion.a
                            href="#privacy"
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-white/80 text-lg md:text-xl font-medium hover:text-white transition-all duration-300"
                        >
                            Privacy & Ethics
                        </motion.a>
                        <div className="text-white/20">•</div>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-white/80 text-lg md:text-xl font-medium hover:text-white transition-all duration-300"
                        >
                            Contact
                        </motion.a>
                    </div>

                    {/* Call to action text */}
                    <div className="space-y-8">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-light text-emerald-100/60" style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Begin your journey inward.
                        </motion.h3>

                        {/* CTA Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleStartJourney}
                            className="px-12 py-5 bg-white text-[#0c3328] font-bold text-lg rounded-full shadow-2xl transition-all duration-300 inline-block hover:bg-emerald-50"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Start Your Journey
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ClosingSection;
