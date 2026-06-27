import { useState } from 'react';
import Star from './Star';
import './Star.css';

interface StarRatingProps {
  maxStar: number;
  // filledStar: number;
  // newStarRating: () => void;
}

export default function StarRating({ maxStar }: StarRatingProps) {
  const [clickedStar, setClickedStar] = useState(0);
  const [isHoveredStar, setIsHoveredStar] = useState<null | number>(null);

  const starArray = Array.from({ length: maxStar });

  const activeRating = isHoveredStar !== null ? isHoveredStar : clickedStar;

  const handleFilledStar = (index: number) => {
    if (index === 0 && clickedStar === 1) {
      setClickedStar(0);
    } else {
      setClickedStar(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    setIsHoveredStar(index + 1);
  };

  const handleMouseLeave = () => {
    setIsHoveredStar(null);
  };

  return (
    <>
      {starArray.map((_, index) => (
        <button
          key={index}
          onClick={() => handleFilledStar(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <Star isFilled={index < activeRating} />
        </button>
      ))}
    </>
  );
}
