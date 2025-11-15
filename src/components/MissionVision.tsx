import { Target, Eye } from "lucide-react";
import missionBg from "@/assets/mission-bg.jpg";

const MissionVision = () => {
  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        backgroundImage: `url(${missionBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Mission */}
          <div className="glass-card p-8 md:p-12 animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              To create Kenya's most trusted marketplace for creative talent,
              empowering artists to showcase their work and connect with clients
              through a secure, transparent, and user-friendly platform that
              celebrates creativity and drives economic growth in the creative
              industry.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-card p-8 md:p-12 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
              <Eye className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              To become East Africa's leading creative platform, transforming
              how artists and clients connect, collaborate, and thrive. We
              envision a future where every talented artist has the tools and
              opportunities to build a successful career while enriching our
              cultural landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
