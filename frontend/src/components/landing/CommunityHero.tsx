import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const CommunityHero = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <motion.video
        ref={videoRef}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.2 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero_cinematic.mp4" type="video/mp4" />
      </motion.video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />


      {/* Content Card */}
      <div className="relative z-20 container mx-auto px-4 flex justify-center items-center h-full pt-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 50,
            mass: 1.2,
            delay: 0.3
          }}
          className="max-w-3xl w-full backdrop-blur-lg bg-white/10 rounded-3xl px-8 py-10 md:px-14 md:py-20 shadow-2xl text-center border border-white/20"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.6
                }
              }
            }}
            className="space-y-8"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg tracking-tighter leading-none mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Find Your Inner Harmony
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className="text-xl md:text-2xl text-emerald-50 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the convergence of ancient wisdom and modern technology for your complete holistic healing journey.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className="pt-4"
            >
              <button
                onClick={() => navigate('/signup')}
                className="px-10 py-4 rounded-full bg-[#1a5d47] text-white font-semibold text-lg hover:bg-[#144937] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Start Your Journey
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityHero;
