import React, { useEffect } from 'react';
import CommunityHero from '../components/landing/CommunityHero';
import TrustedStats from '../components/landing/TrustedStats';
import LibraryCarousel from '../components/landing/LibraryCarousel';
import GoldenShowcase from '../components/landing/GoldenShowcase';
import WhatIsNirvaha from '../components/landing/WhatIsNirvaha';
import AncientWisdomSection from '../components/landing/AncientWisdomSection';
import LeadershipHeroSection from '../components/landing/LeadershipHeroSection';
import DifferentPathsSection from '../components/landing/DifferentPathsSection';
import CollaboratorsSection from '../components/landing/CollaboratorsSection';
import Contact from '../components/landing/Contact';
import ClosingSection from '../components/landing/ClosingSection';
import Header from '../components/landing/Header';
import SEOHead from '../components/common/SEOHead';

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Force scroll to top on refresh
    window.scrollTo(0, 0);

    // Fade-up animation on scroll
    const elements = document.querySelectorAll<HTMLElement>('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title="Nirvaha"
        description="Transform your mental wellness with Nirvaha's AI-powered emotional healing platform. Combining ancient spiritual wisdom with modern therapy, meditation, and professional counseling services for complete holistic healing."
        keywords="mental wellness, AI therapy, meditation, holistic healing, emotional support, spiritual wellness, Bhagavad Gita, modern therapy, mindfulness, stress relief, anxiety treatment, depression help, corporate wellness, mental health app"
        canonical="https://nirvaha.org"
      />
      <Header />
      <main>
        <CommunityHero />
        <TrustedStats />
        <GoldenShowcase />
        <WhatIsNirvaha />
        <LibraryCarousel />
        <AncientWisdomSection />
        <LeadershipHeroSection />
        <DifferentPathsSection />
        <CollaboratorsSection />
      </main>
      <Contact />
      <ClosingSection />
    </div>
  );
};

export default LandingPage;
