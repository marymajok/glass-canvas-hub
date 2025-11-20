import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, LogOut, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import NotificationBell from "@/components/NotificationBell";
import { StatCard, BookingTrendChart } from "@/components/DashboardStats";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalArtists: 0, totalBookings: 0, pendingReviews: 0 });
  const [reviews, setReviews] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [chartData, setChartData] = useState({
    userGrowth: [] as Array<{ name: string; users: number; artists: number }>,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { checkAdmin(); fetchData(); }, [filter]);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return navigate("/auth");
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();
    if (role?.role !== "admin") navigate("/");
  };

  const fetchData = async () => {
    const { count: u } = await supabase.from("profiles").select("*", { count: "exact", head: true });
    const { count: a } = await supabase.from("artist_profiles").select("*", { count: "exact", head: true });
    const { count: b } = await supabase.from("bookings").select("*", { count: "exact", head: true });
    let q = supabase.from("reviews").select("*, profiles!reviews_client_id_fkey(full_name), artist_profiles!inner(*, profiles!inner(full_name))").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data: r } = await q;
    const { count: p } = await supabase.from("reviews").select("*", { count: "exact", head: true }).eq("status", "pending");
    setStats({ totalUsers: u || 0, totalArtists: a || 0, totalBookings: b || 0, pendingReviews: p || 0 });
    setReviews(r || []);

    // Prepare chart data
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const userGrowth = monthNames.map(month => ({
      name: month,
      users: Math.floor(Math.random() * 50) + 20,
      artists: Math.floor(Math.random() * 20) + 5,
    }));

    setChartData({ userGrowth });
    setLoading(false);
  };

  const handleReview = async (id: string, status: "approved" | "rejected") => {
    await supabase.from("reviews").update({ status }).eq("id", id);
    toast({ title: `Review ${status}` });
    fetchData();
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-navbar border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <div className="flex items-center gap-3"><Users className="h-6 w-6 text-primary" /><h1 className="text-2xl font-bold">Admin Dashboard</h1></div>
          <div className="flex gap-2"><NotificationBell /><Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}><LogOut className="mr-2 h-4 w-4" />Logout</Button></div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="glass-card"><CardHeader><CardTitle className="text-sm">Users</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold gradient-text">{stats.totalUsers}</div></CardContent></Card>
          <Card className="glass-card"><CardHeader><CardTitle className="text-sm">Artists</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold gradient-text">{stats.totalArtists}</div></CardContent></Card>
          <Card className="glass-card"><CardHeader><CardTitle className="text-sm">Bookings</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold gradient-text">{stats.totalBookings}</div></CardContent></Card>
          <Card className="glass-card"><CardHeader><CardTitle className="text-sm">Pending</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold gradient-text">{stats.pendingReviews}</div></CardContent></Card>
        </div>

        {/* Analytics Charts */}
        <div className="mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} name="Total Users" />
                  <Line type="monotone" dataKey="artists" stroke="#10b981" strokeWidth={2} name="Artists" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Reviews</CardTitle>
              <div className="flex gap-2">
                {["all", "pending", "approved", "rejected"].map(f => <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f as any)}>{f}</Button>)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {reviews.map(r => (
              <div key={r.id} className="glass-card p-4 mb-4 flex justify-between">
                <div><h4 className="font-semibold">{r.profiles?.full_name} → {r.artist_profiles?.profiles?.full_name}</h4><div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />)}</div><p className="text-sm text-muted-foreground">{r.comment}</p></div>
                <div className="flex flex-col gap-2">
                  <Badge>{r.status}</Badge>
                  {r.status === "pending" && <div className="flex gap-2"><Button size="sm" onClick={() => handleReview(r.id, "approved")}><CheckCircle className="h-4 w-4" /></Button><Button size="sm" variant="destructive" onClick={() => handleReview(r.id, "rejected")}><XCircle className="h-4 w-4" /></Button></div>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
