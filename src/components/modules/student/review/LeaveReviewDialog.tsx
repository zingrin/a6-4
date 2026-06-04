"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PencilLine, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { leaveReviewAction } from "@/actions/student.action";

export default function LeaveReviewDialog({
  bookingId,
}: {
  bookingId: string;
}) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Submitting review...");

    try {
      const payload = {
        bookingId,
        rating: rating.toFixed(1),
        review,
      };

      const res = await leaveReviewAction(payload);

      if (res.error) {
        toast.error(res.error, { id: toastId });
        return;
      }

      toast.success(res.data.message || "Session booked", { id: toastId });
    } catch (error) {
      toast.error("Failed to book the session", { id: toastId });
      console.error("Booking failed:", error);
    } finally {
      setIsLoading(false);
      handleReset();
    }
  };

  const handleReset = () => {
    setRating(0);
    setHoveredStar(0);
    setReview("");
  };

  const isFormValid = rating > 0 && review.trim().length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          {" "}
          <PencilLine /> Leave a review{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>
              Rating <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="focus:outline-none transition-transform duration-150 hover:scale-110"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    size={28}
                    className={cn(
                      "transition-colors duration-150",
                      star <= (hoveredStar || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 fill-gray-100",
                    )}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">
              Review <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="review"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="resize-none"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-400 text-right">
              {review.length}/500
            </p>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => {
                handleReset();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleSubmit} disabled={!isFormValid || isLoading}>
              Submit Review
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
