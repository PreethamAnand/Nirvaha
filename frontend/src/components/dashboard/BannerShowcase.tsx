import { useEffect, useMemo, useState } from "react";
import { getMeditations, getSounds, type MeditationItem, type SoundItem } from "@/lib/contentApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BannerShowcaseProps = {
  meditations?: MeditationItem[];
  sounds?: SoundItem[];
};

export function BannerShowcase({ meditations: propMeditations, sounds: propSounds }: BannerShowcaseProps = {}) {
  const [meditations, setMeditations] = useState<MeditationItem[]>(propMeditations || []);
  const [sounds, setSounds] = useState<SoundItem[]>(propSounds || []);
  const [isLoading, setIsLoading] = useState(!propMeditations && !propSounds);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Only fetch if props not provided
    if (propMeditations && propSounds) {
      setMeditations(propMeditations);
      setSounds(propSounds);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        const meditationData = propMeditations || await getMeditations();
        const soundData = propSounds || await getSounds();
        
        if (isMounted) {
          setMeditations(meditationData);
          setSounds(soundData);
        }
      } catch (error) {
        // Handle error silently - component will show empty state
        console.error("Failed to load banners:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [propMeditations, propSounds]);

  const banners = useMemo(() => {
    const activeMeditations = meditations
      .filter((m) => m.status === "Active" && m.bannerUrl)
      .map((m) => ({ ...m, type: "meditation" as const }));

    const activeSounds = sounds
      .filter((s) => s.status === "Active" && s.bannerUrl)
      .map((s) => ({ ...s, type: "sound" as const }));

    return [...activeMeditations, ...activeSounds];
  }, [meditations, sounds]);

  const currentBanner = banners[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, banners.length - 1) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500">Loading banners...</p>
        </div>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section className="py-12 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-3xl bg-white/50 backdrop-blur-sm p-8 text-center border border-emerald-200">
            <p className="text-gray-600 mb-2">No banner images available yet</p>
            <p className="text-sm text-gray-500">Admin users can upload banners in the content management panel</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Banner Image */}
          <div className="relative h-80 md:h-96 overflow-hidden bg-gradient-to-br from-emerald-200 via-teal-200 to-emerald-100">
            {currentBanner.bannerUrl ? (
              <img
                src={currentBanner.bannerUrl}
                alt={currentBanner.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-200 via-teal-200 to-emerald-100 flex items-center justify-center">
                <p className="text-emerald-700 font-medium">No banner image</p>
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="text-white">
                <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-3">
                  {currentBanner.type === "meditation" ? "🧘 Meditation" : "🎵 Sound Healing"}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{currentBanner.title}</h3>
                <p className="text-white/90 max-w-2xl line-clamp-2">
                  {currentBanner.description || "Discover inner peace and wellness"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {banners.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all"
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all"
                aria-label="Next banner"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to banner ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {banners.length > 0 && `Showing ${currentIndex + 1} of ${banners.length}`}
          </p>
        </div>
      </div>
    </section>
  );
}
