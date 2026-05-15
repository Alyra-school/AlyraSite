import Link from "next/link";
import styles from "./PageSections.module.css";

export default function CtaRow({ actions = [] }) {
  if (!actions.length) return null;
  return (
    <div className={styles.ctaRow}>
      {actions.map((action) => (
        <Link key={`${action.label}-${action.href}`} href={action.href} className="primary">
          {action.label}
        </Link>
      ))}
    </div>
  );
}
