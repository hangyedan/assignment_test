import { useState } from "react";
import Star from "./components/Star";
import "./style/star.css";

export default function StarRating({ maxStars = 5, initialRating = 0 }) {
  const [currentRating, setCurrentRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const displayRating = hoveredRating ?? currentRating;

  return (
    <div className="stars" onMouseLeave={() => setHoveredRating(null)}>
      {Array.from({ length: maxStars }).map((_, index: number) => {
        const ratingValue = index + 1;

        return (
          <Star
            key={index}
            filled={ratingValue <= displayRating}
            onMouseEnter={() => setHoveredRating(ratingValue)}
            onClick={() => setCurrentRating(ratingValue)}
          />
        );
      })}
    </div>
  );
}
