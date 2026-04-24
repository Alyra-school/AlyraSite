import styles from "./IconRenderer.module.css";

export default function IconRenderer({ name, className = "", decorative = true }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": decorative ? "true" : undefined,
  };

  if (name === "loop") {
    return (
      <svg className={`${styles.root} ${className}`.trim()} {...props}>
        <path d="M7 7h5V2" />
        <path d="M17 17h-5v5" />
        <path d="M17 7a7 7 0 0 0-11 2" />
        <path d="M7 17a7 7 0 0 0 11-2" />
      </svg>
    );
  }

  const map = {
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 4v3M20 12h-3" /></>,
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 5 5" /></>,
    puzzle: <><path d="M9 4h3v2a2 2 0 1 0 4 0V4h3v5h-2a2 2 0 1 0 0 4h2v5h-5v-2a2 2 0 1 0-4 0v2H5v-5h2a2 2 0 1 0 0-4H5V4h4z" /></>,
    bars: <><path d="M4 20v-4M10 20V10M16 20V6M22 20V2" /></>,
    brain: <><path d="M9 4a3 3 0 0 0-3 3v1a2 2 0 0 0-2 2 2 2 0 0 0 2 2v1a3 3 0 0 0 3 3h1v-2H9a1 1 0 0 1-1-1v-1h2V8H8V7a1 1 0 0 1 1-1h1V4z" /><path d="M15 4a3 3 0 0 1 3 3v1a2 2 0 0 1 2 2 2 2 0 0 1-2 2v1a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-1h-2V8h2V7a1 1 0 0 0-1-1h-1V4z" /><path d="M10 10h4M10 14h4" /></>,
    scale: <><path d="M12 4v16M6 7h12M7 7l-3 5h6l-3-5zm10 0-3 5h6l-3-5zM8 20h8" /></>,
    cubes: <><path d="M12 3 7 6v6l5 3 5-3V6l-5-3zM7 6 2 9v6l5 3M17 6l5 3v6l-5 3" /></>,
    wrench: <><path d="M22 6.5a5 5 0 0 1-6.6 4.7l-7.8 7.8a2 2 0 1 1-2.8-2.8l7.8-7.8A5 5 0 0 1 17.5 2l-2.2 2.2 2.5 2.5L22 4.5z" /></>,
    sync: <><path d="M3 12a7 7 0 0 1 12-4M21 12a7 7 0 0 1-12 4M15 3v5h5M9 21v-5H4" /></>,
    gear: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 3a7 7 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.3 3h5l.3-3a7 7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5c.1-.3.1-.7.1-1z" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" /></>,
    data: <><path d="M3 5h7v7H3zM14 12h7v7h-7zM14 5h7M3 19h7M7 12v7M17 5v7" /></>,
    robot: <><rect x="5" y="8" width="14" height="10" rx="3" /><circle cx="10" cy="13" r="1" /><circle cx="14" cy="13" r="1" /><path d="M12 8V5M8 18v2M16 18v2M3 11v4M21 11v4" /></>,
  };

  return (
    <svg className={`${styles.root} ${className}`.trim()} {...props}>
      {map[name] || <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
