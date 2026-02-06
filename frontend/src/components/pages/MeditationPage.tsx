import React ,{ useState } from "react";

const heroImage = "/meditation/hero.png";
const wellness1 = "/meditation/wellness1.jpeg";
const wellness2 = "/meditation/wellness2.jpeg";
const wellness3 = "/meditation/wellness3.jpeg";
const wellness4 = "/meditation/wellness4.jpeg";
const wellness5 = "/meditation/wellness5.jpeg";
const wellness6 = "/meditation/wellness6.jpeg";
const wellness7 = "/meditation/wellness7.jpeg";
const wellness12 = "/meditation/wellness12.jpeg";
const wellness13 = "/meditation/wellness13.jpeg";
const wellness11 = "/meditation/wellness11.jpeg";

const balasana = "/meditation/balasana.jpeg";
const ardha = "/meditation/ArdhaMatsyendrasana.jpeg";
const butterfly = "/meditation/ButterflyPose.jpeg";
const savasana = "/meditation/Savasana.jpeg";
const sukhasana = "/meditation/Sukhasana.jpeg";
const virkshana  = "/meditation/Vrikshasana.jpeg";
const vajrasana = "/meditation/Vajrasana.jpeg";
const siddhasana = "/meditation/siddhasana.jpeg";
const paschimottanasana = "/meditation/Paschimottanasana.jpeg";




// Main Page Component
export default function MeditationGuide() {
  return (
    <div className="font-sans text-gray-700">
      <HeroSection />
      <MeditationImages />
      <MeditationPoses />
      <EssentialGuidance />
      <ConsultSection />
      <Footer />
    </div>
  );
}

// Hero Section
const HeroSection: React.FC = () => (
  <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${heroImage})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-background" />
  </div>

  {/* Content */}
  <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
    <span className="mb-4 inline-block animate-fade-up rounded-full bg-secondary/20 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm">
      ✨ Begin Your Journey Within
    </span>

    <h1 className="mb-6 max-w-4xl animate-fade-up font-display text-5xl font-light leading-tight text-primary-foreground md:text-7xl [animation-delay:100ms]">
      Meet Allert Your
      <span className="block font-semibold italic text-secondary">
        Meditation
      </span>
      Guide
    </h1>

    <p className="mb-8 max-w-2xl animate-fade-up font-sans text-lg text-primary-foreground/90 [animation-delay:200ms]">
      Discover inner peace through ancient wisdom and modern practice.
      Choose your path to mindfulness and transform your life.
    </p>

    <div className="flex animate-fade-up gap-4 [animation-delay:300ms]">
      <a
        href="#consult"
        className="rounded-full border-2 border-primary-foreground/30 px-8 py-3 font-medium text-primary-foreground backdrop-blur-sm transition-all hover:border-primary-foreground hover:bg-primary-foreground/10"
      >
        Free Consultation
      </a>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <div className="h-10 w-6 rounded-full border-2 border-primary-foreground/50 p-1">
      <div className="h-2 w-1 animate-pulse rounded-full bg-primary-foreground/50" />
    </div>
  </div>
</section>
);

