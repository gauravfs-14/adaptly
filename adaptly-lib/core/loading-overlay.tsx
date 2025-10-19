"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
  lockScroll?: boolean;
}

export function LoadingOverlay({
  isVisible,
  message = "AI is generating your layout...",
  subMessage = "Creating components and arranging them for you",
  lockScroll = true,
}: LoadingOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [dots, setDots] = useState("");
  const host = useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("div");
    el.setAttribute("data-overlay-host", "true");
    return el;
  }, []);

  useEffect(() => {
    setMounted(true);
    if (!host) return;
    document.body.appendChild(host);
    return () => {
      host.remove();
    };
  }, [host]);

  useEffect(() => {
    if (!lockScroll) return;
    if (!isVisible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isVisible, lockScroll]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!mounted || !isVisible || !host) return null;

  const rootStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 2147483647,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const backdropDimStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.80)",
  };

  const backdropBlurStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    // blur may be ignored on some environments; dimmer still works
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  const contentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    color: "white",
    textAlign: "center",
    padding: "24px",
  };

  return createPortal(
    <>
      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
      `}</style>
      <div style={rootStyle} role="status" aria-live="polite" aria-busy="true">
        <div style={backdropDimStyle} />
        <div style={backdropBlurStyle} />
        <div style={contentStyle}>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            {message}
          </h3>
          <p style={{ fontSize: 14, opacity: 0.85, marginTop: 8 }}>
            {subMessage}
            {dots}
          </p>

          {/* Simple progress indicator */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: "white",
                borderRadius: "50%",
                animation: "bounce 1s infinite",
              }}
            ></div>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: "white",
                borderRadius: "50%",
                animation: "bounce 1s infinite",
                animationDelay: "0.1s",
              }}
            ></div>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: "white",
                borderRadius: "50%",
                animation: "bounce 1s infinite",
                animationDelay: "0.2s",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>,
    host
  );
}
