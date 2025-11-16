import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  User, Calendar, Star, MessageSquare, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const ClientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalReviews: 0,
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkClientAccess();
    fetchDashboardData();
  }, []);

  const checkClientAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
    } catch (error) {
      navigate("/auth");
    }
  };

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*, artist_profiles!bookings_artist_id_fkey(*, profiles!artist_profiles_user_id_fkey(full_name))")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      setBookings(bookingsData || []);

      // Calculate stats
      const totalBookings = bookingsData?.length || 0;
      const pendingBookings = bookingsData?.filter(b => b.status === "pending").length || 0;
      const completedBookings = bookingsData?.filter(b => b.status === "completed").length || 0;

      // Fetch reviews count
      const { count: reviewsCount } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true })
        .eq("client_id", user.id);

      setStats({
        totalBookings,
        pendingBookings,
        completedBookings,
        totalReviews: reviewsCount || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId);

      if (error) throw error;

      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled.",
      });

      fetchDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-navbar border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Client Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/browse-artists")}>
              Browse Artists
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{stats.totalBookings}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{stats.pendingBookings}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{stats.completedBookings}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{stats.totalReviews}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
            <CardDescription>Track your artist bookings and leave reviews</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't made any bookings yet</p>
                <Button onClick={() => navigate("/browse-artists")}>
                  Browse Artists
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="glass-card p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {booking.service_type}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Artist: {booking.artist_profiles?.profiles?.full_name || "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: {new Date(booking.booking_date).toLocaleDateString()}
                        </p>
                        {booking.location && (
                          <p className="text-sm text-muted-foreground">
                            Location: {booking.location}
                          </p>
                        )}
                        {booking.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {booking.description}
                          </p>
                        )}
                        {booking.total_amount && (
                          <p className="text-sm font-semibold text-primary mt-2">
                            KES {booking.total_amount.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant={
                          booking.status === "pending" ? "default" :
                          booking.status === "accepted" ? "secondary" :
                          booking.status === "completed" ? "secondary" :
                          booking.status === "declined" ? "destructive" : "default"
                        }>
                          {booking.status}
                        </Badge>
                        {booking.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
