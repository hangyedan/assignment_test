import { useState } from "react";
import Star from "./components/Star";
import "./style/star.css";

export default function StarRating({ maxStars = 5 }) {
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const displayRating = hoveredRating || currentRating;

  return (
    <div className="stars" onMouseLeave={() => setHoveredRating(0)}>
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
