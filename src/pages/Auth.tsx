import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultView = searchParams.get("view") || "login";
  const [view, setView] = useState<"login" | "signup">(defaultView as "login" | "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"client" | "artist" | "admin">("client");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkUserRoleAndRedirect(session.user.id);
      }
    });
  }, []);

  const checkUserRoleAndRedirect = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error) throw error;

      if (data?.role === "admin") {
        navigate("/admin");
      } else if (data?.role === "artist") {
        navigate("/artist-dashboard");
      } else {
        navigate("/client-dashboard");
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      navigate("/client-dashboard");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await checkUserRoleAndRedirect(data.user.id);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: redirectUrl
        }
      });
      
      if (authError) throw authError;
      
      const userId = authData.user?.id;
      if (!userId) throw new Error("No user ID returned");

      // Insert into profiles
      const { error: profileError } = await supabase.from("profiles").insert([{ 
        id: userId, 
        email, 
        full_name: fullName 
      }]);
      if (profileError) throw profileError;

      // Insert into user_roles
      const { error: roleError } = await supabase.from("user_roles").insert([{ 
        user_id: userId, 
        role 
      }]);
      if (roleError) throw roleError;

      // If artist, create artist profile
      if (role === "artist") {
        const { error: artistError } = await supabase.from("artist_profiles").insert([{ 
          user_id: userId,
          bio: "New artist - profile under construction",
          hourly_rate: 1000,
          specialties: [],
          availability: "Available for bookings"
        }]);
        if (artistError) throw artistError;
      }

      toast({ 
        title: "Success!", 
        description: "Account created successfully. Redirecting..." 
      });
      
      // Redirect based on role
      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else if (role === "artist") navigate("/artist-dashboard");
        else navigate("/client-dashboard");
      }, 1000);
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create account", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <h1 className="text-3xl font-bold text-white">Arts</h1>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold">
            <Star size={12} fill="white" />
            Proudly Kenyan
          </span>
        </Link>

        <div className="glass-card p-8">
          <div className="flex gap-4 mb-6">
            <Button
              variant={view === "login" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setView("login")}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Button>
            <Button
              variant={view === "signup" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setView("signup")}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </div>

          {view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="glass-input"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="glass-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="glass-input"
                />
              </div>
              <div className="space-y-2">
                <Label>I am a...</Label>
                <RadioGroup value={role} onValueChange={(value: "client" | "artist") => setRole(value)}>
                  <div className="flex items-center space-x-2 glass-card p-3">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client" className="cursor-pointer flex-1">
                      Client - I want to hire artists
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 glass-card p-3">
                    <RadioGroupItem value="artist" id="artist" />
                    <Label htmlFor="artist" className="cursor-pointer flex-1">
                      Artist - I want to offer my services
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
