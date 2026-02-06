import React from 'react';
import { useNavigate } from 'react-router-dom';

export type ServiceCard = {
  key: string;
  title: string;
  summary: string;
  description: string;
  link: string;
  image: string;
};

const Card: React.FC<ServiceCard> = ({ title, summary, description, link, image }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-[2.5rem] bg-white/95 border border-yellow-200/60 shadow-2xl p-10 sm:p-14 lg:p-20 flex flex-col h-full">
      <div className="rounded-3xl bg-[#FFF1B8] border border-yellow-300/60 h-60 sm:h-72 lg:h-80 shadow-xl overflow-hidden mb-8">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="heading-tertiary text-teal-800 mb-3">
        {title}
      </h3>
      <p className="text-teal-700 text-lg sm:text-xl mb-3 leading-relaxed font-semibold flex-grow">
        {summary}
      </p>
      <p className="text-teal-600 text-base sm:text-lg mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex justify-end mt-auto">
        <button
          onClick={() => navigate(link)}
          className="px-6 py-3 rounded-full text-[#0A0F0F] bg-gradient-to-r from-[#fff] to-[#fff] border border-yellow-300/60 hover:shadow-[0_0_24px_rgba(255,210,96,0.35)] transition-all cursor-pointer font-semibold"
        >
          Explore →
        </button>
      </div>
    </div>
  );
};

export default Card;

