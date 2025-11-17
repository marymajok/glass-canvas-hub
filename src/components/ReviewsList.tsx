import { Star } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  };
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  if (reviews.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No reviews yet. Be the first to leave a review!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="glass-card p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {review.profiles.avatar_url ? (
                <img
                  src={review.profiles.avatar_url}
                  alt={review.profiles.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {review.profiles.full_name?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{review.profiles.full_name}</h4>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(review.created_at), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {review.comment && (
                <p className="text-muted-foreground">{review.comment}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
