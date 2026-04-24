import styles from "./CarouselFade.module.css";

export default function CarouselFade({ className = "", left = false, right = false, children }) {
  return (
    <div
      className={`${styles.root} ${className} ${left ? "has-left-fade" : ""} ${right ? "has-right-fade" : ""}`.trim()}
    >
      {children}
    </div>
  );
}
