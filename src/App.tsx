import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import BrowseArtists from "./pages/BrowseArtists";
import ArtistProfile from "./pages/ArtistProfile";
import Categories from "./pages/Categories";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import ArtistDashboard from "./pages/ArtistDashboard";
import ClientDashboard from "./pages/ClientDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/browse-artists" element={<BrowseArtists />} />
          <Route path="/artist/:artistId" element={<ArtistProfile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/artist-dashboard" element={<ArtistDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
