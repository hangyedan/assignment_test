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

  const handleFilledStar = (index: number) => {
    setClickedStar(index + 1);

    if (index === 0) setClickedStar(0);
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
          <Star
            isFilled={index < clickedStar}
            isHovered={index < isHoveredStar}
          />
        </button>
      ))}
    </>
  );
}
