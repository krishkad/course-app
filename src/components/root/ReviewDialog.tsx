"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function CourseReviewDialog({
  handleSubmit,
}: {
  handleSubmit: (value: { stars: number; content: string }) => void;
}) {
  const [rating, setRating] = React.useState<number>(0);
  const [hover, setHover] = React.useState<number>(0);
  const [description, setDescription] = React.useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Leave a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review this Course</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Rating Stars */}
          <div className="flex items-center justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    "w-7 h-7 transition-colors",
                    star <= (hover || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              </button>
            ))}
          </div>

          {/* Optional Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description (optional)
            </label>
            <Textarea
              placeholder="Share your thoughts about the course..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() =>  handleSubmit({stars: rating, content: description})} disabled={rating === 0}>
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
