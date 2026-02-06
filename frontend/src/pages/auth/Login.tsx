// Login.tsx
import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  Sparkles,
  User,
  Users,
  Stethoscope,
  Settings,
} from "lucide-react";

interface UserData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const defaultValues: UserData = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<UserData>(defaultValues);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Sample credentials path without backend
      if (userData.email === "login1@gmail.com" && userData.password === "login123") {
        const sampleUser = {
          id: "sample-user",
          email: userData.email,
          name: "Sample User",
          role: "user",
          profile: {
            mobile: "",
            age: "",
            gender: "",
            address: "",
            education: "",
            healthCondition: "",
          }
        };
        login(sampleUser);
        localStorage.setItem("token", "sample-token");
        navigate("/dashboard");
        return;
      }

      // Sample admin credentials
      if (userData.email === "admin1@gmail.com" && userData.password === "admin123") {
        const adminUser = {
          id: "sample-admin",
          email: userData.email,
          name: "Sample Admin",
          role: "admin",
          profile: {
            mobile: "",
            age: "",
            gender: "",
            address: "",
            education: "",
            healthCondition: "",
          }
        };
        login(adminUser);
        localStorage.setItem("token", "sample-admin-token");
        navigate("/admin");
        return;
      }

      // Fallback to backend login
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user);
      localStorage.setItem("token", data.token);

      // After successful login, redirect based on user role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  // Quick guest login for local development
  const handleGuestLogin = () => {
    const guestUser = {
      id: "guest",
      email: "guest@local",
      name: "Guest User",
      role: "user",
      profile: {
        mobile: "",
        age: "",
        gender: "",
        address: "",
        education: "",
        healthCondition: "",
      }
    };
    login(guestUser);
    localStorage.setItem("token", "guest-token");
    navigate("/dashboard");
  };

  // Quick guest admin login for testing admin features
  const handleGuestAdminLogin = () => {
    const guestAdminUser = {
      id: "guest-admin",
      email: "admin@local",
      name: "Guest Admin",
      role: "admin",
      profile: {
        mobile: "",
        age: "",
        gender: "",
        address: "",
        education: "",
        healthCondition: "",
      }
    };
    login(guestAdminUser);
    localStorage.setItem("token", "guest-admin-token");
    navigate("/admin");
  };

  // Login page images from public/login page images/ directory - encode spaces so browser can load
  const loginFolder = '/login page images/';
  const loginFiles = ['lo1.webp',
    'lo2.webp',
    'lo3.webp',
    'lo4.webp',
    'lo5.webp',
    'lo6.webp',
    'lo7.webp',
    'lo8.webp',
    'lo9.webp',
    'lo10.webp',
    'lo11.webp',
    'lo12.webp',
    'lo13.webp',
    'lo14.webp',
    'lo15.webp',
    'lo16.webp',
    'lo17.webp',
    'lo18.webp',
    'lo19.webp',
    'lo20.webp',
    'lo21.webp',
    'lo22.webp',
    'lo23.webp',
    'lo24.webp',
    'lo25.webp',
    'lo26.webp',
    'lo27.webp',
    'lo28.webp',
    'lo29.webp',
    'lo30.webp',
    'lo31.webp',
    'lo32.webp',
    'lo33.webp',
    'lo34.webp',
    'lo35.webp',
    'lo36.webp',
    'lo37.webp',
    'lo38.webp',
  ];

  const loginImages = loginFiles.map((f) => encodeURI(loginFolder + f));


  return (
    <div className="login-container">
      {/* Logo */}
      <div className="logo-container">
        <a href="/" className="inline-block">
          <img
            src="/logo.webp"
            alt="Nirvaha Logo"
            className="h-16 w-16 object-contain rounded-xl cursor-pointer drop-shadow-lg hover:glow-teal transition-all duration-300 hover:scale-105"
          />
        </a>
      </div>

      {/* Static Login Page Images Background - Grid Layout with Varying Sizes */}
      <div className="login-grid">
        {(() => {
          // Create varying sizes for visual interest (similar to Canva reference) - increased by 10%
          // Base row size is 110px, so spans calculate from that
          const sizeVariations = [
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 2', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 2' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 2', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 2' },
            { gridRow: 'span 2', gridColumn: 'span 2' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 2', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 2' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
            { gridRow: 'span 2', gridColumn: 'span 1' },
            { gridRow: 'span 1', gridColumn: 'span 1' },
          ];

          // Generate enough tiles to fill the entire viewport plus extra for scrolling
          // Calculate based on typical viewport: ~20 columns × ~15 rows = 300+ tiles
          const cellsNeeded = 400;
          const tiles = [];

          for (let i = 0; i < cellsNeeded; i++) {
            const imgIndex = i % loginImages.length;
            const sizeIndex = i % sizeVariations.length;
            const size = sizeVariations[sizeIndex];

            tiles.push(
              <div
                key={i}
                className="relative"
                style={{
                  // filter: 'blur(0.5px)',
                  gridRow: size.gridRow,
                  gridColumn: size.gridColumn,
                  margin: '0',
                  padding: '0',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <img
                  src={loginImages[imgIndex]}
                  alt={`Login background ${imgIndex + 1}`}
                  className="w-full h-full"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    display: 'block',
                  }}
                />
              </div>
            );
          }

          return tiles;
        })()}
      </div>

      {/* Dark Overlay for better contrast */}
      <div
        className="absolute inset-0 w-full h-full bg-black/40"
      />

      {/* Login Modal Container - Modern Style */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-auto rounded-2xl p-8 sm:p-10 transition-all duration-300 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1
            className="text-3xl font-semibold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
          >
            Welcome Back
          </h1>
          <p
            className="text-sm mb-6 text-gray-300"
          >
            Sign in to continue your spiritual wellness journey
          </p>
        </motion.div>

        {/* Login Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Mail
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 transition-all duration-300 focus:outline-none focus:border-emerald-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400/20"
              required
            />
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Lock
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 transition-all duration-300 focus:outline-none focus:border-emerald-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400/20"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 text-base font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span className="relative z-10">Continue</span>
              </>
            )}
          </motion.button>

          {/* Guest login removed */}
        </form>

        {/* Dev Login Button - No Auth */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-3 px-6 text-base font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300 bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-emerald-400/50"
          >
            <Settings className="h-4 w-4" />
            <span>Dev Login (Skip Auth)</span>
          </button>
        </motion.div>

        {/* Separator */}
        <motion.div
          className="text-center my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="text-gray-500 text-xs">OR</span>
        </motion.div>

        {/* Create Account Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-gray-300 hover:text-emerald-400 transition-all duration-300 hover:underline"
          >
            Don't have an account? Sign up here
          </button>
        </motion.div>
      </motion.div>

      {/* Simple Footer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-6 py-4 text-center text-gray-400 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#"
            className="hover:text-emerald-400 transition-colors"
          >
            Privacy policy
          </a>
          <span>|</span>
          <a
            href="#"
            className="hover:text-emerald-400 transition-colors"
          >
            Terms
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
