import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, DollarSign, Calendar, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BookingModal from "@/components/BookingModal";
import ReviewsList from "@/components/ReviewsList";
import PortfolioGallery from "@/components/PortfolioGallery";

const ArtistProfile = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [artist, setArtist] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    fetchArtistData();
  }, [artistId]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const fetchArtistData = async () => {
    try {
      // Fetch artist profile
      const { data: artistData, error: artistError } = await supabase
        .from("artist_profiles")
        .select("*, profiles!inner(*)")
        .eq("id", artistId)
        .single();

      if (artistError) throw artistError;
      setArtist(artistData);

      // Fetch user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", artistData.user_id)
        .single();
      
      setProfile(profileData);

      // Fetch portfolio images
      const { data: portfolioData } = await supabase
        .from("portfolio_images")
        .select("*")
        .eq("artist_id", artistId)
        .order("display_order", { ascending: true });

      setPortfolio(portfolioData || []);

      // Fetch approved reviews
      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("*, profiles!reviews_client_id_fkey(full_name, avatar_url)")
        .eq("artist_id", artistId)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      setReviews(reviewsData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Artist not found</h2>
          <Button onClick={() => navigate("/browse-artists")}>
            Browse Artists
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-navbar border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/browse-artists")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artists
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Artist Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-primary/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary">
                        {profile?.full_name?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h1 className="text-2xl font-bold gradient-text mb-2">
                    {profile?.full_name}
                  </h1>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{artist.rating?.toFixed(1) || "0.0"}</span>
                    <span className="text-muted-foreground">
                      ({artist.total_reviews || 0} reviews)
                    </span>
                  </div>
                  {artist.is_verified && (
                    <Badge className="mb-4">Verified Artist</Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{profile?.location || "Location not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>KES {artist.hourly_rate || 0}/hour</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{artist.years_experience || 0} years experience</span>
                  </div>
                </div>

                {artist.specialties && artist.specialties.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {artist.specialties.map((specialty: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {currentUser && (
                  <Button
                    className="w-full mt-6"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    Book Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {artist.bio || "No bio provided yet."}
                </p>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <PortfolioGallery images={portfolio} />
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Reviews ({reviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewsList reviews={reviews} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {currentUser && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          artistId={artistId!}
          artistName={profile?.full_name}
          hourlyRate={artist.hourly_rate}
          onBookingCreated={fetchArtistData}
        />
      )}
    </div>
  );
};

export default ArtistProfile;
