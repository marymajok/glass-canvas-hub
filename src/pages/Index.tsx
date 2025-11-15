import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Values from "@/components/Values";
import MissionVision from "@/components/MissionVision";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <Hero />
      <Values />
      <MissionVision />
      <Team />
      <Contact />
      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Index;
