import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface CompanionApplicationModalProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const CompanionApplicationModal: React.FC<CompanionApplicationModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: '',
    bio: '',
    experience: '',
    location: '',
    languages: '',
    specialties: '',
    certifications: '',
    hourlyRate: '',
    callRate: '',
    availability: 'full-time',
    profileImage: '',
    coverImage: '',
    website: '',
    socialLinks: '',
    whyJoin: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleEscape, handleClickOutside]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.title.trim()) newErrors.title = 'Professional title is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.languages.trim()) newErrors.languages = 'Languages are required';
    if (!formData.specialties.trim()) newErrors.specialties = 'Specialties are required';
    if (!formData.hourlyRate.trim()) newErrors.hourlyRate = 'Hourly rate is required';
    if (!formData.callRate.trim()) newErrors.callRate = 'Call rate is required';
    if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Please tell us why you want to join';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-6">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl mx-4 relative max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white z-10 px-8 pt-8 pb-4 border-b border-gray-200 rounded-t-[32px]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: '#0f131a' }}>
                Become a Companion
              </h2>
              <p className="text-sm mt-1" style={{ color: '#595b67' }}>
                Share your wisdom and help seekers on their spiritual journey
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" style={{ color: '#595b67' }} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#0f131a' }}>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.fullName ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.email ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.phone ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.location ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.location ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#0f131a' }}>
              Professional Details
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Professional Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Mindfulness & Meditation Expert"
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.title ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Professional Bio *
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your experience and approach..."
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.bio ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.bio ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., 10+ years"
                    className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                      errors.experience ? 'border-red-500' : ''
                    }`}
                    style={{
                      borderColor: errors.experience ? undefined : '#1a5d47',
                      color: '#0f131a',
                    }}
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>

                <div>
                  <label htmlFor="languages" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                    Languages *
                  </label>
                  <input
                    type="text"
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    placeholder="e.g., English, Hindi, Spanish"
                    className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                      errors.languages ? 'border-red-500' : ''
                    }`}
                    style={{
                      borderColor: errors.languages ? undefined : '#1a5d47',
                      color: '#0f131a',
                    }}
                  />
                  {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="specialties" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Specialties *
                </label>
                <input
                  type="text"
                  id="specialties"
                  name="specialties"
                  value={formData.specialties}
                  onChange={handleChange}
                  placeholder="e.g., Breath Work, Chakra Healing, Stress Management"
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.specialties ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.specialties ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.specialties && <p className="text-red-500 text-sm mt-1">{errors.specialties}</p>}
              </div>

              <div>
                <label htmlFor="certifications" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Certifications (Optional)
                </label>
                <textarea
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  rows={2}
                  placeholder="List your relevant certifications..."
                  className="w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#1a5d47',
                    color: '#0f131a',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Availability */}
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#0f131a' }}>
              Pricing & Availability
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Hourly Rate (USD) *
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="60"
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.hourlyRate ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.hourlyRate ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
              </div>

              <div>
                <label htmlFor="callRate" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Per Call Rate (USD) *
                </label>
                <input
                  type="number"
                  id="callRate"
                  name="callRate"
                  value={formData.callRate}
                  onChange={handleChange}
                  placeholder="25"
                  className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                    errors.callRate ? 'border-red-500' : ''
                  }`}
                  style={{
                    borderColor: errors.callRate ? undefined : '#1a5d47',
                    color: '#0f131a',
                  }}
                />
                {errors.callRate && <p className="text-red-500 text-sm mt-1">{errors.callRate}</p>}
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#1a5d47',
                    color: '#0f131a',
                  }}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>

          {/* Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#0f131a' }}>
              Media & Links (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profileImage" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Profile Image URL
                </label>
                <input
                  type="url"
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#1a5d47',
                    color: '#0f131a',
                  }}
                />
              </div>

              <div>
                <label htmlFor="coverImage" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#1a5d47',
                    color: '#0f131a',
                  }}
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#1a5d47',
                    color: '#0f131a',
                  }}
                />
              </div>

              <div>
                <label htmlFor="socialLinks" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                  Social Links
                </label>
                <input
                  type="text"
                  id="socialLinks"
                  name="socialLinks"
                  value={formData.socialLinks}
                  onChange={handleChange}
                  placeholder="Instagram, LinkedIn, etc."
                  className="w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#1a5d47',
                    color: '#0f131a',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Why Join */}
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#0f131a' }}>
              Additional Information
            </h3>
            <div>
              <label htmlFor="whyJoin" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
                Why do you want to become a companion? *
              </label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                rows={4}
                placeholder="Share your motivation and how you can help seekers..."
                className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 ${
                  errors.whyJoin ? 'border-red-500' : ''
                }`}
                style={{
                  borderColor: errors.whyJoin ? undefined : '#1a5d47',
                  color: '#0f131a',
                }}
              />
              {errors.whyJoin && <p className="text-red-500 text-sm mt-1">{errors.whyJoin}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-6 py-3 border-2 rounded-[16px] font-semibold transition-all"
              style={{ color: '#0f131a', borderColor: '#1a5d47' }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 text-white rounded-[16px] font-semibold transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#1a5d47' }}
            >
              Submit Application
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CompanionApplicationModal;
