import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  beforeText: string;
  afterText: string;
  placeholder: string;
  type: string;
}

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const questions: Question[] = [
    {
      id: "name",
      beforeText: "Hello! My name is",
      afterText: "and I'm excited to connect with you.",
      placeholder: "your name",
      type: "text"
    },
    {
      id: "email",
      beforeText: "You can reach me at",
      afterText: "for further communication.",
      placeholder: "your email",
      type: "email"
    },
    {
      id: "company",
      beforeText: "I represent",
      afterText: "and we're interested in your services.",
      placeholder: "your company",
      type: "text"
    },
    {
      id: "message",
      beforeText: "I'd like to discuss",
      afterText: "with your team.",
      placeholder: "your requirements",
      type: "textarea"
    }
  ];

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const handleNext = () => {
    const currentValue = formData[currentQuestion.id as keyof typeof formData];
    if (!currentValue.trim()) return;
    if (isLastStep) handleSubmit();
    else setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentStep(0);
        setFormData({ name: "", email: "", company: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (value: string) => {
    setFormData(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentQuestion.type !== 'textarea') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section className="relative py-10 px-6 lg:px-12 bg-white overflow-hidden">
      {/* Import Sleek Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playball&family=Poppins:wght@300;400;600;700&display=swap');
        .cursive-sleek { font-family: 'Playball', cursive; }
      `}</style>

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full lg:w-[45%] lg:max-w-md"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] group">
              <img
                src="/contact-peace.png"
                alt="Meditation Peace"
                className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Form Side */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="mb-8 text-left space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F131A] tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                Connect with <span className="text-[#1a5d47]">Us</span>
              </h2>
              <p className="text-lg text-[#595e67] font-light max-w-lg leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Reach out to begin your transformation.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-10"
                >
                  <div className="flex flex-col items-start space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#1a5d47] flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0c3328] mb-1" style={{ fontFamily: "'Cinzel', serif" }}>Message Received</h3>
                      <p className="text-lg text-[#595e67] leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        A guide will be in touch shortly.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="text-xl md:text-2xl lg:text-3xl leading-snug text-left">
                    <span className="cursive-sleek text-black text-3xl lg:text-4xl block mb-2 font-medium">
                      {currentQuestion.beforeText}
                    </span>

                    <div className="relative inline-block w-full max-w-sm my-2">
                      {currentQuestion.id === 'message' ? (
                        <textarea
                          value={formData[currentQuestion.id as keyof typeof formData]}
                          onChange={(e) => handleChange(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder={currentQuestion.placeholder}
                          className="w-full px-0 py-2 focus:outline-none transition-all duration-300 text-xl lg:text-2xl font-semibold border-b-2 border-dotted border-[#1a5d47] focus:border-solid bg-transparent text-left placeholder:opacity-30"
                          style={{ color: '#1a5d47', fontFamily: "'Poppins', sans-serif" }}
                          rows={1}
                          autoFocus
                        />
                      ) : (
                        <input
                          type={currentQuestion.type}
                          value={formData[currentQuestion.id as keyof typeof formData]}
                          onChange={(e) => handleChange(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder={currentQuestion.placeholder}
                          className="w-full px-0 py-2 focus:outline-none transition-all duration-300 text-xl lg:text-2xl font-semibold border-b-2 border-dotted border-[#1a5d47] focus:border-solid bg-transparent text-left placeholder:opacity-30"
                          style={{ color: '#1a5d47', fontFamily: "'Poppins', sans-serif" }}
                          autoFocus
                        />
                      )}
                    </div>

                    <span className="cursive-sleek text-black text-3xl lg:text-4xl block mt-2 font-medium">
                      {currentQuestion.afterText}
                    </span>
                  </div>

                  {/* Nav Buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="px-6 py-2.5 rounded-full font-semibold text-[#595e67] border-2 border-gray-100 hover:border-[#1a5d47]/20 transition-all duration-300"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Back
                      </button>
                    )}
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      disabled={!formData[currentQuestion.id as keyof typeof formData].trim() || isSubmitting}
                      className="px-10 py-4 bg-[#1a5d47] text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <span>{isLastStep ? (isSubmitting ? 'Sending...' : 'Connect Now') : 'Next Step'}</span>
                      {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
