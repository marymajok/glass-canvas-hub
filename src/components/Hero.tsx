import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/65" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Find Your Perfect{" "}
            <span className="gradient-text">Creative Artist</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Connect with talented Kenyan professionals across all creative fields
          </p>

          {/* Search Bar */}
          <div className="glass-card p-2 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                <Input
                  type="text"
                  placeholder="Search for artists, categories, or services..."
                  className="glass-input pl-10 h-12 text-white"
                />
              </div>
              <Button className="bg-primary text-white hover:bg-primary/90 h-12 px-8">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button className="bg-primary text-white hover:bg-primary/90 h-12 px-8 text-base">
              Find an Artist →
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-base"
            >
              Join as an Artist
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            {[
              { value: "1,000+", label: "Verified Artists" },
              { value: "10,000+", label: "Completed Projects" },
              { value: "50+", label: "Creative Categories" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
