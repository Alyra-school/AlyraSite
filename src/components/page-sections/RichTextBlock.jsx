import styles from "./PageSections.module.css";

export default function RichTextBlock({ children, className = "" }) {
  return <div className={`${styles.richText} ${className}`.trim()}>{children}</div>;
}
