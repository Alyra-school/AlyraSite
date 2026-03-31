import { useEffect } from "react";

function upsertMeta(nameOrProperty, content, byProperty = false) {
  const selector = byProperty
    ? `meta[property="${nameOrProperty}"]`
    : `meta[name="${nameOrProperty}"]`;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    if (byProperty) node.setAttribute("property", nameOrProperty);
    else node.setAttribute("name", nameOrProperty);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertCanonical(href) {
  let node = document.head.querySelector('link[rel="canonical"]');
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", "canonical");
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

function upsertStructuredData(data) {
  const id = "structured-data-jsonld";
  let node = document.head.querySelector(`#${id}`);

  if (!data) {
    if (node) node.remove();
    return;
  }

  if (!node) {
    node = document.createElement("script");
    node.setAttribute("id", id);
    node.setAttribute("type", "application/ld+json");
    document.head.appendChild(node);
  }

  node.textContent = JSON.stringify(data);
}

export default function useDocumentMeta({ title, description, structuredData }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      upsertMeta("description", description);
      upsertMeta("og:description", description, true);
      upsertMeta("twitter:description", description);
    }

    if (title) {
      upsertMeta("og:title", title, true);
      upsertMeta("twitter:title", title);
    }

    upsertMeta("og:type", "website", true);
    upsertMeta("og:url", window.location.href, true);
    upsertMeta("twitter:card", "summary_large_image");

    upsertCanonical(window.location.href);
    upsertStructuredData(structuredData);
  }, [title, description, structuredData]);
}
