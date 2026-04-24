import styles from "./SectionHeader.module.css";

export default function SectionHeader({
  title,
  subtitle,
  align = "left",
  accentSegments = [],
  className = "",
  titleClassName = "",
}) {
  const alignClass = align === "center" ? "is-center" : "";

  const renderTitle = () => {
    if (!accentSegments.length) return title;
    let output = title;
    accentSegments.forEach((segment) => {
      output = output.replace(segment, `__ACCENT__${segment}__ACCENT__`);
    });

    return output.split("__ACCENT__").map((part, index) =>
      accentSegments.includes(part) ? (
        <span key={`${part}-${index}`} className="hero-accent">
          {part}
        </span>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      ),
    );
  };

  return (
    <div className={`${styles.root} section-head ${alignClass} ${className}`.trim()}>
      {title ? <h2 className={titleClassName}>{renderTitle()}</h2> : null}
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
