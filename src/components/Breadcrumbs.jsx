import Link from "next/link";
import { Fragment } from "react";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Fil d'Ariane">
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${item.href ?? "current"}`}>
          {item.href ? (
            <Link className="breadcrumb-link" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="breadcrumb-sep" aria-hidden="true">
              /
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
