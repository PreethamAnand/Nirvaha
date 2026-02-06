import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const GoldenShowcase: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-12 lg:py-20 overflow-hidden bg-white flex items-center justify-center min-h-[800px]">

      {/* Left Placeholder Card - Edge to Edge */}
      <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-[800px] bg-white z-10 items-center justify-center overflow-hidden">
        <img src="/about/left-collage.png" alt="Community Left" className="w-full h-full object-cover opacity-80" />
      </div>

      {/* Center Text Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#0F131A] mb-6 tracking-tighter leading-none" style={{ fontFamily: "'Cinzel', serif" }}>
            About Us
          </h2>
          <h3 className="text-xl sm:text-2xl font-medium text-[#595e67] mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Bridging Ancient Wisdom & Modern Science
          </h3>
          <p className="text-lg text-[#595e67] leading-relaxed mb-10 mx-auto" style={{ fontFamily: "'Poppins', sans-serif", maxWidth: '400px' }}>
            Nirvaha is more than a platform—it's a sanctuary where timeless spiritual practices meet cutting-edge emotional wellness tools to help you find your inner balance.
          </p>

          <button
            onClick={() => navigate('/community')}
            className="px-10 py-4 rounded-full bg-[#1a5d47] text-white font-semibold text-lg hover:bg-[#144937] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Read stories
          </button>
        </motion.div>
      </div>

      {/* Right Placeholder Card - Edge to Edge */}
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-[30%] h-[800px] bg-white z-10 items-center justify-center overflow-hidden">
        <img src="/about/right-collage.png" alt="Community Right" className="w-full h-full object-cover opacity-80" />
      </div>
    </section >
  );
};

export default GoldenShowcase;


