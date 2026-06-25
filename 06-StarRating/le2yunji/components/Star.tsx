import StarIcon from "./StarIcon";

type StarProps = {
  filled: boolean;
  ratingValue: number;
  onHover: (ratingValue: number) => void;
  onClick: (ratingValue: number) => void;
};

export default function Star({
  filled,
  ratingValue,
  onHover,
  onClick,
}: StarProps) {
  return (
    <button
      type="button"
      className="star-button"
      onMouseEnter={() => onHover(ratingValue)}
      onClick={() => onClick(ratingValue)}
      aria-label={`${ratingValue}점 선택`}
    >
      <StarIcon filled={filled} />
    </button>
  );
}
