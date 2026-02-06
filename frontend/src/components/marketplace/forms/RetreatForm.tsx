import React, { useState } from 'react';
import { motion } from 'motion/react';

interface RetreatFormProps {
  onSubmit: (formData: any) => void;
}

const RetreatForm: React.FC<RetreatFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    facilitator: '',
    location: '',
    startDate: '',
    endDate: '',
    accommodation: '',
    capacity: '',
    isPaid: false,
    price: '',
    pricingTier: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.facilitator.trim()) newErrors.facilitator = 'Facilitator/Guest details required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.accommodation.trim()) newErrors.accommodation = 'Accommodation details required';
    if (!formData.capacity.trim()) newErrors.capacity = 'Capacity is required';
    if (formData.isPaid && !formData.price.trim()) newErrors.price = 'Price is required for paid retreats';
    
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Event Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Event Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Himalayan Meditation Retreat"
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.title ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.title ? undefined : "#1a5d47",
            color: "#0f131a",
            focusRing: "#1a5d47"
          }}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Event Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the retreat experience and highlights..."
          rows={3}
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.description ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.description ? undefined : "#1a5d47",
            color: "#0f131a"
          }}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Facilitator */}
      <div>
        <label htmlFor="facilitator" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Guest / Facilitator Details *
        </label>
        <textarea
          id="facilitator"
          name="facilitator"
          value={formData.facilitator}
          onChange={handleChange}
          placeholder="Name, bio, and background of the facilitator..."
          rows={2}
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.facilitator ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.facilitator ? undefined : "#1a5d47",
            color: "#0f131a"
          }}
        />
        {errors.facilitator && <p className="text-red-500 text-sm mt-1">{errors.facilitator}</p>}
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Location *
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Rishikesh, India"
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.location ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.location ? undefined : "#1a5d47",
            color: "#0f131a"
          }}
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
      </div>

      {/* Start and End Date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
            Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.startDate ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.startDate ? undefined : "#1a5d47",
              color: "#0f131a"
            }}
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
            End Date *
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.endDate ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.endDate ? undefined : "#1a5d47",
              color: "#0f131a"
            }}
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
        </div>
      </div>

      {/* Accommodation */}
      <div>
        <label htmlFor="accommodation" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Accommodation Details *
        </label>
        <input
          type="text"
          id="accommodation"
          name="accommodation"
          value={formData.accommodation}
          onChange={handleChange}
          placeholder="e.g., Shared Ashram, Eco-resort, Villa Stay"
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.accommodation ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.accommodation ? undefined : "#1a5d47",
            color: "#0f131a"
          }}
        />
        {errors.accommodation && <p className="text-red-500 text-sm mt-1">{errors.accommodation}</p>}
      </div>

      {/* Capacity */}
      <div>
        <label htmlFor="capacity" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Capacity *
        </label>
        <input
          type="text"
          id="capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="e.g., 50 participants"
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.capacity ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.capacity ? undefined : "#1a5d47",
            color: "#0f131a"
          }}
        />
        {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
      </div>

      {/* Paid / Free Toggle */}
      <div className="flex items-center gap-3 p-4 rounded-[20px]" style={{ backgroundColor: "#f0f5f3" }}>
        <input
          type="checkbox"
          id="isPaid"
          name="isPaid"
          checked={formData.isPaid}
          onChange={handleChange}
          className="w-5 h-5 rounded-md border-gray-300"
        />
        <label htmlFor="isPaid" className="text-sm font-semibold" style={{ color: "#0f131a" }}>
          Paid Retreat
        </label>
      </div>

      {/* Price (conditional) */}
      {formData.isPaid && (
        <div>
          <label htmlFor="price" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
            Price (USD) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 1299"
            step="0.01"
            className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.price ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.price ? undefined : "#1a5d47",
              color: "#0f131a"
            }}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
      )}

      {/* Pricing Tiers (for paid retreats) */}
      {formData.isPaid && (
        <div>
          <label htmlFor="pricingTier" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
            Pricing Tiers (optional)
          </label>
          <textarea
            id="pricingTier"
            name="pricingTier"
            value={formData.pricingTier}
            onChange={handleChange}
            placeholder="e.g., Standard: $1299, Deluxe: $1799, Premium: $2399"
            rows={2}
            className="w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent"
            style={{
              borderColor: "#1a5d47",
              color: "#0f131a"
            }}
          />
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full mt-6 py-3 text-white font-semibold rounded-[20px] hover:shadow-xl transition-all text-lg"
        style={{ backgroundColor: "#1a5d47" }}
      >
        Create Retreat
      </motion.button>
    </form>
  );
};

export default RetreatForm;

