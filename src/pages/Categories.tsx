import { useState } from "react";
import { ArrowRight, Camera, Palette, Music, Layout, Sparkles, Users, Mic, UtensilsCrossed, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Categories = () => {
  const [email, setEmail] = useState("");

  const categories = [
    {
      name: "Photographers",
      count: 245,
      icon: Camera,
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400",
    },
    {
      name: "Makeup Artists",
      count: 189,
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
    },
    {
      name: "Musicians",
      count: 156,
      icon: Music,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
    },
    {
      name: "Graphic Designers",
      count: 176,
      icon: Layout,
      image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400",
    },
    {
      name: "Event Decorators",
      count: 91,
      icon: Palette,
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8fd12?w=400",
    },
    {
      name: "Dancers & Choreographers",
      count: 68,
      icon: Users,
      image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400",
    },
    {
      name: "MCs & Comedians",
      count: 54,
      icon: Mic,
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
    },
    {
      name: "Caterers",
      count: 103,
      icon: UtensilsCrossed,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400",
    },
    {
      name: "Content Creators",
      count: 132,
      icon: Video,
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400",
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative pt-32 pb-16 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore <span className="gradient-text">Creative Categories</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Browse through our diverse range of creative services and find the perfect artist for your project
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="glass-card overflow-hidden group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{category.name}</h3>
                          <p className="text-sm text-white/80">{category.count} Artists</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Browse Artists <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Can't Find Category Section */}
          <div className="glass-card p-8 md:p-12 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Can't Find Your Category?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're constantly adding new categories and artists. Contact us to suggest a new category or browse our full artist directory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                Suggest Category
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Browse All Artists <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="glass-card p-8 md:p-12 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Stay Updated
                </h2>
                <p className="text-lg text-muted-foreground">
                  Subscribe to our newsletter for the latest artists, exclusive offers, and creative inspiration.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 bg-background/50 border-border text-foreground"
                />
                <Button 
                  type="submit" 
                  className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
