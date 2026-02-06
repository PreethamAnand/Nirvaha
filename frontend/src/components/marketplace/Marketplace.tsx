import React, { useState } from 'react';
import Card from './Card';

type ActiveTab = "sessions" | "products" | "retreats";

type ServiceCard = {
  key: string;
  title: string;
  summary: string;
  description: string;
  link: string;
  image: string;
};

interface MarketplaceProps {
  sessions: ServiceCard[];
  products: ServiceCard[];
  retreats: ServiceCard[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onAddClick: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({
  sessions,
  products,
  retreats,
  activeTab,
  setActiveTab,
  onAddClick,
}) => {
  const renderCards = () => {
    let data: ServiceCard[] = [];
    switch (activeTab) {
      case "sessions":
        data = sessions;
        break;
      case "products":
        data = products;
        break;
      case "retreats":
        data = retreats;
        break;
      default:
        data = sessions;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {data.map((card) => (
          <Card key={card.key} {...card} />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl w-[95%] mx-auto px-4 sm:px-6 lg:px-8 fade-up">
        <div className="mb-12 text-center">
          <h2 className="heading-secondary text-teal-800 text-center">
            Explore Our Offerings
          </h2>
          <p className="subheading text-center text-teal-700 max-w-3xl mx-auto mt-3">
            Discover our sessions, retreats, and products designed for your holistic well-being.
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("sessions")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "sessions"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-teal-800 hover:bg-gray-300"
            }`}
          >
            Sessions
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "products"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-teal-800 hover:bg-gray-300"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("retreats")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "retreats"
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-teal-800 hover:bg-gray-300"
            }`}
          >
            Retreats
          </button>
          <button
            onClick={onAddClick}
            className="px-6 py-2 rounded-full bg-yellow-500 text-teal-900 font-semibold hover:bg-yellow-600 transition-colors"
          >
            Add New
          </button>
        </div>

        {renderCards()}
      </div>
    </section>
  );
};

export default Marketplace;

