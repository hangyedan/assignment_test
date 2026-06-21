import { useState } from 'react';
import Star from './Star';
import './Star.css';

interface StarRatingProps {
  maxStar: number;
  filledStar: number;
  // newStarRating: () => void;
}

export default function StarRating() {
  const [isFilledStar, setIsFilledStar] = useState(true);

  const handleFilledStar = () => {
    setIsFilledStar((prev) => !prev);
  };

  return (
    <button onClick={handleFilledStar}>
      <Star isFilled={isFilledStar} />
    </button>
  );
}
