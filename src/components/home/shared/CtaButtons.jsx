import Link from "next/link";
import styles from "./CtaButtons.module.css";

export default function CtaButtons({ items, className = "" }) {
  return (
    <div className={`${styles.row} ${className}`.trim()}>
      {items.map((item) => (
        <Link key={item.id} href={item.href} className={item.className}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
