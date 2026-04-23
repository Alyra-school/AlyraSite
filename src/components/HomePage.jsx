"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  expertsCarousel,
  learnerReviewsCarousel,
  latestNews,
  modularLearningCards,
  pedagogicalBlockchainColumns,
  pedagogicalIaColumns,
  parcoursBlockchain,
  parcoursEntreprise,
  parcoursIA,
  pressLogos,
  recruiterCompanies,
} from "../data/homeData";

function PedagogyIcon({ name }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (name) {
    case "target":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 4v3M20 12h-3" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6" />
          <path d="m16 16 5 5" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...props}>
          <path d="M9 4h3v2a2 2 0 1 0 4 0V4h3v5h-2a2 2 0 1 0 0 4h2v5h-5v-2a2 2 0 1 0-4 0v2H5v-5h2a2 2 0 1 0 0-4H5V4h4z" />
        </svg>
      );
    case "bars":
      return (
        <svg {...props}>
          <path d="M4 20v-4M10 20V10M16 20V6M22 20V2" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <path d="M9 4a3 3 0 0 0-3 3v1a2 2 0 0 0-2 2 2 2 0 0 0 2 2v1a3 3 0 0 0 3 3h1v-2H9a1 1 0 0 1-1-1v-1h2V8H8V7a1 1 0 0 1 1-1h1V4z" />
          <path d="M15 4a3 3 0 0 1 3 3v1a2 2 0 0 1 2 2 2 2 0 0 1-2 2v1a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-1h-2V8h2V7a1 1 0 0 0-1-1h-1V4z" />
          <path d="M10 10h4M10 14h4" />
        </svg>
      );
    case "scale":
      return (
        <svg {...props}>
          <path d="M12 4v16M6 7h12M7 7l-3 5h6l-3-5zm10 0-3 5h6l-3-5zM8 20h8" />
        </svg>
      );
    case "cubes":
      return (
        <svg {...props}>
          <path d="M12 3 7 6v6l5 3 5-3V6l-5-3zM7 6 2 9v6l5 3M17 6l5 3v6l-5 3" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...props}>
          <path d="M22 6.5a5 5 0 0 1-6.6 4.7l-7.8 7.8a2 2 0 1 1-2.8-2.8l7.8-7.8A5 5 0 0 1 17.5 2l-2.2 2.2 2.5 2.5L22 4.5z" />
        </svg>
      );
    case "sync":
      return (
        <svg {...props}>
          <path d="M3 12a7 7 0 0 1 12-4M21 12a7 7 0 0 1-12 4M15 3v5h5M9 21v-5H4" />
        </svg>
      );
    case "gear":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 3a7 7 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.3 3h5l.3-3a7 7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5c.1-.3.1-.7.1-1z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
        </svg>
      );
    case "data":
      return (
        <svg {...props}>
          <path d="M3 5h7v7H3zM14 12h7v7h-7zM14 5h7M3 19h7M7 12v7M17 5v7" />
        </svg>
      );
    case "robot":
      return (
        <svg {...props}>
          <rect x="5" y="8" width="14" height="10" rx="3" />
          <circle cx="10" cy="13" r="1" />
          <circle cx="14" cy="13" r="1" />
          <path d="M12 8V5M8 18v2M16 18v2M3 11v4M21 11v4" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

export default function HomePage() {
  const orbitRef = useRef(null);
  const pedagogyTrackRef = useRef(null);
  const expertsTrackRef = useRef(null);
  const feedbackTrackRef = useRef(null);
  const expertsAutoPlayPausedRef = useRef(false);
  const feedbackAutoPlayPausedRef = useRef(false);
  const [pedagogyMeter, setPedagogyMeter] = useState({ width: 1, left: 0 });
  const [pedagogyFadeState, setPedagogyFadeState] = useState({ left: false, right: true });
  const [expertsFadeState, setExpertsFadeState] = useState({ left: false, right: true });
  const [feedbackFadeState, setFeedbackFadeState] = useState({ left: false, right: true });

  const pedagogyColumns = [...pedagogicalBlockchainColumns, ...pedagogicalIaColumns];
  const splitPedagogyTitle = useCallback((title) => {
    const words = title.trim().split(/\s+/);
    if (words.length < 2) return [title, ""];
    const splitIndex = Math.ceil(words.length / 2);
    return [words.slice(0, splitIndex).join(" "), words.slice(splitIndex).join(" ")];
  }, []);
  const expertsTrackItems =
    expertsCarousel.length > 1
      ? [...expertsCarousel, ...expertsCarousel, ...expertsCarousel]
      : expertsCarousel;
  const feedbackTrackItems =
    learnerReviewsCarousel.length > 1
      ? [...learnerReviewsCarousel, ...learnerReviewsCarousel, ...learnerReviewsCarousel]
      : learnerReviewsCarousel;
  const pressTrackItems =
    pressLogos.length > 1
      ? [...pressLogos, ...pressLogos, ...pressLogos, ...pressLogos]
      : pressLogos;
  const financingSupportLogos = [
    { name: "Mon Compte Formation", logo: "/inspired/finance/cpf.png" },
    { name: "Atlas", logo: "/inspired/cert/atlas.png" },
    { name: "Federation Syntec", label: "FEDERATION SYNTEC" },
    { name: "Cinov", label: "cinov" },
    { name: "France Travail", label: "France Travail" },
    { name: "Transitions Pro", logo: "/inspired/finance/transitions.png" },
    { name: "AGEFICE", logo: "/inspired/finance/agefice.jpg" },
    { name: "AFDAS", logo: "/inspired/finance/afdas.png" },
    { name: "Opcommerce", logo: "/inspired/finance/opcommerce.png" },
  ];
  const whyLearnHighlights = [
    {
      id: "growth",
      title: (
        <>
          Des domaines en <span>pleine croissance</span>
        </>
      ),
      body: "Les volumes de donnees explosent : +50% d'ici 2025 avec l'IA et le cloud hybride",
      source: "Source : Second Observatoire des DSI",
    },
    {
      id: "demand",
      title: (
        <>
          Une forte <span>demande</span>
        </>
      ),
      body: "Les entreprises investissent 550 milliards $ en IA en 2024, mais manquent de talents.",
      source: "Source : Reuters",
    },
    {
      id: "skills-gap",
      title: (
        <>
          Un manque de <span>profils qualifies</span>
        </>
      ),
      body: "La France compte 11701 emplois dans la blockchain, mais les entreprises peinent a recruter : plus de 80 % declarent manquer de profils qualifies.",
      source: "Source : Coincub/Opiiec",
    },
  ];
  const freeCoursesChecklist = [
    {
      id: "bitcoin",
      lead: "Comprendre",
      text: "le fonctionnement de Bitcoin, Ethereum et des smart contracts",
    },
    {
      id: "use-cases",
      lead: "Analyser",
      text: "les cas d'usage reels de la blockchain",
    },
    {
      id: "ai",
      lead: "Decoder",
      text: "les enjeux de l'IA generative dans le monde professionnel",
    },
    {
      id: "opportunities",
      lead: "Identifier",
      text: "les opportunites d'evolution dans le Web3 et l'IA",
    },
  ];
  const alyraTeamGrid = [
    { id: "helene", name: "Helene Bunel", role: "CEO", avatar: "/inspired/team/ph.avif" },
    { id: "daniel", name: "Daniel Villa Monteiro", role: "Directeur pedagogique", avatar: "/inspired/team/daniel.avif" },
    { id: "gaetan-c", name: "Gaetan Corcoral", role: "Directeur commercial et marketing", avatar: "/inspired/team/corco.avif" },
    { id: "nolwenn", name: "Nolwenn Bigot", role: "Responsable certification", avatar: "/inspired/team/christian.avif" },
    { id: "nadjalen", name: "Nadjalen Rousseaux", role: "Coordinatrice pedagogique", avatar: "/inspired/team/cyril.avif" },
    { id: "audrey", name: "Audrey Frumence", role: "Ingenieure pedagogique", avatar: "/inspired/team/christian.avif" },
    { id: "clement", name: "Clement Pepin", role: "Conseiller en formation", avatar: "/inspired/team/corco.avif" },
    { id: "nawel", name: "Nawel Ben baba", role: "Developpement commercial et marketing", avatar: "/inspired/team/ph.avif" },
    { id: "guillaume", name: "Guillaume Rech", role: "Growth Hacker", avatar: "/inspired/team/cyril.avif" },
    { id: "gaetan-s", name: "Gaetan Semp", role: "Formateur Consultant/DeFi", avatar: "/inspired/team/gaetan.avif" },
    { id: "cyril", name: "Cyril Castagnet", role: "Formateur referent developpeur blockchain", avatar: "/inspired/team/cyril.avif" },
    { id: "ben", name: "Ben BK", role: "Formateur Developpeur", avatar: "/inspired/team/corco.avif" },
    { id: "virgile", name: "Virgile Heruaux", role: "Redacteur", avatar: "/inspired/team/ph.avif" },
    { id: "marwan", name: "Marwan Madani", role: "Developpement Marketing et Data", avatar: "/inspired/team/christian.avif" },
    { id: "eloise", name: "Eloise Kanel Cupidin", role: "Adjointe administratif & financier", avatar: "/inspired/team/ph.avif" },
    { id: "jerome", name: "Jerome Hortelano", role: "Conseiller en formation", avatar: "/inspired/team/daniel.avif" },
    { id: "mickael", name: "Mickael Faust", role: "Auteur - Formation intelligence artificielle", avatar: "/inspired/team/daniel.avif" },
    { id: "jeremie", name: "Jeremie Karsenty", role: "Auteur - Formation intelligence artificielle", avatar: "/inspired/team/corco.avif" },
    { id: "pascal", name: "Pascal Tallarida", role: "Auteur - Formation Finance Decentralisee", avatar: "/inspired/team/ph.avif" },
  ];

  const getExpertsMetrics = useCallback((container) => {
    if (!container || expertsCarousel.length <= 1) return null;
    const cards = container.querySelectorAll(".expert-card");
    const total = expertsCarousel.length;
    if (cards.length < total * 3) return null;

    const style = window.getComputedStyle(container);
    const paddingLeft = Number.parseFloat(style.paddingLeft || "0") || 0;
    const getPos = (index) => cards[index].offsetLeft - paddingLeft;

    const copyStart0 = getPos(0);
    const copyStart1 = getPos(total);
    const copyStart2 = getPos(total * 2);
    const step = Math.max(1, getPos(1) - copyStart0);
    const segmentWidth = Math.max(1, copyStart1 - copyStart0);

    return {
      copyStart0,
      copyStart1,
      copyStart2,
      segmentWidth,
      step,
    };
  }, []);

  const normalizeExpertsLoop = useCallback((container) => {
    if (!container || expertsCarousel.length <= 1) return;
    const metrics = getExpertsMetrics(container);
    if (!metrics) return;
    const current = container.scrollLeft;
    const headBoundary = (metrics.copyStart0 + metrics.copyStart1) / 2;
    const tailBoundary = (metrics.copyStart1 + metrics.copyStart2) / 2;

    if (current < headBoundary) {
      container.scrollLeft = current + metrics.segmentWidth;
    } else if (current > tailBoundary) {
      container.scrollLeft = current - metrics.segmentWidth;
    }
  }, [getExpertsMetrics]);

  const scrollExpertsByCard = useCallback((direction) => {
    const container = expertsTrackRef.current;
    if (!container) return;
    const metrics = getExpertsMetrics(container);
    if (!metrics) return;
    container.scrollBy({ left: direction * metrics.step, behavior: "smooth" });
  }, [getExpertsMetrics]);

  const getFeedbackMetrics = useCallback((container) => {
    if (!container || learnerReviewsCarousel.length <= 1) return null;
    const cards = container.querySelectorAll(".feedback-card");
    const total = learnerReviewsCarousel.length;
    if (cards.length < total * 3) return null;

    const style = window.getComputedStyle(container);
    const paddingLeft = Number.parseFloat(style.paddingLeft || "0") || 0;
    const getPos = (index) => cards[index].offsetLeft - paddingLeft;

    const copyStart0 = getPos(0);
    const copyStart1 = getPos(total);
    const copyStart2 = getPos(total * 2);
    const step = Math.max(1, getPos(1) - copyStart0);
    const segmentWidth = Math.max(1, copyStart1 - copyStart0);

    return {
      copyStart0,
      copyStart1,
      copyStart2,
      segmentWidth,
      step,
    };
  }, []);

  const normalizeFeedbackLoop = useCallback((container) => {
    if (!container || learnerReviewsCarousel.length <= 1) return;
    const metrics = getFeedbackMetrics(container);
    if (!metrics) return;
    const current = container.scrollLeft;
    const headBoundary = (metrics.copyStart0 + metrics.copyStart1) / 2;
    const tailBoundary = (metrics.copyStart1 + metrics.copyStart2) / 2;

    if (current < headBoundary) {
      container.scrollLeft = current + metrics.segmentWidth;
    } else if (current > tailBoundary) {
      container.scrollLeft = current - metrics.segmentWidth;
    }
  }, [getFeedbackMetrics]);

  const scrollFeedbackByCard = useCallback((direction) => {
    const container = feedbackTrackRef.current;
    if (!container) return;
    const metrics = getFeedbackMetrics(container);
    if (!metrics) return;
    container.scrollBy({ left: direction * metrics.step, behavior: "smooth" });
  }, [getFeedbackMetrics]);
  const scrollCarousel = (ref, direction) => {
    const container = ref.current;
    if (!container) return;
    container.scrollBy({
      left: direction * Math.max(280, container.clientWidth * 0.9),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const layeredItems = Array.from(orbit.querySelectorAll("[data-depth]"));
    const MAX_OFFSET = 11;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = null;

    const getNumber = (value, fallback) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    const updateFromPointer = (event) => {
      const rect = orbit.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-1, Math.min(1, px * 2));
      targetY = Math.max(-1, Math.min(1, py * 2));
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = (timestamp) => {
      const time = timestamp / 1000;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      layeredItems.forEach((item, index) => {
        const depth = getNumber(item.getAttribute("data-depth"), 0);
        const xMult = getNumber(item.getAttribute("data-xmult"), index % 2 === 0 ? 1 : -1);
        const yMult = getNumber(item.getAttribute("data-ymult"), index % 3 === 0 ? -1 : 1);
        const drift = getNumber(item.getAttribute("data-drift"), 2.2);
        const speed = getNumber(item.getAttribute("data-speed"), 0.9);
        const phase = getNumber(item.getAttribute("data-phase"), index * 0.6);

        const pointerX = currentX * depth * MAX_OFFSET * xMult;
        const pointerY = currentY * depth * MAX_OFFSET * yMult;
        const idleX = Math.sin(time * speed + phase) * drift;
        const idleY = Math.cos(time * speed * 0.9 + phase) * (drift * 0.8);
        const tx = pointerX + idleX;
        const ty = pointerY + idleY;

        item.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
      });

      frameId = window.requestAnimationFrame(animate);
    };

    orbit.addEventListener("pointermove", updateFromPointer);
    orbit.addEventListener("pointerleave", reset);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      orbit.removeEventListener("pointermove", updateFromPointer);
      orbit.removeEventListener("pointerleave", reset);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    const setupDragScroll = (container, onScroll) => {
      if (!container) return () => {};

      let activePointerId = null;
      let dragIntent = "idle";
      let pointerStartX = 0;
      let pointerStartY = 0;
      let pointerLastX = 0;
      let didDrag = false;
      const DRAG_THRESHOLD = 6;

      const updateScroll = () => {
        if (onScroll) onScroll(container);
      };

      const handlePointerDown = (event) => {
        if (event.pointerType !== "touch" && event.button !== 0) return;
        activePointerId = event.pointerId;
        dragIntent = "pending";
        didDrag = false;
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        pointerLastX = event.clientX;
        if (container.setPointerCapture) {
          container.setPointerCapture(event.pointerId);
        }
      };

      const handlePointerMove = (event) => {
        if (activePointerId !== event.pointerId) return;

        const deltaX = event.clientX - pointerStartX;
        const deltaY = event.clientY - pointerStartY;

        if (dragIntent === "pending") {
          if (Math.abs(deltaX) < DRAG_THRESHOLD && Math.abs(deltaY) < DRAG_THRESHOLD) {
            return;
          }

          if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            dragIntent = "horizontal";
            didDrag = true;
            container.classList.add("is-dragging");
          } else {
            dragIntent = "vertical";
            return;
          }
        }

        if (dragIntent !== "horizontal") return;

        const dx = event.clientX - pointerLastX;
        pointerLastX = event.clientX;
        if (Math.abs(dx) < 0.5) return;

        didDrag = true;
        if (event.cancelable) {
          event.preventDefault();
        }
        container.scrollLeft -= dx;
      };

      const releaseDrag = (event) => {
        if (activePointerId !== event.pointerId) return;
        if (dragIntent === "horizontal") {
          container.classList.remove("is-dragging");
          updateScroll();
        }
        activePointerId = null;
        dragIntent = "idle";
      };

      const handlePointerCancel = (event) => {
        if (activePointerId !== event.pointerId) return;
        container.classList.remove("is-dragging");
        activePointerId = null;
        dragIntent = "idle";
      };

      const handleLostPointerCapture = () => {
        container.classList.remove("is-dragging");
        activePointerId = null;
        dragIntent = "idle";
      };

      const handleClickCapture = (event) => {
        if (!didDrag) return;
        event.preventDefault();
        event.stopPropagation();
        didDrag = false;
      };

      container.addEventListener("pointerdown", handlePointerDown);
      container.addEventListener("pointermove", handlePointerMove, { passive: false });
      container.addEventListener("pointerup", releaseDrag);
      container.addEventListener("pointercancel", handlePointerCancel);
      container.addEventListener("lostpointercapture", handleLostPointerCapture);
      container.addEventListener("click", handleClickCapture, true);
      container.addEventListener("scroll", updateScroll, { passive: true });
      updateScroll();

      return () => {
        container.removeEventListener("pointerdown", handlePointerDown);
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerup", releaseDrag);
        container.removeEventListener("pointercancel", handlePointerCancel);
        container.removeEventListener("lostpointercapture", handleLostPointerCapture);
        container.removeEventListener("click", handleClickCapture, true);
        container.removeEventListener("scroll", updateScroll);
      };
    };

    const cleanupPedagogy = setupDragScroll(pedagogyTrackRef.current, (container) => {
      const maxScroll = Math.max(1, container.scrollWidth - container.clientWidth);
      const thumbWidth = Math.min(1, container.clientWidth / Math.max(container.scrollWidth, 1));
      const leftRatio = container.scrollLeft / maxScroll;
      const canScroll = container.scrollWidth - container.clientWidth > 2;
      const hasLeft = canScroll && container.scrollLeft > 2;
      const hasRight = canScroll && container.scrollLeft < maxScroll - 2;

      setPedagogyMeter({
        width: thumbWidth,
        left: leftRatio * (1 - thumbWidth),
      });
      setPedagogyFadeState({ left: hasLeft, right: hasRight });
    });

    const cleanupExperts = setupDragScroll(expertsTrackRef.current, (container) => {
      const metrics = getExpertsMetrics(container);
      if (!metrics) {
        setExpertsFadeState({ left: false, right: false });
        return;
      }
      let logical = container.scrollLeft - metrics.copyStart1;
      while (logical < 0) logical += metrics.segmentWidth;
      while (logical >= metrics.segmentWidth) logical -= metrics.segmentWidth;
      const hasLeft = logical > 2;
      const hasRight = logical < metrics.segmentWidth - 2;
      setExpertsFadeState({ left: hasLeft, right: hasRight });
    });

    const cleanupFeedback = setupDragScroll(feedbackTrackRef.current, (container) => {
      const metrics = getFeedbackMetrics(container);
      if (!metrics) {
        setFeedbackFadeState({ left: false, right: false });
        return;
      }
      let logical = container.scrollLeft - metrics.copyStart1;
      while (logical < 0) logical += metrics.segmentWidth;
      while (logical >= metrics.segmentWidth) logical -= metrics.segmentWidth;
      const hasLeft = logical > 2;
      const hasRight = logical < metrics.segmentWidth - 2;
      setFeedbackFadeState({ left: hasLeft, right: hasRight });
    });

    const expertsTrack = expertsTrackRef.current;
    const feedbackTrack = feedbackTrackRef.current;
    let cleanupLoopListeners = () => {};
    let cleanupFeedbackLoopListeners = () => {};

    if (expertsTrack && expertsCarousel.length > 1) {
      const setInitialPosition = () => {
        const metrics = getExpertsMetrics(expertsTrack);
        if (!metrics) return;
        expertsTrack.scrollLeft = metrics.copyStart1;
      };

      requestAnimationFrame(setInitialPosition);
      const handleExpertsScroll = () => normalizeExpertsLoop(expertsTrack);
      const handlePointerDown = () => {
        expertsAutoPlayPausedRef.current = true;
      };
      const handlePointerUp = () => {
        expertsAutoPlayPausedRef.current = false;
      };
      const handleMouseEnter = () => {
        expertsAutoPlayPausedRef.current = true;
      };
      const handleMouseLeave = () => {
        expertsAutoPlayPausedRef.current = false;
      };
      const handleWindowResize = () => normalizeExpertsLoop(expertsTrack);

      expertsTrack.addEventListener("scroll", handleExpertsScroll, { passive: true });
      expertsTrack.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
      expertsTrack.addEventListener("mouseenter", handleMouseEnter);
      expertsTrack.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("resize", handleWindowResize);

      cleanupLoopListeners = () => {
        expertsTrack.removeEventListener("scroll", handleExpertsScroll);
        expertsTrack.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        expertsTrack.removeEventListener("mouseenter", handleMouseEnter);
        expertsTrack.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("resize", handleWindowResize);
      };
    }

    if (feedbackTrack && learnerReviewsCarousel.length > 1) {
      const setInitialPosition = () => {
        const metrics = getFeedbackMetrics(feedbackTrack);
        if (!metrics) return;
        feedbackTrack.scrollLeft = metrics.copyStart1;
      };

      requestAnimationFrame(setInitialPosition);
      const handleFeedbackScroll = () => normalizeFeedbackLoop(feedbackTrack);
      const handlePointerDown = () => {
        feedbackAutoPlayPausedRef.current = true;
      };
      const handlePointerUp = () => {
        feedbackAutoPlayPausedRef.current = false;
      };
      const handleMouseEnter = () => {
        feedbackAutoPlayPausedRef.current = true;
      };
      const handleMouseLeave = () => {
        feedbackAutoPlayPausedRef.current = false;
      };
      const handleWindowResize = () => normalizeFeedbackLoop(feedbackTrack);

      feedbackTrack.addEventListener("scroll", handleFeedbackScroll, { passive: true });
      feedbackTrack.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
      feedbackTrack.addEventListener("mouseenter", handleMouseEnter);
      feedbackTrack.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("resize", handleWindowResize);

      cleanupFeedbackLoopListeners = () => {
        feedbackTrack.removeEventListener("scroll", handleFeedbackScroll);
        feedbackTrack.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        feedbackTrack.removeEventListener("mouseenter", handleMouseEnter);
        feedbackTrack.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("resize", handleWindowResize);
      };
    }

    return () => {
      cleanupPedagogy();
      cleanupExperts();
      cleanupFeedback();
      cleanupLoopListeners();
      cleanupFeedbackLoopListeners();
    };
  }, [getExpertsMetrics, normalizeExpertsLoop, getFeedbackMetrics, normalizeFeedbackLoop]);

  useEffect(() => {
    if (expertsCarousel.length <= 1) return undefined;
    const id = window.setInterval(() => {
      if (expertsAutoPlayPausedRef.current) return;
      scrollExpertsByCard(1);
    }, 4000);
    return () => window.clearInterval(id);
  }, [scrollExpertsByCard]);

  useEffect(() => {
    if (learnerReviewsCarousel.length <= 1) return undefined;
    const id = window.setInterval(() => {
      if (feedbackAutoPlayPausedRef.current) return;
      scrollFeedbackByCard(1);
    }, 4000);
    return () => window.clearInterval(id);
  }, [scrollFeedbackByCard]);

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-proof">
              <span>4.9 sur 5 sur Trustpilot</span>
              <span>★★★★★ Excellent</span>
            </div>
            <h1>
              La Blockchain et l'IA ne vous remplaceront pas.
              <br />
              <span className="hero-accent">A une condition, les maitriser.</span>
            </h1>
            <p className="hero-sub">
              Rejoignez Alyra pour des formations certifiantes 100% en ligne.
              Transformez votre curiosite en carriere avec des experts du terrain.
            </p>
            <div className="hero-webinars">
              <Link href="/rendez-vous" className="webinar-card webinar-link">
                <span className="webinar-play">▶</span>
                <span>
                  <strong>Webinar Parcours Blockchain</strong>
                  <small>Inscriptions gratuites</small>
                </span>
              </Link>
              <Link href="/rendez-vous" className="webinar-card webinar-link">
                <span className="webinar-play">▶</span>
                <span>
                  <strong>Webinar Parcours IA</strong>
                  <small>Inscriptions gratuites</small>
                </span>
              </Link>
            </div>
          </div>
          <div className="hero-orbit" aria-hidden="true" ref={orbitRef}>
            <div className="orbit-ring"></div>
            <div className="orbit-center" data-depth="0.1" data-drift="1.2" data-speed="0.6" data-phase="0.4">
              <img src="/symbole_blanc.svg" alt="" />
            </div>
            <Link href="/programmes/dev-blockchain" className="orbit-pill orbit-pill-1" data-depth="0.38" data-xmult="1" data-ymult="-0.9" data-drift="2.2" data-speed="0.7" data-phase="0.2">
              Developpement blockchain
            </Link>
            <Link href="/programmes/finance-decentralisee" className="orbit-pill orbit-pill-2" data-depth="0.5" data-xmult="-0.8" data-ymult="1" data-drift="2.8" data-speed="0.95" data-phase="0.9">
              Finance decentralisee
            </Link>
            <Link href="/programmes/expert-blockchain" className="orbit-pill orbit-pill-3" data-depth="0.45" data-xmult="-1" data-ymult="-0.7" data-drift="2.4" data-speed="0.85" data-phase="1.5">
              Consulting blockchain
            </Link>
            <Link href="/programmes/consultant-intelligence-artificielle" className="orbit-pill orbit-pill-4" data-depth="0.52" data-xmult="0.9" data-ymult="0.8" data-drift="2.6" data-speed="1.05" data-phase="2.2">
              Consulting IA
            </Link>
            <Link href="/programmes/developpeur-intelligence-artificielle" className="orbit-pill orbit-pill-5" data-depth="0.42" data-xmult="0.75" data-ymult="-1" data-drift="2.3" data-speed="0.8" data-phase="2.8">
              Developpement IA
            </Link>
            <span className="orbit-dot orbit-dot-1" data-depth="0.5" data-xmult="0.7" data-ymult="-0.8" data-drift="2.2" data-speed="0.95" data-phase="0.4"></span>
            <span className="orbit-dot orbit-dot-2" data-depth="0.48" data-xmult="-0.9" data-ymult="0.65" data-drift="2.1" data-speed="1.05" data-phase="1.8"></span>
            <span className="orbit-dot orbit-dot-3" data-depth="0.52" data-xmult="0.8" data-ymult="0.9" data-drift="2.3" data-speed="1.1" data-phase="2.2"></span>
          </div>
        </div>
      </header>

      <section className="section section--full anchor-section">
        <div className="section-head">
          <h2>Nos +2 500 apprenants sont demandes par</h2>
        </div>
        <div className="company-marquee">
          <div className="company-track">
            {[...recruiterCompanies, ...recruiterCompanies].map((company, index) => (
              <article key={`${company.name}-${index}`} className="company-item company-item-marquee">
                <img src={company.logo} alt={`Logo ${company.name}`} loading="lazy" decoding="async" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--reduced employability-section anchor-section">
        <div className="section-head employability-head">
          <h2>
            Propulsez votre <span className="hero-accent">vie professionnelle & personnelle</span>
          </h2>
          <p>
            En maitrisant de nouvelles <span className="hero-accent">competences recherchees</span> sur le
            marche du travail
          </p>
        </div>

        <div className="employability-stack">
          <div className="employability-row">
            <article className="employability-badge-card">
              <div className="employability-badge employability-badge-salary">
                <strong>+56%</strong>
                <span>de plus sur votre salaire</span>
              </div>
            </article>
            <article className="employability-copy">
              <h3>Selon PwC</h3>
              <ul className="simple-list">
                <li>
                  <strong>+56 %</strong> en moyenne pour les pros de l'IA
                </li>
                <li>
                  <strong>Une demande</strong> qui ne cesse de croitre
                </li>
                <li>
                  <strong>Un ecart salarial</strong> marque avec les autres
                </li>
              </ul>
            </article>
          </div>

          <div className="employability-row employability-row-reverse">
            <article className="employability-copy">
              <h3>Selon Opiiec</h3>
              <ul className="simple-list">
                <li>
                  <strong>+175% de croissance</strong> du secteur blockchain d'ici 2028
                </li>
                <li>
                  <strong>10 475 emplois</strong> prevus en France
                </li>
                <li>
                  <strong>Une montee en puissance</strong> du Web3
                </li>
              </ul>
              <p className="employability-source">Source : Opiiec</p>
            </article>
            <article className="employability-badge-card">
              <div className="employability-badge employability-badge-jobs">
                <strong>+175%</strong>
                <span>d'offres d'emploi</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="programmes" className="section section--full anchor-section">
        <div className="modular-learning-surface">
          <div className="section-head modular-learning-head">
            <h2>Un parcours complet et modulable</h2>
            <p>
              Choisissez entre <span className="hero-accent">autonomie, coaching et lives</span> pour progresser
              a votre rythme, <span className="hero-accent">jusqu'a 144h de formation.</span>
            </p>
          </div>

          <div className="modular-learning-grid">
            {modularLearningCards.map((item) => (
              <article key={item.title} className="modular-learning-shell">
                <div className={`modular-learning-card ${item.variant === "clock" ? "is-clock" : ""}`}>
                  {item.image ? (
                    <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                  ) : (
                    <div className="modular-learning-clock" aria-hidden="true">
                      <span className="clock-digit clock-digit-2">2</span>
                      <span className="clock-digit clock-digit-3">3</span>
                      <span className="clock-digit clock-digit-4">4</span>
                    </div>
                  )}
                  <div className="modular-learning-overlay" aria-hidden="true" />
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="parcours-intro">
          <h3 className="sub-section-title">Nos parcours blockchain</h3>
          <p>
            Retrouvez toutes les informations dont vous avez besoin sur
            <span className="hero-accent"> notre page Formation Cryptomonnaie</span>.
          </p>
          <p>Obtenez toutes les competences necessaires pour rejoindre l'ecosysteme blockchain.</p>
        </div>
        <div className="parcours-grid">
          {parcoursBlockchain.map((item) => (
            <article key={item.title} className="parcours-card">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              <div className="parcours-overlay">
                <h4>{item.title}</h4>
              </div>
            </article>
          ))}
        </div>

        <div className="parcours-intro">
          <h3 className="sub-section-title">Nos parcours IA</h3>
          <p>
            Retrouvez toutes les informations dont vous avez besoin sur
            <span className="hero-accent"> notre page Formation Intelligence Artificielle</span>.
          </p>
          <p>Propulsez votre carriere dans l'ere du numerique avec nos formations en IA !</p>
        </div>
        <div className={`parcours-grid ${parcoursIA.length === 2 ? "parcours-grid-two" : ""}`}>
          {parcoursIA.map((item) => (
            <article key={item.title} className="parcours-card">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              <div className="parcours-overlay">
                <h4>{item.title}</h4>
              </div>
            </article>
          ))}
        </div>

        <div className="parcours-intro">
          <h3 className="sub-section-title">Nos parcours Entreprise</h3>
          <p>
            Renforcez la <strong>competitivite</strong> de votre entreprise
            <br />
            en formant vos equipes a l'IA et a la blockchain.
          </p>
        </div>
        <div className={`parcours-grid ${parcoursEntreprise.length === 2 ? "parcours-grid-two" : ""}`}>
          {parcoursEntreprise.map((item) => (
            <article key={item.title} className="parcours-card">
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              <div className="parcours-overlay">
                <h4>{item.title}</h4>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--full pedagogy-section anchor-section">
        <div className="section-head pedagogy-head">
          <h2>
            <span className="hero-accent">Le contenu pedagogique</span> de nos formations
          </h2>
        </div>

        <div className="pedagogy-controls" aria-label="Navigation du carrousel pedagogique">
          <button
            type="button"
            className="pedagogy-arrow"
            onClick={() => scrollCarousel(pedagogyTrackRef, -1)}
            aria-label="Categorie precedente"
          >
            ←
          </button>
          <button
            type="button"
            className="pedagogy-arrow"
            onClick={() => scrollCarousel(pedagogyTrackRef, 1)}
            aria-label="Categorie suivante"
          >
            →
          </button>
        </div>

        <div
          className={`pedagogy-track-shell ${pedagogyFadeState.left ? "has-left-fade" : ""} ${
            pedagogyFadeState.right ? "has-right-fade" : ""
          }`}
        >
          <div className="pedagogy-track" ref={pedagogyTrackRef}>
            {pedagogyColumns.map((column) => {
              const [lineOne, lineTwo] = splitPedagogyTitle(column.title);
              return (
                <article key={column.key} className="pedagogy-column">
                  <h3 className="pedagogy-column-title" aria-label={column.title}>
                    <span>{lineOne}</span>
                    <span>{lineTwo}</span>
                  </h3>
                  {column.items.map((item) => (
                    <article key={item.title} className="pedagogy-card">
                      <span className="pedagogy-icon" aria-hidden="true">
                        <PedagogyIcon name={item.icon} />
                      </span>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </article>
              );
            })}
          </div>
        </div>

        <div className="pedagogy-progress" aria-hidden="true">
          <span
            style={{
              width: `${(pedagogyMeter.width * 100).toFixed(2)}%`,
              left: `${(pedagogyMeter.left * 100).toFixed(2)}%`,
            }}
          />
        </div>
      </section>

      <section className="section section--reduced certification-highlight anchor-section">
        <div className="section-head certification-highlight-head">
          <h2>
            Des formations concues pour vous mener a
            <span className="hero-accent"> la certification</span>
          </h2>
        </div>

        <div className="certification-highlight-grid">
          <article className="certification-stat-card is-solid">
            <strong>+2500</strong>
            <p>Apprenants depuis 2019</p>
          </article>

          <article className="certification-stat-card is-trust">
            <p className="trustpilot-line">
              <strong>Excellent</strong>
              <span>4.9 sur 5</span>
              <span className="trustpilot-brand">★ Trustpilot</span>
            </p>
            <p>Note des avis des apprenants sur Trust Pilot</p>
          </article>

          <article className="certification-stat-card is-solid">
            <strong>91%</strong>
            <p>personnes certifiees depuis 2019</p>
          </article>
        </div>
      </section>

      <section className="section section--full experts-section anchor-section">
        <div className="experts-surface">
          <div className="section-head experts-head">
            <h2 className="experts-title">
              Formez-vous aux cotes des
              <br />
              <span className="hero-accent">meilleurs experts de l'ecosysteme</span>
            </h2>
            <p>Tous nos referents sont, avant tout, de vrais professionnels de terrain.</p>
          </div>

          <div className="experts-controls" aria-label="Navigation du carrousel experts">
            <button type="button" onClick={() => scrollExpertsByCard(-1)} aria-label="Expert precedent">
              ←
            </button>
            <button type="button" onClick={() => scrollExpertsByCard(1)} aria-label="Expert suivant">
              →
            </button>
          </div>

          <div
            className={`experts-track-shell ${expertsFadeState.left ? "has-left-fade" : ""} ${
              expertsFadeState.right ? "has-right-fade" : ""
            }`}
          >
            <div className="experts-track" ref={expertsTrackRef}>
              {expertsTrackItems.map((expert, index) => (
                <article key={`${expert.name}-${index}`} className="expert-card">
                  <img src={expert.image} alt={expert.name} loading="lazy" decoding="async" />
                  <div className="expert-card-body">
                    <div className="expert-card-head">
                      <h3>{expert.name}</h3>
                      <a
                        href={expert.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Profil LinkedIn de ${expert.name}`}
                      >
                        in
                      </a>
                    </div>
                    <p className="expert-role">{expert.role}</p>
                    <p>{expert.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="experts-cta">
            <Link href="/rendez-vous" className="primary">
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--full feedback-section anchor-section">
        <div className="feedback-surface">
          <div className="section-head feedback-head">
            <h2>Les retours de nos apprenants</h2>
            <div className="feedback-trustpilot">
              <p className="feedback-trustpilot-brand">★ Trustpilot</p>
              <p className="feedback-trustpilot-stars">★★★★★</p>
              <p className="feedback-trustpilot-meta">
                TrustScore <strong>4.9</strong> | <u>262 avis</u>
              </p>
            </div>
          </div>

          <div className="feedback-controls" aria-label="Navigation du carrousel retours apprenants">
            <button type="button" onClick={() => scrollFeedbackByCard(-1)} aria-label="Retour precedent">
              ←
            </button>
            <button type="button" onClick={() => scrollFeedbackByCard(1)} aria-label="Retour suivant">
              →
            </button>
          </div>

          <div
            className={`feedback-track-shell ${feedbackFadeState.left ? "has-left-fade" : ""} ${
              feedbackFadeState.right ? "has-right-fade" : ""
            }`}
          >
            <div className="feedback-track" ref={feedbackTrackRef}>
              {feedbackTrackItems.map((review, index) => (
                <article key={`${review.author}-${index}`} className="feedback-card">
                  <p className="feedback-rating">
                    <strong>{review.rating}.0</strong>
                    <span>★★★★★</span>
                  </p>
                  <h3>{review.title}</h3>
                  <p>{review.text}</p>
                  <a href="#!" onClick={(event) => event.preventDefault()}>
                    Lire la suite
                  </a>
                  <footer>{review.author}</footer>
                </article>
              ))}
            </div>
          </div>

          <div className="feedback-cta">
            <Link href="/rendez-vous" className="ghost feedback-cta-btn">
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--reduced financing-section anchor-section">
        <div className="financing-layout">
          <div className="financing-copy">
            <h2>
              Formation <span>100% a distance</span>
            </h2>
            <p>
              Tous nos parcours de formation sont 100% en ligne, afin que vous puissiez les suivre d'ou vous voulez
              dans le monde.
            </p>
            <ul className="financing-points">
              <li>
                <span className="financing-point-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h5V2" />
                    <path d="M17 17h-5v5" />
                    <path d="M17 7a7 7 0 0 0-11 2" />
                    <path d="M7 17a7 7 0 0 0 11-2" />
                  </svg>
                </span>
                <strong>75% des cours sont en live</strong>
              </li>
              <li>
                <span className="financing-point-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h5V2" />
                    <path d="M17 17h-5v5" />
                    <path d="M17 7a7 7 0 0 0-11 2" />
                    <path d="M7 17a7 7 0 0 0 11-2" />
                  </svg>
                </span>
                <strong>Replays disponibles en illimite</strong>
              </li>
              <li>
                <span className="financing-point-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h5V2" />
                    <path d="M17 17h-5v5" />
                    <path d="M17 7a7 7 0 0 0-11 2" />
                    <path d="M7 17a7 7 0 0 0 11-2" />
                  </svg>
                </span>
                <strong>Projet reel pour mettre en pratique vos competences</strong>
              </li>
            </ul>
            <Link href="/rendez-vous" className="primary financing-cta-btn">
              Je prends RDV
            </Link>
          </div>
          <div className="financing-visual" aria-hidden="true">
            <div className="financing-visual-frame"></div>
            <img src="/inspired/home/hero-secondary.avif" alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="section section--reduced financing-support-section anchor-section">
        <div className="financing-support-layout">
          <div className="financing-logos-panel">
            <div className="financing-logos-grid">
              {financingSupportLogos.map((item) => (
                <article key={item.name} className="financing-logo-item" aria-label={item.name}>
                  {item.logo ? (
                    <img src={item.logo} alt={`Logo ${item.name}`} loading="lazy" decoding="async" />
                  ) : (
                    <span>{item.label}</span>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="financing-support-copy">
            <h2>
              Faites <span>financer votre formation a 100%</span>
            </h2>
            <p>
              <strong>+15 organismes de financement</strong> sont a votre disposition : Financement CPF, conventions
              SYNTEC & CINOV, OPCOAtlas, et bien d'autres...
            </p>
            <p>
              Que vous soyez salarie, entrepreneur, en reconversion ou en recherche d'emploi, votre formation peut
              etre financee a 100 %.
            </p>

            <div className="financing-payment-line">
              <p>
                Ou payez en <b>2x</b> <b>3x</b> ou <b>4x</b> avec <span>Alma</span>
              </p>
              <div className="financing-card-brands" aria-hidden="true">
                <em>VISA</em>
                <em>CB</em>
                <em>Mastercard</em>
              </div>
            </div>

            <div className="financing-support-actions">
              <Link href="/rendez-vous" className="primary financing-action-main">
                Je trouve mon financement en 1 clic
              </Link>
              <Link href="/rendez-vous" className="secondary financing-action-secondary">
                Je prends RDV
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--reduced discord-section anchor-section">
        <div className="discord-block">
          <div className="discord-visual" aria-hidden="true">
            <div className="discord-orbit">
              <div className="discord-core">
                <span>🎮</span>
              </div>
              <div className="discord-ring discord-ring-1"></div>
              <div className="discord-ring discord-ring-2"></div>
              <div className="discord-ring discord-ring-3"></div>
            </div>

            <div className="discord-stat discord-stat-top">
              <strong>+2500 membres</strong>
              <span>sur le serveur</span>
            </div>
            <div className="discord-stat discord-stat-bottom">
              <strong>+200 partenaires</strong>
            </div>

            <span className="discord-dot discord-dot-1"></span>
            <span className="discord-dot discord-dot-2"></span>
            <span className="discord-dot discord-dot-3"></span>
            <span className="discord-dot discord-dot-4"></span>
            <span className="discord-dot discord-dot-5"></span>
          </div>

          <div className="discord-copy">
            <h2>
              Rejoignez nos +2500 membres sur notre <span>Discord !</span>
            </h2>
            <p>
              Rejoignez plus de 2500 apprenants et apprenantes Alyra au sein du serveur Discord, soyez entoure pour
              progresser au sein de l'ecosysteme.
            </p>
            <div className="discord-features">
              <article>
                <span className="discord-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h5V2" />
                    <path d="M17 17h-5v5" />
                    <path d="M17 7a7 7 0 0 0-11 2" />
                    <path d="M7 17a7 7 0 0 0 11-2" />
                  </svg>
                </span>
                <h3>Un reseau de professionnels</h3>
                <p>Des formateurs et experts presents pour repondre a vos questions</p>
              </article>
              <article>
                <span className="discord-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h5V2" />
                    <path d="M17 17h-5v5" />
                    <path d="M17 7a7 7 0 0 0-11 2" />
                    <path d="M7 17a7 7 0 0 0 11-2" />
                  </svg>
                </span>
                <h3>Un reseau d'alumni</h3>
                <p>Une communaute crypto et IA active et dynamique en France</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--reduced why-tech-section anchor-section">
        <div className="why-block">
          <h2>
            Pourquoi se former aux <span>nouvelles technologies ?</span>
          </h2>
          <div className="why-cards-grid">
            {whyLearnHighlights.map((item) => (
              <article key={item.id} className="why-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <footer>{item.source}</footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--reduced free-courses-section anchor-section">
        <h2 className="free-courses-title">
          Participez a nos <span>5 cours gratuits</span> sur la Crypto et l'IA
        </h2>
        <div className="free-courses-layout">
          <div className="free-courses-copy">
            <h3>
              Formation <span>certifiantes</span>
            </h3>
            <p>
              <strong>
                Initiez-vous gratuitement aux fondamentaux de la blockchain, des crypto-actifs et de l'intelligence
                artificielle
              </strong>{" "}
              a travers 5 modules accessibles a tous.
            </p>
            <p className="free-courses-subtitle">Vous apprendrez a :</p>
            <ul className="free-courses-list">
              {freeCoursesChecklist.map((item) => (
                <li key={item.id}>
                  <span className="free-courses-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m7.6 12.3 3 3 5.9-6.3" />
                    </svg>
                  </span>
                  <p>
                    <strong>{item.lead}</strong> {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <div className="free-courses-actions">
              <Link href="/rendez-vous" className="primary free-courses-main-btn">
                Accedez des maintenant a nos cours gratuits
              </Link>
              <Link href="/rendez-vous" className="secondary free-courses-secondary-btn">
                Je prends RDV
              </Link>
            </div>
          </div>
          <div className="free-courses-visual" aria-hidden="true">
            <div className="free-courses-visual-frame"></div>
            <img src="/inspired/home/hero-main.avif" alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="section section--full alyra-team-section anchor-section">
        <div className="alyra-team-layout">
          <div className="alyra-team-copy">
            <h2>
              L'equipe <span>Alyra</span>
            </h2>
            <p className="alyra-team-quote-mark">“</p>
            <p className="alyra-team-lead">
              Alyra, pionniere en formation blockchain et intelligence artificielle, aujourd'hui leader dans le Web3,
              rend les technologies de demain accessibles a toutes et tous.
            </p>
            <p>
              Fidele a son esprit d'ecole, Alyra associe experts en activite et communaute d'alumni engagee pour
              accompagner les talents et organisations dans leur transition numerique.
            </p>
            <p>
              Architecte de plusieurs certifications professionnelles avant-gardistes, Alyra renforce l'employabilite
              de ses apprenants en alliant innovation et exigence. Integrer Alyra, c'est decider de sa trajectoire
              professionnelle et personnelle.
            </p>
            <p>
              Integrer Alyra, c'est decider de sa trajectoire professionnelle et personnelle en devenant ambassadeur du
              progres.
            </p>
          </div>

          <div className="alyra-team-grid" role="list" aria-label="Equipe Alyra">
            {alyraTeamGrid.map((member) => (
              <article key={member.id} className="alyra-member-card" role="listitem">
                <img src={member.avatar} alt={member.name} loading="lazy" decoding="async" />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--full anchor-section">
        <div className="section-head">
          <h2>
            Ils parlent de <span>nous</span>
          </h2>
        </div>
        <div className="press-marquee" aria-label="Medias qui parlent d'Alyra">
          <div className="press-track">
            {pressTrackItems.map((media, index) => (
              <article key={`${media.name}-${index}`} className="press-logo-item">
                <img src={media.logo} alt={`Logo ${media.name}`} loading="lazy" decoding="async" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--full blog-recap-section anchor-section">
        <div className="blog-recap-head">
          <p className="blog-recap-kicker">Blog</p>
          <h2>Nos dernieres actualites</h2>
          <p>
            Ne ratez rien de ce qui se passe dans le monde de la blockchain et de l'IA en suivant nos dernieres
            actualites.
          </p>
        </div>
        <div className="blog-recap-grid">
          {latestNews.map((post) => (
            <article key={post.slug} className="blog-recap-card">
              <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" />
              <div className="blog-recap-meta">
                <span>{post.tag}</span>
                <small>{post.readTime}</small>
              </div>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
              <Link href={post.href} className="blog-recap-link">
                Lire l'article <span aria-hidden="true">›</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
