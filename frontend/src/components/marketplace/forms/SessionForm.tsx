import React, { useState } from 'react';

interface SessionFormProps {
  onSubmit: (formData: any) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    description: '',
    platform: '',
    link: '',
    startDate: '',
    startTime: '',
    timeZone: '',
    duration: '',
    host: '',
    image: '',
    isPaid: false,
    price: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.platform.trim()) newErrors.platform = 'Platform is required';
    if (!formData.link.trim()) newErrors.link = 'Joining link is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.timeZone.trim()) newErrors.timeZone = 'Time zone is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.host.trim()) newErrors.host = 'Host/facilitator is required';
    if (!formData.image.trim()) newErrors.image = 'Cover image URL is required';
    if (formData.isPaid && !formData.price.trim()) newErrors.price = 'Price is required for paid sessions';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Session Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Live Breathwork Reset"
            className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
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
          <label htmlFor="host" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Host / Facilitator *
          </label>
          <input
            type="text"
            id="host"
            name="host"
            value={formData.host}
            onChange={handleChange}
            placeholder="Name and role"
            className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.host ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.host ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.host && <p className="text-red-500 text-sm mt-1">{errors.host}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
          Short Summary *
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          rows={2}
          placeholder="A crisp two-line promise for the session"
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.summary ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.summary ? undefined : '#1a5d47',
            color: '#0f131a',
          }}
        />
        {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
          Full Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="What participants will experience, format, what to prepare..."
          className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
            errors.description ? 'border-red-500' : ''
          }`}
          style={{
            borderColor: errors.description ? undefined : '#1a5d47',
            color: '#0f131a',
          }}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="platform" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Platform *
          </label>
          <input
            type="text"
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            placeholder="Zoom, Google Meet, etc."
            className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.platform ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.platform ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform}</p>}
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Joining Link *
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Paste meeting URL"
            className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.link ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.link ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Cover Image URL *
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Hero image for the session"
            className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.image ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.image ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Date *
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.startDate ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.startDate ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div>

        <div>
          <label htmlFor="startTime" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Start Time *
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.startTime ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.startTime ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
        </div>

        <div>
          <label htmlFor="timeZone" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Time Zone *
          </label>
          <input
            type="text"
            id="timeZone"
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
            placeholder="e.g., GMT, PST, IST"
            className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.timeZone ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.timeZone ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.timeZone && <p className="text-red-500 text-sm mt-1">{errors.timeZone}</p>}
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Duration *
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 90 minutes"
            className={`w-full px-4 py-3 border rounded-[16px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.duration ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.duration ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-[20px]" style={{ backgroundColor: '#f0f5f3' }}>
        <input
          type="checkbox"
          id="isPaid"
          name="isPaid"
          checked={formData.isPaid}
          onChange={handleChange}
          className="w-5 h-5 rounded-md border-gray-300"
        />
        <label htmlFor="isPaid" className="text-sm font-semibold" style={{ color: '#0f131a' }}>
          Paid session
        </label>
      </div>

      {formData.isPaid && (
        <div>
          <label htmlFor="price" className="block text-sm font-semibold mb-2" style={{ color: '#0f131a' }}>
            Price (USD) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 39"
            step="0.01"
            className={`w-full px-4 py-3 border rounded-[20px] focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.price ? 'border-red-500' : ''
            }`}
            style={{
              borderColor: errors.price ? undefined : '#1a5d47',
              color: '#0f131a',
            }}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
      )}

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="mt-2 px-6 py-3 text-white font-semibold rounded-[20px] hover:shadow-xl transition-all text-lg"
          style={{ backgroundColor: '#1a5d47' }}
        >
          Publish Session
        </button>
      </div>
    </form>
  );
};

export default SessionForm;

