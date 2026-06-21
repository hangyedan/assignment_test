import "./StarRating.css";
import { useState } from "react";

type StarProps = {
  max: number;
  current: number;
  onChange: (rating: number) => void;
};

export default function StarRating({ max, current, onChange }: StarProps) {
  const [hovered, setHovered] = useState<number>(0);

  const display = hovered !== 0 ? hovered : current;

  const handleClick = (idx: number) => {
    onChange(idx);
  };
  return (
    <ul className="star-list" onMouseLeave={() => setHovered(0)}>
      {Array.from({ length: max }, (_v, i) => {
        return (
          <li
            key={i}
            onClick={() => handleClick(i + 1)}
            onMouseEnter={() => setHovered(i + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                i + 1 <= display ? "star-icon star-icon-filled" : "star-icon"
              }
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
          </li>
        );
      })}
    </ul>
  );
}
