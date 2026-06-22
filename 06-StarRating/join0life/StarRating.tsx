import { useState } from "react";
import "./StarRating.css";

/**
 * @property {number} maxStar - 최대 별의 수
 * @property {number} nowStar - 현재 채워진 별의 수
 * @property {function} changeRating - 평점 변경 시 호출되는 콜백 함수
 */

type StarRatingProps = {
  maxStar: number;
  nowStar: number;
  changeRating: (rating: number) => void;
};

export default function StarRating({
  maxStar,
  nowStar,
  changeRating,
}: StarRatingProps) {
  const [rating, setRating] = useState(nowStar);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (nextRating: number) => {
    setRating(nextRating);
    changeRating(nextRating);
  };

  return (
    <fieldset className="star-rating">
      <legend className="star-rating-legend">별점 선택</legend>
      {Array.from({ length: maxStar }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handleRatingChange(i + 1)}
          className={`star-button${i < rating ? " filled" : ""}${i < hoverRating ? " hover" : ""}`}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <StarIcon />
        </button>
      ))}
    </fieldset>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="star-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}
