import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistId: string;
  artistName: string;
  hourlyRate: number;
  onBookingCreated: () => void;
}

const BookingModal = ({
  isOpen,
  onClose,
  artistId,
  artistName,
  hourlyRate,
  onBookingCreated,
}: BookingModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    booking_date: "",
    service_type: "",
    duration_hours: 1,
    location: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to book an artist.",
          variant: "destructive",
        });
        return;
      }

      const totalAmount = hourlyRate * formData.duration_hours;

      const { error } = await supabase.from("bookings").insert({
        artist_id: artistId,
        client_id: user.id,
        booking_date: formData.booking_date,
        service_type: formData.service_type,
        duration_hours: formData.duration_hours,
        location: formData.location,
        description: formData.description,
        total_amount: totalAmount,
        status: "pending",
      });

      if (error) throw error;

      // Create notification for artist
      const { data: artistProfile } = await supabase
        .from("artist_profiles")
        .select("user_id")
        .eq("id", artistId)
        .single();

      if (artistProfile) {
        await supabase.from("notifications").insert({
          user_id: artistProfile.user_id,
          type: "booking",
          title: "New Booking Request",
          message: `You have a new booking request from a client for ${formData.service_type}.`,
          link: "/artist-dashboard",
        });
      }

      toast({
        title: "Booking created!",
        description: "Your booking request has been sent to the artist.",
      });

      onBookingCreated();
      onClose();
      setFormData({
        booking_date: "",
        service_type: "",
        duration_hours: 1,
        location: "",
        description: "",
      });
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle>Book {artistName}</DialogTitle>
          <DialogDescription>
            Fill in the details for your booking request
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="booking_date">Date & Time</Label>
            <Input
              id="booking_date"
              type="datetime-local"
              value={formData.booking_date}
              onChange={(e) =>
                setFormData({ ...formData, booking_date: e.target.value })
              }
              required
              className="glass-input"
            />
          </div>

          <div>
            <Label htmlFor="service_type">Service Type</Label>
            <Input
              id="service_type"
              placeholder="e.g., Portrait Photography, Event Coverage"
              value={formData.service_type}
              onChange={(e) =>
                setFormData({ ...formData, service_type: e.target.value })
              }
              required
              className="glass-input"
            />
          </div>

          <div>
            <Label htmlFor="duration_hours">Duration (hours)</Label>
            <Input
              id="duration_hours"
              type="number"
              min="1"
              value={formData.duration_hours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration_hours: parseInt(e.target.value),
                })
              }
              required
              className="glass-input"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Estimated cost: KES {hourlyRate * formData.duration_hours}
            </p>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Event location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="glass-input"
            />
          </div>

          <div>
            <Label htmlFor="description">Additional Notes</Label>
            <Textarea
              id="description"
              placeholder="Tell the artist more about your requirements..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="glass-input"
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
