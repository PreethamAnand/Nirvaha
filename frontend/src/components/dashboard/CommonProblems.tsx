import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Moon, Zap, Activity, Users, Flame, X, Play, Headphones, MessageCircle, Calendar, Check } from 'lucide-react';
import { useState } from 'react';

export const CommonProblems = () => {
    const [modalProblem, setModalProblem] = useState<any | null>(null);

    const problems = [
        {
            title: "Burnout",
            icon: Flame,
            color: "text-orange-500",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            hoverBg: "hover:bg-orange-50",
            activeBg: "bg-orange-100",
            gradientFrom: "from-orange-500",
            gradientTo: "to-red-500",
            description: "Feeling exhausted and overwhelmed from work or life demands?",
            solutions: ["Practice daily meditation", "Set healthy boundaries", "Take regular breaks", "Engage in sound healing"],
            recommendations: [
                { icon: Headphones, text: "Stress Relief Meditation" },
                { icon: Play, text: "432 Hz Healing Frequency" },
                { icon: MessageCircle, text: "Talk to AI Companion" },
                { icon: Calendar, text: "Book 1:1 Session" }
            ]
        },
        {
            title: "Excess Stress",
            icon: Zap,
            color: "text-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            hoverBg: "hover:bg-yellow-50",
            activeBg: "bg-yellow-100",
            gradientFrom: "from-yellow-500",
            gradientTo: "to-orange-500",
            description: "Chronic stress can impact your health and productivity.",
            solutions: ["Breathing exercises", "Mindfulness practices", "Regular physical activity", "Connect with AI companion"],
            recommendations: [
                { icon: Headphones, text: "Guided Breathwork" },
                { icon: Play, text: "Nature Sounds" },
                { icon: MessageCircle, text: "Stress Management Chat" },
                { icon: Calendar, text: "Group Wellness Session" }
            ]
        },
        {
            title: "Sleep Issues",
            icon: Moon,
            color: "text-purple-500",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            hoverBg: "hover:bg-purple-50",
            activeBg: "bg-purple-100",
            gradientFrom: "from-purple-500",
            gradientTo: "to-indigo-500",
            description: "Quality sleep is essential for recovery and mental clarity.",
            solutions: ["Sleep meditation tracks", "Calming frequencies", "Evening routines", "Binaural beats"],
            recommendations: [
                { icon: Headphones, text: "Deep Sleep Meditation" },
                { icon: Play, text: "Delta Wave Music" },
                { icon: MessageCircle, text: "Sleep Hygiene Tips" },
                { icon: Calendar, text: "Sleep Coaching" }
            ]
        },
        {
            title: "High Anxiety",
            icon: Cloud,
            color: "text-blue-500",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            hoverBg: "hover:bg-blue-50",
            activeBg: "bg-blue-100",
            gradientFrom: "from-blue-500",
            gradientTo: "to-cyan-500",
            description: "Anxiety can feel overwhelming, but you can find peace.",
            solutions: ["Guided anxiety relief", "Grounding techniques", "Crystal bowl therapy", "Community support"],
            recommendations: [
                { icon: Headphones, text: "Grounding Exercise" },
                { icon: Play, text: "Crystal Bowl Therapy" },
                { icon: MessageCircle, text: "Anxiety Support Chat" },
                { icon: Calendar, text: "Relief Workshop" }
            ]
        },
        {
            title: "Mood Swings",
            icon: Activity,
            color: "text-pink-500",
            bgColor: "bg-pink-50",
            borderColor: "border-pink-200",
            hoverBg: "hover:bg-pink-50",
            activeBg: "bg-pink-100",
            gradientFrom: "from-pink-500",
            gradientTo: "to-rose-500",
            description: "Emotional fluctuations affect your daily life.",
            solutions: ["Chakra balancing", "Emotional regulation", "Journaling exercises", "Companion sessions"],
            recommendations: [
                { icon: Headphones, text: "Chakra Meditation" },
                { icon: Play, text: "Heart Frequencies" },
                { icon: MessageCircle, text: "Emotion Tracking" },
                { icon: Calendar, text: "Wellness Session" }
            ]
        },
        {
            title: "Feeling Isolated",
            icon: Users,
            color: "text-teal-500",
            bgColor: "bg-teal-50",
            borderColor: "border-teal-200",
            hoverBg: "hover:bg-teal-50",
            activeBg: "bg-teal-100",
            gradientFrom: "from-teal-500",
            gradientTo: "to-emerald-500",
            description: "Connection is a fundamental human need.",
            solutions: ["Join community groups", "Attend live sessions", "Connect with companions", "Group retreats"],
            recommendations: [
                { icon: Headphones, text: "Loving-Kindness Meditation" },
                { icon: Play, text: "Community Sound Bath" },
                { icon: MessageCircle, text: "Join Community Chat" },
                { icon: Calendar, text: "Meditation Circle" }
            ]
        },
    ];

    return (
        <section className="py-8 bg-white relative">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="text-center mb-8">
                    <motion.h2
                        className="text-2xl md:text-3xl font-bold text-[#0F131A] mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Most Common Problems
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {problems.map((p, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setModalProblem(p)}
                            className={`group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden bg-white border-gray-200 ${p.hoverBg} hover:shadow-xl hover:${p.borderColor}`}
                        >
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl ${p.bgColor} flex items-center justify-center transition-all group-hover:scale-110`}>
                                        <p.icon className={`w-6 h-6 ${p.color}`} />
                                    </div>
                                    <span className="text-lg font-semibold text-gray-900 group-hover:text-[#1a5d47] transition-colors">
                                        {p.title}
                                    </span>
                                </div>

                                <div className={`w-8 h-8 rounded-full ${p.bgColor} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                                    <svg className={`w-4 h-4 ${p.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Compact Rectangular Modal */}
            <AnimatePresence>
                {modalProblem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalProblem(null)}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-white rounded-2xl w-full max-w-xl max-h-[85vh] shadow-2xl overflow-hidden"
                        >
                            {/* Header with gradient bar */}
                            <div className={`h-3 bg-gradient-to-r ${modalProblem.gradientFrom} ${modalProblem.gradientTo}`} />

                            {/* X Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setModalProblem(null)}
                                className="absolute top-5 right-5 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </motion.button>

                            {/* Scrollable Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(85vh-12px)]">
                                {/* Title Section */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-xl ${modalProblem.bgColor} flex items-center justify-center`}>
                                        <modalProblem.icon className={`w-7 h-7 ${modalProblem.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{modalProblem.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{modalProblem.description}</p>
                                    </div>
                                </div>

                                {/* Solutions */}
                                <div className="mb-6">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                        How We Help
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {modalProblem.solutions.map((solution: string, sIdx: number) => (
                                            <div key={sIdx} className="flex items-center gap-2">
                                                <Check className={`w-5 h-5 ${modalProblem.color}`} />
                                                <span className="text-sm text-gray-600">{solution}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommendations Grid */}
                                <div className="mb-6">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                        Quick Actions
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {modalProblem.recommendations.map((rec: any, rIdx: number) => (
                                            <motion.button
                                                key={rIdx}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className={`flex items-center gap-3 p-3 rounded-xl ${modalProblem.bgColor} hover:${modalProblem.activeBg} transition-all text-left`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${modalProblem.gradientFrom} ${modalProblem.gradientTo} flex items-center justify-center`}>
                                                    <rec.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{rec.text}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setModalProblem(null)}
                                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
                                    >
                                        Close
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex-1 py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${modalProblem.gradientFrom} ${modalProblem.gradientTo} hover:shadow-lg transition-all`}
                                    >
                                        Start Journey
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