const MeditationImages: React.FC = () => (
  <section className="py-20 bg-gray-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">

      <div className="mb-12 text-center">
        <h2 className="text-4xl mb-4">
          Poses for <span className="italic text-emerald-600">Meditation</span>
        </h2>
        <p className="text-gray-500">
          Prepare your body and mind with yoga asanas
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { src: wellness1, alt: "Sukhasana - Easy Pose" },
          { src: wellness2, alt: "Cosmic Meditation" },
          { src: wellness3, alt: "Vajrasana - Thunderbolt Pose" },
          { src: wellness4, alt: "Padmasana - Lotus Pose" },
          { src: wellness5, alt: "Savasana - Corpse Pose" },
          { src: wellness6, alt: "Zen Garden Meditation" },
          { src: wellness7, alt: "Vrikshasana - Tree Pose" },
          { src: wellness12, alt: "Dhyana - Deep Meditation" },
          { src: wellness13, alt: "Pranayama - Breath Control" },
          { src: wellness11, alt: "Breath Awareness" },
        ].map((img, i) => {
          const floatClass =
            i % 2 === 0 ? "animate-float-up" : "animate-float-down";

          return (
            <div
              key={i}
              className={`group relative aspect-square overflow-hidden rounded-2xl shadow-lg ${floatClass}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
                  {img.alt}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);


// Meditation Poses Section
// =====================
// Meditation Poses
// =====================
const MeditationPoses: React.FC = () => {
  const [activePose, setActivePose] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const poses = [
    
    {
      id: 1,
      name: "Easy Pose (Sukhasana)",
      practiceLevel: "Beginner",
      intensity: "Gentle",
      duration: "5–20 minutes",
      image: sukhasana,
      description:
        "A simple and comfortable seated posture ideal for beginners.",
      youtubeUrl: "https://www.youtube.com/embed/j7rKKpwdXNE",
      guidelines: [
        "Sit cross-legged comfortably",
        "Spine tall",
        "Relax shoulders",
        "Focus on breathing",
      ],
      benefits: [
        "Reduces stress",
        "Improves focus",
        "Relaxes body",
      ],
    },
    {
      id: 2,
      name: "Child's Pose (Balasana)",
      practiceLevel: "Beginner",
      intensity: "Gentle",
      duration: "1–5 minutes",
      image: balasana,
      description:
        "A deeply calming pose that relaxes the spine and nervous system.",
      youtubeUrl: "https://www.youtube.com/embed/2MJGg-dUKh0",
      guidelines: [
        "Kneel on mat",
        "Fold forward",
        "Rest forehead down",
        "Arms relaxed",
      ],
      benefits: [
        "Relieves tension",
        "Calms mind",
        "Reduces anxiety",
      ],
    },
  {
  id: 3,
  name: "Thunderbolt Pose (Vajrasana)",
  practiceLevel: "Beginner",
  intensity: "Gentle",
  duration: "5–15 minutes",
  image: vajrasana,
  description:
    "A seated kneeling posture that aids digestion and promotes stillness for meditation.",
  youtubeUrl: "https://www.youtube.com/embed/6V6nKz5d7oU",
  guidelines: [
    "Kneel on the mat",
    "Sit back on heels",
    "Keep spine straight",
    "Hands on thighs",
  ],
  benefits: [
    "Improves digestion",
    "Enhances focus",
    "Strengthens posture",
  ],
  precautions: [
    "Avoid if knee pain",
    "Use cushion under ankles",
  ],
},
{
  id: 4,
  name: "Perfect Pose (Siddhasana)",
  practiceLevel: "Intermediate",
  intensity: "Gentle",
  duration: "10–30 minutes",
  image: siddhasana,
  description:
    "A traditional meditation pose believed to awaken inner energy.",
  youtubeUrl: "https://www.youtube.com/embed/7VYJ9nF4m0Q",
  guidelines: [
    "Sit with one heel at perineum",
    "Other foot placed above",
    "Spine upright",
    "Hands resting on knees",
  ],
  benefits: [
    "Balances energy",
    "Improves concentration",
    "Stabilizes mind",
  ],
  precautions: [
    "Avoid if hip stiffness",
  ],
},
{
  id: 5,
  name: "Seated Forward Fold (Paschimottanasana)",
  practiceLevel: "Beginner",
  intensity: "Gentle",
  duration: "2–5 minutes",
  image:paschimottanasana ,
  description:
    "A calming forward bend that relaxes the nervous system.",
  youtubeUrl: "https://www.youtube.com/embed/T8sgVyFZ3FQ",
  guidelines: [
    "Sit with legs extended",
    "Fold forward gently",
    "Relax head and neck",
    "Breathe deeply",
  ],
  benefits: [
    "Calms nervous system",
    "Reduces anxiety",
    "Relieves fatigue",
  ],
  precautions: [
    "Avoid deep stretch if back pain",
  ],
},
{
  id: 6,
  name: "Corpse Pose (Shavasana)",
  practiceLevel: "Beginner",
  intensity: "Very Gentle",
  duration: "5–20 minutes",
  image: savasana,
  description:
    "A deeply restorative posture for mindfulness and body awareness.",
  youtubeUrl: "https://www.youtube.com/embed/1VYlOKUdylM",
  guidelines: [
    "Lie flat on back",
    "Arms relaxed by sides",
    "Eyes closed",
    "Observe breath",
  ],
  benefits: [
    "Deep relaxation",
    "Reduces stress",
    "Improves awareness",
  ],
  precautions: [
    "Use blanket if cold",
  ],
},
{
  id: 7,
  name: "Butterfly Pose (Baddha Konasana)",
  practiceLevel: "Beginner",
  intensity: "Gentle",
  duration: "5–15 minutes",
  image: butterfly,
  description:
    "A relaxing seated pose that opens the hips and calms the nervous system, making it ideal before meditation.",
  youtubeUrl: "https://www.youtube.com/embed/EVd9Z9dZzFg",
  guidelines: [
    "Sit with spine straight",
    "Bring soles of feet together",
    "Hold feet and gently flap knees",
    "Breathe deeply and relax",
  ],
  benefits: [
    "Opens hips",
    "Reduces stress",
    "Improves flexibility",
  ],
  precautions: [
    "Avoid forcing knees down",
    "Use cushions under thighs if needed",
  ],
},

{
  id: 8,
  name: "Half Spinal Twist (Ardha Matsyendrasana)",
  practiceLevel: "Intermediate",
  intensity: "Moderate",
  duration: "3–8 minutes",
  image: ardha,
  description:
    "A seated twisting posture that improves spinal flexibility and energizes the body while keeping the mind alert.",
  youtubeUrl: "https://www.youtube.com/embed/9Kk9f9R5Z9w",
  guidelines: [
    "Sit with legs extended",
    "Bend one knee and place foot outside thigh",
    "Twist torso gently",
    "Keep spine upright",
  ],
  benefits: [
    "Improves digestion",
    "Enhances spinal mobility",
    "Improves focus",
  ],
  precautions: [
    "Avoid if severe back pain",
    "Twist gently without jerks",
  ],
},

{
  id: 9,
  name: "Tree Pose (Vrikshasana)",
  practiceLevel: "Beginner",
  intensity: "Moderate",
  duration: "1–5 minutes",
  image: virkshana,
  description:
    "A balancing pose that builds focus, stability, and mental clarity — excellent preparation for meditation.",
  youtubeUrl: "https://www.youtube.com/embed/wdln9qWYloU",
  guidelines: [
    "Stand straight",
    "Place one foot on inner thigh or calf",
    "Hands in prayer position",
    "Fix gaze on one point",
  ],
  benefits: [
    "Improves balance",
    "Builds concentration",
    "Strengthens legs",
  ],
  precautions: [
    "Avoid if dizziness",
    "Use wall support if needed",
  ],
},


  ];

  return (
    <>
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4">

          <div className="mb-16 text-center">
            <h2 className="text-4xl">
              Yoga for <span className="italic text-emerald-600">Meditation</span>
            </h2>
            <p className="text-gray-500 mt-3">
              Click a pose to explore details
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {poses.map((pose, index) => (
              <div
                key={pose.id}
                onClick={() => {
                  setActivePose(pose);
                  setIsOpen(true);
                }}
                className={`cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-2xl
                  ${index % 2 === 0 ? "animate-float-up" : "animate-float-down"}
                `}
              >
                <img
                  src={pose.image}
                  alt={pose.name}
                  className="h-52 w-full object-cover transition-transform duration-700 hover:scale-110"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold">{pose.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {pose.intensity} • {pose.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      <YogaDetailModal
        pose={activePose}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
// =====================
// Yoga Detail Modal
// =====================
const YogaDetailModal = ({ pose, isOpen, onClose }: any) => {
  if (!isOpen || !pose) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative bg-white max-w-3xl w-full rounded-2xl p-6 overflow-y-auto max-h-[90vh]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-3xl font-semibold mb-4">{pose.name}</h2>

        <img
          src={pose.image}
          alt={pose.name}
          className="w-full h-72 object-cover rounded-xl mb-4"
        />

        <p className="text-gray-600 mb-4">{pose.description}</p>

        <h4 className="font-semibold mb-2">Steps</h4>
        <ul className="list-disc pl-6 mb-4">
          {pose.guidelines.map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        <h4 className="font-semibold mb-2">Benefits</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {pose.benefits.map((benefit: string) => (
            <span
              key={benefit}
              className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
            >
              ✓ {benefit}
            </span>
          ))}
        </div>

        {pose.youtubeUrl && (
          <iframe
            src={pose.youtubeUrl}
            title={`${pose.name} video`}
            className="w-full h-64 rounded-xl"
            allowFullScreen
          />
        )}
        
      </div>
    </div>
  );
};


// Essential Guidance Section
const EssentialGuidance: React.FC = () => {
  const guidanceItems = [
    { icon: "🧘", title: "Start Small", description: "Begin with just 5 minutes daily. Consistency matters more than duration." },
    { icon: "🌅", title: "Morning Practice", description: "Early morning is ideal when the mind is fresh and distractions are minimal." },
    { icon: "🪷", title: "Create Sacred Space", description: "Designate a quiet corner for your practice." },
    { icon: "📱", title: "Disconnect to Connect", description: "Put devices on silent for true stillness." },
    { icon: "🌬️", title: "Breathe First", description: "Begin with deep breaths before meditation." },
    { icon: "❤️", title: "Be Patient", description: "Gently guide the mind back without judgment." },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-12 text-center">
          <h2 className="text-4xl">
            Essential <span className="italic text-emerald-600">Guidance</span>
          </h2>
          <p className="text-gray-500 mt-3">
            Principles to deepen your meditation journey
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guidanceItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// Consult Section
const ConsultSection: React.FC = () => (
  <section className="py-20 px-6 bg-emerald-700 text-white">
    <h2 className="text-3xl text-center mb-4">Consult Us for <span className="italic">Free Guidance</span></h2>
    <p className="text-center max-w-2xl mx-auto mb-10 opacity-90">
      Struggling with sleep, stress, anxiety, or focus? Our experts are here to help — at no cost.
    </p>

    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {['Sleep Issues', 'Stress & Anxiety', 'Focus Problems', 'Emotional Balance', 'Spiritual Growth', 'Physical Tension'].map(item => (
        <span key={item} className="px-4 py-2 bg-white/20 rounded-full text-sm">{item}</span>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <ActionCard title="Call Us" subtitle="Quick consultation" />
      <ActionCard title="Live Chat" subtitle="Instant support" />
      <ActionCard title="Email Us" subtitle="Detailed response" />
    </div>

    <p className="text-center text-sm mt-10 opacity-80">✓ 100% Free • ✓ No Obligations • ✓ Expert Guidance</p>
  </section>
);

const ActionCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="bg-white/10 p-8 rounded-2xl text-center hover:bg-white/20 transition">
    <h4 className="text-lg font-medium mb-1">{title}</h4>
    <p className="text-sm opacity-80">{subtitle}</p>
  </div>
);

// Footer
const Footer: React.FC = () => (
  <footer className="py-6 text-center text-sm text-gray-500">
    © 2024 Meditation Guide. Find your inner peace.
  </footer>
);
