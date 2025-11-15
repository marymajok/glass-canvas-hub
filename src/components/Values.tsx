import { Target, Users, Shield, Sparkles } from "lucide-react";
import valuesBg from "@/assets/values-bg.jpg";

const Values = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We are committed to delivering exceptional quality in everything we do, ensuring the highest standards of creative work.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive ecosystem where artists and clients collaborate, grow, and succeed together.",
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Creating a secure and transparent platform where verified artists and authentic reviews foster confidence.",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Embracing cutting-edge technology and creative solutions to empower artists and enhance user experience.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: `url(${valuesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Values
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            What We Stand For
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Values;
