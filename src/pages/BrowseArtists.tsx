import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BrowseArtists = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchArtists();
  }, [searchQuery, specialty, priceRange]);

  const fetchArtists = async () => {
    setLoading(true);
    try {
      let query = supabase.from("artist_profiles").select("*, profiles!inner(full_name, avatar_url, location)").order("rating", { ascending: false });
      if (searchQuery) query = query.ilike("profiles.full_name", `%${searchQuery}%`);
      if (specialty) query = query.contains("specialties", [specialty]);
      if (priceRange === "low") query = query.lte("hourly_rate", 3000);
      else if (priceRange === "medium") query = query.gte("hourly_rate", 3000).lte("hourly_rate", 7000);
      else if (priceRange === "high") query = query.gte("hourly_rate", 7000);
      const { data } = await query;
      setArtists(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Browse Artists</h1>
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search artists..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 glass-input" />
              </div>
            </div>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="glass-input"><SelectValue placeholder="Specialty" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="glass-input"><SelectValue placeholder="Price" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="low">Under 3000</SelectItem>
                <SelectItem value="medium">3000-7000</SelectItem>
                <SelectItem value="high">7000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-16 glass-card">
            <p className="text-xl text-muted-foreground mb-4">No artists found</p>
            <p className="text-muted-foreground mb-6">
              {searchQuery || specialty || priceRange 
                ? "Try adjusting your filters" 
                : "Be the first to join as an artist!"}
            </p>
            <Button onClick={() => navigate("/auth?view=signup")}>
              Join as Artist
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <Card key={artist.id} className="glass-card hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate(`/artist/${artist.id}`)}>
              <CardHeader>
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  {artist.profiles.avatar_url ? <img src={artist.profiles.avatar_url} alt={artist.profiles.full_name} className="w-full h-full object-cover" /> : 
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center"><span className="text-6xl font-bold text-primary">{artist.profiles.full_name?.charAt(0)}</span></div>}
                  {artist.is_verified && <Badge className="absolute top-2 right-2">Verified</Badge>}
                </div>
                <CardTitle>{artist.profiles.full_name}</CardTitle>
                <CardDescription className="flex items-center gap-2"><MapPin className="h-3 w-3" />{artist.profiles.location || "Kenya"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{artist.rating?.toFixed(1) || "0.0"}</span>
                  <span className="text-muted-foreground">({artist.total_reviews || 0})</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">From KES {artist.hourly_rate || 0}/hour</p>
                <Button className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BrowseArtists;
