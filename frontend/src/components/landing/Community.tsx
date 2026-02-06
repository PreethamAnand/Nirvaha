import { motion } from 'motion/react';
import { Users, Calendar, MessageCircle, Globe } from 'lucide-react';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const Community = () => {
  // Unified green gradient with darker green
  const themeGradient = "bg-gradient-to-r from-[#2f4a3c] via-[#7fb3a1] to-[#a7f3d0]";

  return (
    <section id="community" className="min-h-[80vh] px-4 py-16 flex items-center relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20 fade-up relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          <h2 className="heading-secondary text-center mb-5" style={{ color: '#1a5d47', fontFamily: "'Cinzel', serif" }}>
            Join Our Healing Community
          </h2>
          <p className="subheading text-center max-w-3xl mx-auto" style={{ color: '#4a5f59', fontFamily: "'Poppins', sans-serif" }}>
            Connect with like-minded individuals, participate in healing circles, and grow together.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12"
        >
          {[
            { icon: Users, number: '1,000+', label: 'Active Members' },
            { icon: MessageCircle, number: '50,000+', label: 'Support Messages' },
            { icon: Calendar, number: '200+', label: 'Monthly Events' },
            { icon: Globe, number: '2+', label: 'Countries' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-8 text-center bg-white rounded-3xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 border"
              style={{ borderColor: '#a7f3d0' }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 ${themeGradient} rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white w-6 h-6" />
              </div>
              <p className="text-2xl font-bold" style={{ color: '#2f4a3c' }}>{stat.number}</p>
              <p style={{ color: '#4a5f59' }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Events + Features */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >



        </motion.div>
      </motion.div>
    </section>
  );
};

export default Community;
