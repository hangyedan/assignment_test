import { useState } from "react";
import styles from "./ImageCarousel.module.css";

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const prevIndex =
      currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const handlePagination = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handlePrev}
        className={`${styles.button} ${styles.prev}`}
      >
        prev
      </button>

      <ul
        className={`${styles.carousel}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map(({ src, alt }) => (
          <li key={src} className={styles.slide}>
            <img className={styles.img} src={src} alt={alt} />
          </li>
        ))}
      </ul>

      <button
        onClick={handleNext}
        className={`${styles.button} ${styles.next}`}
      >
        next
      </button>

      <ul className={styles.pagination}>
        {images.map((_, i) => (
          <li>
            <button
              className={i === currentIndex ? styles.active : null}
              onClick={() => handlePagination(i)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
