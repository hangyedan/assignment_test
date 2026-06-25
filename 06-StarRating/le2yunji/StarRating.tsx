/**
 * 별점을 선택할 수 있는 재사용 가능한 Star Rating 컴포넌트입니다.
 *
 * 사용자는 별을 클릭하여 rating 값을 선택할 수 있고,
 * hover 중에는 hover된 별까지 임시로 채워져 보입니다.
 *
 * @example
 * ```tsx
 * const [rating, setRating] = useState(3);
 *
 * <StarRating
 *   maxStars={5}
 *   filledStars={rating}
 *   onChange={setRating}
 * />
 * ```
 */

import { useState } from "react";
import Star from "./components/Star";
import "./style/star.css";

type StarRatingProps = {
  maxStars: number;
  initialRating: number;
  onChange: (rating: number) => void;
};

export default function StarRating({
  maxStars = 5,
  initialRating = 0,
  onChange,
}: StarRatingProps) {
  // const [currentRating, setCurrentRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const displayRating = hoveredRating ?? initialRating;

  return (
    <div className="stars" onMouseLeave={() => setHoveredRating(null)}>
      {Array.from({ length: maxStars }).map((_, index: number) => {
        const ratingValue = index + 1;

        return (
          <Star
            key={index}
            ratingValue={ratingValue}
            filled={ratingValue <= displayRating}
            onHover={setHoveredRating}
            onClick={onChange}
          />
        );
      })}
    </div>
  );
}
