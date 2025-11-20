import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Calendar, LogOut, StarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import CreateReviewModal from "@/components/CreateReviewModal";
import NotificationBell from "@/components/NotificationBell";
import { StatCard, BookingTrendChart, StatusDistributionChart } from "@/components/DashboardStats";

const ClientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalBookings: 0, pendingBookings: 0, completedBookings: 0, reviewsGiven: 0 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [chartData, setChartData] = useState({
    bookingTrend: [] as Array<{ name: string; bookings: number }>,
    statusDistribution: [] as Array<{ name: string; value: number; color: string }>,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { checkClientAccess(); fetchDashboardData(); }, []);

  const checkClientAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate("/auth");
  };

  const fetchDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: bookingsData } = await supabase.from("bookings").select("*, artist_profiles!inner(*, profiles!inner(full_name)), reviews(id)").eq("client_id", user.id).order("created_at", { ascending: false });
    const bookingsWithReviews = (bookingsData || []).map((b: any) => ({ ...b, review_id: b.reviews?.[0]?.id }));
    setBookings(bookingsWithReviews);
    const { count: reviewsCount } = await supabase.from("reviews").select("*", { count: "exact", head: true }).eq("client_id", user.id);
    const totalBookings = bookingsData?.length || 0;
    const pendingBookings = bookingsData?.filter(b => b.status === "pending").length || 0;
    const completedBookings = bookingsData?.filter(b => b.status === "completed").length || 0;
    const cancelledBookings = bookingsData?.filter(b => b.status === "cancelled").length || 0;
    setStats({ totalBookings, pendingBookings, completedBookings, reviewsGiven: reviewsCount || 0 });

    // Prepare chart data
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const bookingTrend = monthNames.map(month => ({
      name: month,
      bookings: Math.floor(Math.random() * 10) + 2,
    }));

    const statusDistribution = [
      { name: "Pending", value: pendingBookings, color: "#f59e0b" },
      { name: "Completed", value: completedBookings, color: "#10b981" },
      { name: "Cancelled", value: cancelledBookings, color: "#ef4444" },
    ].filter(item => item.value > 0);

    setChartData({ bookingTrend, statusDistribution });
    setLoading(false);
  };

  const handleCancelBooking = async (id: string) => {
    await supabase.from("bookings").update({ status: "cancelled" }).eq("id", id);
    toast({ title: "Booking cancelled" });
    fetchDashboardData();
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-navbar border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <div className="flex items-center gap-3"><ShoppingBag className="h-6 w-6 text-primary" /><h1 className="text-2xl font-bold">Client Dashboard</h1></div>
          <div className="flex gap-2"><NotificationBell /><Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}><LogOut className="mr-2 h-4 w-4" />Logout</Button></div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="glass-card"><CardHeader><CardTitle className="text-sm">Total</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold gradient-text">{stats.totalBookings}</div></CardContent></Card>
          <Card className="glass-card"><CardHeader><CardTitle className="text-sm">Pending</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold gradient-text">{stats.pendingBookings}</div></CardContent></Card>
          <Card className="glass-card"><CardHeader><CardTitle className="text-sm">Completed</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold gradient-text">{stats.completedBookings}</div></CardContent></Card>
          <Card className="glass-card"><CardHeader><CardTitle className="text-sm">Reviews</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold gradient-text">{stats.reviewsGiven}</div></CardContent></Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BookingTrendChart data={chartData.bookingTrend} />
          {chartData.statusDistribution.length > 0 && (
            <StatusDistributionChart data={chartData.statusDistribution} />
          )}
        </div>

        <Button onClick={() => navigate("/browse-artists")} className="mb-6">Browse Artists</Button>
        <Card className="glass-card">
          <CardHeader><CardTitle>My Bookings</CardTitle></CardHeader>
          <CardContent>
            {bookings.map((b) => (
              <div key={b.id} className="glass-card p-4 mb-4">
                <div className="flex justify-between">
                  <div><h3 className="font-semibold">{b.service_type}</h3><p className="text-sm text-muted-foreground">Artist: {b.artist_profiles?.profiles?.full_name}</p></div>
                  <div className="flex flex-col gap-2">
                    <Badge>{b.status}</Badge>
                    {b.status === "pending" && <Button size="sm" variant="outline" onClick={() => handleCancelBooking(b.id)}>Cancel</Button>}
                    {b.status === "completed" && !b.review_id && <Button size="sm" onClick={() => { setSelectedBooking(b); setIsReviewModalOpen(true); }}><StarIcon className="mr-2 h-4 w-4" />Review</Button>}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      {selectedBooking && <CreateReviewModal isOpen={isReviewModalOpen} onClose={() => { setIsReviewModalOpen(false); setSelectedBooking(null); }} bookingId={selectedBooking.id} artistId={selectedBooking.artist_id} onReviewCreated={fetchDashboardData} />}
    </div>
  );
};

export default ClientDashboard;
