import styles from "./CarouselControls.module.css";

export default function CarouselControls({
  className = "",
  onPrev,
  onNext,
  ariaLabel,
  prevLabel,
  nextLabel,
  buttonClassName = "",
}) {
  return (
    <div className={`${styles.root} ${className}`.trim()} aria-label={ariaLabel}>
      <button type="button" className={buttonClassName} onClick={onPrev} aria-label={prevLabel}>
        ←
      </button>
      <button type="button" className={buttonClassName} onClick={onNext} aria-label={nextLabel}>
        →
      </button>
    </div>
  );
}
