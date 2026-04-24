import styles from "./CarouselTrack.module.css";

export default function CarouselTrack({ className = "", trackRef, children }) {
  return (
    <div className={`${styles.root} ${className}`.trim()} ref={trackRef}>
      {children}
    </div>
  );
}
