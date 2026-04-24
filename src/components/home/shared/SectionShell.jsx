import styles from "./SectionShell.module.css";

export default function SectionShell({ id, variant = "full", className = "", children }) {
  const variantClass = variant === "contained" ? "section--reduced" : "section--full";
  return (
    <section id={id} className={`${styles.root} section ${variantClass} anchor-section ${className}`.trim()}>
      {children}
    </section>
  );
}
