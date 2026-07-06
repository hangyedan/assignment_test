import "./ImageCarousel.css";
import { useState } from "react";

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePageClick = (page: number) => {
    setCurrentIndex(page);
  };

  const currentImage = images[currentIndex];

  return (
    <section className="image-carousel-container" aria-label="Image carousel">
      {/** 이미지 캐러셀 영역 */}
      <div className="image-carousel">
        <ArrowButton onClick={handleLeftArrowClick}>◀</ArrowButton>
        <figure className="carousel-content">
          <img alt={currentImage.alt} src={currentImage.src} width="100%" />
        </figure>
        <ArrowButton onClick={handleRightArrowClick}>▶</ArrowButton>
      </div>

      {/** 페이지네이션 영역 */}
      <Pagination
        onClick={handlePageClick}
        currentPage={currentIndex + 1}
        totalPages={images.length}
      />
    </section>
  );
}

export function ArrowButton({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="arrow-button"
      onClick={onClick}
      aria-label="Previous image"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

export function Pagination({
  onClick,
  currentPage,
  totalPages,
}: {
  onClick: (page: number) => void;
  currentPage: number;
  totalPages: number;
}) {
  return (
    <nav aria-label="Image pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          type="button"
          key={index}
          onClick={() => onClick(index)}
          aria-current={currentPage === index + 1 ? "page" : undefined}
          aria-label={`Go to image ${index + 1}`}
          style={{ fontWeight: currentPage === index + 1 ? "bold" : "normal" }}
        >
          {index + 1}
        </button>
      ))}
    </nav>
  );
}
