import React from 'react';

const partners = [
  { image: "/feat/f1.jpeg", name: "Global Wellness" },
  { image: "/colab/c1.jpeg", name: "Mindful Space" },
  { image: "/supp/s1.jpg", name: "Innovation Hub" },
  { image: "/colab/c2.jpeg", name: "Serenity Studio" },
  { image: "/feat/f2.jpeg", name: "Core Health" },
  { image: "/colab/c3.jpeg", name: "Zen Masters" },
  { image: "/supp/s2.png", name: "Future Tech" },
  { image: "/colab/c4.jpeg", name: "Peace Path" },
  { image: "/feat/f3.png", name: "Wellness Wave" },
  { image: "/colab/c5.jpeg", name: "Spirit Soul" },
  { image: "/feat/f4.png", name: "Impact Lab" },
  { image: "/colab/c6.jpeg", name: "Inner Light" },
  { image: "/feat/f1.jpeg", name: "Strategic Ally" },
  { image: "/colab/c1.jpeg", name: "Healing Touch" },
];

const CollaboratorsSection: React.FC = () => {
  return (
    <section className="pt-4 pb-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F131A] tracking-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Collaborators & <span className="text-[#1a5d47]">Partners</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white border border-[#edf2f7] rounded-md aspect-[1.8/1] flex items-center justify-center p-2 group transition-all duration-300 hover:border-t-2 hover:border-t-[#1a5d47] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full h-full object-contain mix-blend-multiply transition-all duration-500"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${partner.name}&background=ffffff&color=1a5d47&bold=true`; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
