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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Loader2 } from "lucide-react";

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  artistId: string;
  onReviewCreated: () => void;
}

const CreateReviewModal = ({
  isOpen,
  onClose,
  bookingId,
  artistId,
  onReviewCreated,
}: CreateReviewModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("reviews").insert({
        booking_id: bookingId,
        artist_id: artistId,
        client_id: user.id,
        rating,
        comment: comment || null,
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
          type: "review",
          title: "New Review Pending",
          message: `You have received a new review (${rating} stars) that is pending approval.`,
        });
      }

      toast({
        title: "Review submitted!",
        description: "Your review is pending admin approval.",
      });

      onReviewCreated();
      onClose();
      setRating(0);
      setComment("");
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
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this artist
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Your Rating</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Textarea
              placeholder="Tell us about your experience (optional)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="glass-input min-h-[120px]"
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || rating === 0} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReviewModal;
