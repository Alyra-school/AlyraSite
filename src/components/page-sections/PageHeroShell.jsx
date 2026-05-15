import styles from "./PageSections.module.css";

export default function PageHeroShell({ children, className = "" }) {
  return <header className={`${styles.heroShell} ${className}`.trim()}>{children}</header>;
}
