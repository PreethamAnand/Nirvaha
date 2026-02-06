import React from 'react';
import { motion } from 'motion/react';

const TrustedStats: React.FC = () => {
    const partners = [
        { name: "Google", logo: "https://www.vectorlogo.zone/logos/google/google-ar21.svg" },
        { name: "Microsoft", logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" },
        { name: "Amazon", logo: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg" },
        { name: "Adobe", logo: "https://www.vectorlogo.zone/logos/adobe/adobe-ar21.svg" }
    ];

    return (
        <section className="w-full bg-white pt-10 pb-16 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#595e67] uppercase font-sans border-b border-[#1a5d47]/20 pb-2">
                        Trusted by professionals at
                    </span>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                    {partners.map((partner, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-none aspect-[2/1] flex items-center justify-center p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-gray-100/60 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden"
                        >
                            {/* Logo Wrapper */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-w-[70%] max-h-[70px] object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Subtle Fill Hover Effect */}
                            <div className="absolute inset-x-0 bottom-0 h-0 bg-[#1a5d47]/[0.02] transition-all duration-500 group-hover:h-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedStats;
