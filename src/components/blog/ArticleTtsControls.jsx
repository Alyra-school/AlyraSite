"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import styles from "./BlogArticlePage.module.css";

function stripHtml(html) {
  if (!html) return "";
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

export default function ArticleTtsControls({ title, contentHtml }) {
  const isSupported = useSyncExternalStore(
    () => () => {},
    () => typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    () => false
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const textToRead = useMemo(() => {
    const body = stripHtml(contentHtml);
    return [title, body].filter(Boolean).join(". ");
  }, [title, contentHtml]);

  const onEnd = () => {
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const start = () => {
    if (!isSupported || !textToRead) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "fr-FR";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const pause = () => {
    if (!isSupported || !isSpeaking) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    if (!isSupported || !isSpeaking) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const togglePlayPause = () => {
    if (!isSupported) return;
    if (!isSpeaking) {
      start();
      return;
    }
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  return (
    <div className={styles.ttsWrap}>
      {!isSupported ? <p className={styles.ttsHint}>Lecture vocale indisponible sur ce navigateur.</p> : null}
      <div className={styles.ttsButtons}>
        <button
          type="button"
          onClick={togglePlayPause}
          className={styles.ttsButton}
          disabled={!isSupported}
          aria-label={isSpeaking && !isPaused ? "Mettre en pause la lecture" : "Lancer la lecture"}
        >
          <span className={styles.ttsIcon} aria-hidden="true">{isSpeaking && !isPaused ? "⏸" : "▶"}</span>
          <span>{isSpeaking && !isPaused ? "Pause" : "Lecture"}</span>
        </button>
        <button
          type="button"
          onClick={stop}
          className={styles.ttsButton}
          disabled={!isSupported || !isSpeaking}
          aria-label="Arrêter la lecture"
        >
          <span className={styles.ttsIcon} aria-hidden="true">⏹</span>
          <span>Arrêt</span>
        </button>
      </div>
    </div>
  );
}
