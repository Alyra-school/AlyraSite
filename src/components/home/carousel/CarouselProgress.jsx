import styles from "./CarouselProgress.module.css";

export default function CarouselProgress({ className = "", meter }) {
  return (
    <div className={`${styles.root} ${className}`.trim()} aria-hidden="true">
      <span
        style={{
          width: `${(meter.width * 100).toFixed(2)}%`,
          left: `${(meter.left * 100).toFixed(2)}%`,
        }}
      />
    </div>
  );
}
