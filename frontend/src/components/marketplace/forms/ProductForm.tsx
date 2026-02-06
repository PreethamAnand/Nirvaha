import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ProductFormProps {
  onSubmit: (formData: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: '',
    price: '',
    certification: '',
    manufacturingDetails: '',
    category: 'Other',
    stockAvailability: 'In Stock',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.images.trim()) newErrors.images = 'Image URL is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    
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
      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Crystal Healing Set"
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.name ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.name ? undefined : "#1a5d47",
            color: "#0f131a"
          }}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the product features and benefits..."
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

      {/* Images Upload */}
      <div>
        <label htmlFor="images" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Images Upload (URL) *
        </label>
        <input
          type="text"
          id="images"
          name="images"
          value={formData.images}
          onChange={handleChange}
          placeholder="Image URL or multiple URLs separated by commas"
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.images ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.images ? undefined : "#1a5d47",
            color: "#0f131a"
          }}
        />
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
      </div>

      {/* Price */}
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
          placeholder="e.g., 89"
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

      {/* Certification Details */}
      <div>
        <label htmlFor="certification" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Certification Details (optional)
        </label>
        <textarea
          id="certification"
          name="certification"
          value={formData.certification}
          onChange={handleChange}
          placeholder="e.g., Certified organic, Fair trade, etc."
          rows={2}
          className="w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent"
          style={{
            borderColor: "#1a5d47",
            color: "#0f131a"
          }}
        />
      </div>

      {/* Manufacturing Details */}
      <div>
        <label htmlFor="manufacturingDetails" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Manufacturing Details (optional)
        </label>
        <textarea
          id="manufacturingDetails"
          name="manufacturingDetails"
          value={formData.manufacturingDetails}
          onChange={handleChange}
          placeholder="e.g., Handcrafted in Bali, Eco-friendly materials..."
          rows={2}
          className="w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:border-transparent"
          style={{
            borderColor: "#1a5d47",
            color: "#0f131a"
          }}
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent"
          style={{
            borderColor: "#1a5d47",
            color: "#0f131a"
          }}
        >
          <option value="Crystals">Crystals</option>
          <option value="Sound Healing">Sound Healing</option>
          <option value="Meditation">Meditation</option>
          <option value="Aromatherapy">Aromatherapy</option>
          <option value="Spiritual Tools">Spiritual Tools</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Stock Availability */}
      <div>
        <label htmlFor="stockAvailability" className="block text-sm font-semibold mb-2" style={{ color: "#0f131a" }}>
          Stock Availability
        </label>
        <select
          id="stockAvailability"
          name="stockAvailability"
          value={formData.stockAvailability}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent"
          style={{
            borderColor: "#1a5d47",
            color: "#0f131a"
          }}
        >
          <option value="In Stock">In Stock</option>
          <option value="Limited Stock">Limited Stock</option>
          <option value="Pre-Order">Pre-Order</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full mt-6 py-3 text-white font-semibold rounded-[20px] hover:shadow-xl transition-all text-lg"
        style={{ backgroundColor: "#1a5d47" }}
      >
        Create Product
      </motion.button>
    </form>
  );
};

export default ProductForm;

