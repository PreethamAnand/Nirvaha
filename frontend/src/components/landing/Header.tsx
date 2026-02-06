import React, { useEffect, useRef, createContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

// Context to provide the bounding rect of the header Nirvaha
export const HeaderNirvahaRectContext = createContext<DOMRect | null>(null);

interface HeaderProps {
  onNirvahaClick?: () => void;
  logoSrc?: string;
  logoAlt?: string;
}

const Header: React.FC<HeaderProps> = ({ onNirvahaClick, logoSrc = '/logo.png', logoAlt = 'Nirvaha Logo' }) => {
  const [nirvahaRect, setNirvahaRect] = useState<DOMRect | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  // We'll attach this ref to the logo text container to calculate rect if needed by other components
  const nirvahaRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const [featuresMenuOpen, setFeaturesMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateRect = () => {
      if (nirvahaRef.current) {
        const rect = nirvahaRef.current.getBoundingClientRect();
        setNirvahaRect(rect);
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    // Also update on scroll as position might change
    window.addEventListener('scroll', updateRect);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  const handleLogoClick = () => {
    if (onNirvahaClick) {
      onNirvahaClick();
    } else {
      navigate('/');
    }
  };

  const featureItems = [
    { id: "meditation", label: "Meditation", path: "/dashboard/meditation" },
    { id: "sound", label: "Sound Healing", path: "/dashboard/sound" },
    { id: "chatbot", label: "AI Guide", path: "/dashboard/chatbot" },
    { id: "community", label: "Community", path: "/dashboard/community" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setFeaturesMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <HeaderNirvahaRectContext.Provider value={nirvahaRect}>
      <header
        ref={headerRef}
        className="absolute top-0 left-0 right-0 z-50 transition-colors duration-500"
        style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                onClick={handleLogoClick}
                className="flex items-center gap-3 focus:outline-none rounded-xl transition-all duration-300 hover:scale-105"
                aria-label="Go to home page"
              >
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg drop-shadow-lg"
                />
                <div ref={nirvahaRef}>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-100 to-teal-200 bg-clip-text text-transparent">
                    NIRVAHA
                  </h3>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-2xl transition-all"
              >
                <span className="text-sm font-semibold drop-shadow-sm">Home</span>
              </motion.button>

              {/* Features Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFeaturesMenuOpen(!featuresMenuOpen)}
                  onMouseEnter={() => setFeaturesMenuOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-2xl transition-all"
                >
                  <span className="text-sm font-semibold drop-shadow-sm">Features</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>

                <AnimatePresence>
                  {featuresMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseLeave={() => setFeaturesMenuOpen(false)}
                      className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden"
                    >
                      {featureItems.map((item, index) => (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleNavigate(item.path)}
                          className="w-full flex items-center gap-3 px-6 py-3 text-white hover:bg-white/10 transition-all text-left"
                        >
                          <span className="font-semibold drop-shadow-sm">{item.label}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate('/dashboard/marketplace')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-2xl transition-all"
              >
                <span className="text-sm font-semibold drop-shadow-sm">Marketplace</span>
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate('/dashboard/companion')}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-2xl transition-all"
              >
                <span className="text-sm font-semibold drop-shadow-sm">Companion</span>
              </motion.button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <Link
                  to="/dashboard/overview"
                  className="px-6 py-2.5 rounded-full text-white font-semibold text-sm hover:scale-105 hover:shadow-lg transition-all duration-300 border border-emerald-400/30 bg-emerald-600/80 backdrop-blur-sm"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-full text-white font-semibold dropdown-shadow-sm text-sm hover:bg-white/10 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2.5 rounded-full text-white font-semibold text-sm hover:scale-105 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/40 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <button
                  onClick={() => handleNavigate('/')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl"
                >
                  <span className="font-semibold drop-shadow-sm">Home</span>
                </button>

                <div className="space-y-2">
                  <div className="px-4 text-xs font-semibold text-emerald-200/50 uppercase tracking-wider">Features</div>
                  {featureItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.path)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl pl-8"
                    >
                      <span className="font-semibold drop-shadow-sm">{item.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleNavigate('/dashboard/marketplace')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl"
                >
                  <span className="font-semibold drop-shadow-sm">Marketplace</span>
                </button>

                <button
                  onClick={() => handleNavigate('/dashboard/companion')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl"
                >
                  <span className="font-semibold drop-shadow-sm">Companion</span>
                </button>

                <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-3">
                  {user ? (
                    <button
                      onClick={() => handleNavigate('/dashboard/overview')}
                      className="w-full py-3 rounded-xl text-white font-semibold bg-emerald-600/80"
                    >
                      Dashboard
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleNavigate('/login')}
                        className="w-full py-3 rounded-xl text-white font-semibold dropdown-shadow-sm hover:bg-white/10"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => handleNavigate('/signup')}
                        className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-emerald-500 to-teal-500"
                      >
                        Get Started
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </HeaderNirvahaRectContext.Provider>
  );
};

export default Header;