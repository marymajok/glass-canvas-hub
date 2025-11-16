import { useState } from "react";
import { Heart, Shield, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MissionVision from "@/components/MissionVision";
import Team from "@/components/Team";
import AuthModal from "@/components/AuthModal";

const About = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  const values = [
    {
      icon: Heart,
      title: "Passion for Creativity",
      description: "We celebrate and nurture Kenya's vibrant creative talent, providing a platform where artists can shine and grow.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We verify every artist on our platform and ensure secure transactions, creating a safe space for both artists and clients.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We maintain high standards by showcasing only the best creative professionals who demonstrate exceptional skill and professionalism.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "We build meaningful connections between artists and clients, fostering a supportive creative community across Kenya.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      
      {/* Hero Section with Background */}
      <div 
        className="relative pt-32 pb-24 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="gradient-text">Arts</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Connecting talented Kenyan creative professionals with clients across all creative fields. 
              We're building Kenya's most trusted marketplace for creative services.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "1,000+", label: "Verified Artists" },
              { value: "10,000+", label: "Completed Projects" },
              { value: "50+", label: "Creative Categories" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MissionVision />

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              What We <span className="gradient-text">Stand For</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do and shape our commitment to the creative community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="glass-card p-6 text-center hover:scale-105 transition-transform"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Team />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of artists and clients who trust Arts for their creative needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleSignupClick}
                className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold transition-colors"
              >
                Join as an Artist
              </button>
              <button 
                onClick={handleSignupClick}
                className="px-8 py-4 bg-background border border-border text-foreground hover:bg-muted rounded-lg font-semibold transition-colors"
              >
                Find an Artist
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default About;
