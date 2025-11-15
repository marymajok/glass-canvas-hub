import { useState } from "react";
import { Search, MapPin, Star, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState as useAuthState } from "react";
import AuthModal from "@/components/AuthModal";

const BrowseArtists = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useAuthState(false);
  const [authModalTab, setAuthModalTab] = useAuthState<"login" | "signup">("login");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  const categories = [
    { name: "Photographers", count: 245 },
    { name: "Makeup Artists", count: 189 },
    { name: "Musicians", count: 156 },
    { name: "Graphic Designers", count: 176 },
    { name: "Event Decorators", count: 91 },
    { name: "Dancers & Choreographers", count: 68 },
    { name: "MCs & Comedians", count: 54 },
    { name: "Caterers", count: 103 },
    { name: "Content Creators", count: 132 },
  ];

  const artists = [
    {
      id: 1,
      name: "Michael Otieno",
      location: "Karen, Nairobi",
      rating: 4.7,
      reviews: 45,
      category: "Painters",
      featured: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "Contemporary painter and muralist creating vibrant African-inspired artwork with unique cultural expressions.",
      priceFrom: 30000,
      availability: "Within 24 hours",
    },
    {
      id: 2,
      name: "Fatuma Ali",
      location: "Lavington, Nairobi",
      rating: 4.8,
      reviews: 78,
      category: "Fashion Designers",
      featured: true,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      description: "Award-winning fashion designer creating contemporary African fashion with a modern twist.",
      priceFrom: 40000,
      availability: "Within 4 hours",
    },
    {
      id: 3,
      name: "Brian Mwenda",
      location: "Kileleshwa, Nairobi",
      rating: 4.9,
      reviews: 102,
      category: "Videographers",
      featured: true,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      description: "Creative videographer specializing in cinematic wedding films and commercial content.",
      priceFrom: 30000,
      availability: "Within 2 hours",
    },
    {
      id: 4,
      name: "Sarah Wanjiru",
      location: "Westlands, Nairobi",
      rating: 4.6,
      reviews: 56,
      category: "Makeup Artists",
      featured: false,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      description: "Professional makeup artist specializing in bridal makeup and editorial looks.",
      priceFrom: 5000,
      availability: "Within 3 hours",
    },
    {
      id: 5,
      name: "David Kimani",
      location: "Kilimani, Nairobi",
      rating: 4.7,
      reviews: 89,
      category: "Photographers",
      featured: false,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      description: "Portrait and event photographer capturing authentic moments with artistic flair.",
      priceFrom: 20000,
      availability: "Within 2 hours",
    },
    {
      id: 6,
      name: "Grace Muthoni",
      location: "Runda, Nairobi",
      rating: 4.9,
      reviews: 134,
      category: "Event Decorators",
      featured: false,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      description: "Creative event decorator transforming spaces into unforgettable experiences.",
      priceFrom: 25000,
      availability: "Within 1 hour",
    },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="glass-card p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-foreground mb-6">Filters</h2>
                
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      placeholder="Search artists..."
                      className="pl-10 bg-muted/30 border-border text-foreground"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.name}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => toggleCategory(category.name)}
                        />
                        <label
                          htmlFor={category.name}
                          className="text-sm text-muted-foreground cursor-pointer flex-1"
                        >
                          {category.name} ({category.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Price Range:</h3>
                  <p className="text-2xl font-bold text-foreground mb-4">
                    KSh {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                  </p>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500000}
                    step={5000}
                    className="mb-4"
                  />
                </div>

                {/* Minimum Rating */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Minimum Rating</h3>
                  <Select defaultValue="any">
                    <SelectTrigger className="bg-muted/30 border-border text-foreground">
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any rating</SelectItem>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.0">4.0+ stars</SelectItem>
                      <SelectItem value="3.5">3.5+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={() => {
                  setPriceRange([0, 500000]);
                  setSelectedCategories([]);
                }}>
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Artist Grid */}
            <main className="flex-1">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Browse Artists</h1>
                <p className="text-muted-foreground">
                  Discover talented creative professionals across Kenya
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {artists.map((artist) => (
                  <div key={artist.id} className="glass-card overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {artist.featured && (
                          <span className="bg-accent px-3 py-1 rounded-full text-xs font-semibold text-accent-foreground">
                            Featured
                          </span>
                        )}
                        <span className="bg-primary px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
                          {artist.category}
                        </span>
                      </div>
                      {/* Avatar */}
                      <div className="absolute -bottom-10 left-6">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-20 h-20 rounded-full border-4 border-background object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-12">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                          {artist.name}
                          <span className="text-primary">✓</span>
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin size={14} />
                        <span>{artist.location}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="fill-accent text-accent" />
                          <span className="font-semibold text-foreground">{artist.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({artist.reviews})</span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {artist.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">From KSh {artist.priceFrom.toLocaleString()}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock size={12} />
                            <span>{artist.availability}</span>
                          </div>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          View <ArrowRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
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

export default BrowseArtists;
