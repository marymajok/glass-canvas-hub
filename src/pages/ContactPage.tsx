import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

const ContactPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  const faqs = [
    {
      question: "How do I book an artist?",
      answer: "Browse our artists, select one you like, and click 'Book Now' on their profile. Fill out the booking form with your requirements and submit. The artist will respond within their specified timeframe.",
    },
    {
      question: "Is there a booking fee?",
      answer: "We charge a small platform fee to maintain our service and ensure quality. The exact fee is displayed before you confirm your booking.",
    },
    {
      question: "How are artists verified?",
      answer: "All artists go through a verification process where we check their credentials, portfolio, and reviews. We ensure they meet our quality standards before appearing on the platform.",
    },
    {
      question: "What if I need to cancel a booking?",
      answer: "You can cancel a booking through your dashboard. Cancellation policies vary by artist and are displayed during booking. Please review them carefully.",
    },
    {
      question: "How do payments work?",
      answer: "Payments are securely processed through our platform. We support M-Pesa, card payments, and bank transfers. Artists receive payment after successful project completion.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Drop Us a <span className="gradient-text">Message</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="glass-card p-6 md:p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-muted/30 border-border text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email"
                      placeholder="john@example.com" 
                      className="bg-muted/30 border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input 
                      placeholder="+254 700 000 000" 
                      className="bg-muted/30 border-border text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Select>
                    <SelectTrigger className="bg-muted/30 border-border text-foreground">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="artist">Artist Application</SelectItem>
                      <SelectItem value="booking">Booking Support</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea 
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="bg-muted/30 border-border text-foreground resize-none"
                  />
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              {/* Visit Office */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Visit Our Office</h3>
                    <p className="text-sm text-muted-foreground">We'd love to meet you</p>
                  </div>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                    alt="Office location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-semibold">Westlands, Nairobi</p>
                    <p className="text-white/80 text-sm">Kenya</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  <MapPin size={16} className="mr-2" />
                  Get Directions
                </Button>
              </div>

              {/* Contact Details */}
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">+254 700 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">info@arts.co.ke</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Working Hours</p>
                    <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Sat: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default ContactPage;
