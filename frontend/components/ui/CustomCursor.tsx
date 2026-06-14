"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick, AlertTriangle, X } from "lucide-react";

export default function CustomCursor() {
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHovering(false);
  }, [pathname]);

  useEffect(() => {
    // Only show on devices with fine pointers
    const hasPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!hasPointer) return;

    // Check for hardware acceleration (GPU)
    let hasHardwareAcceleration = true;
    try {
      const canvas = document.createElement("canvas");
      // Passing failIfMajorPerformanceCaveat: true causes getContext to return null
      // if the browser is forced to use software rendering (e.g. SwiftShader).
      const gl =
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
        canvas.getContext("experimental-webgl", { failIfMajorPerformanceCaveat: true });
      
      if (!gl) {
        hasHardwareAcceleration = false;
      } else {
        const webgl = gl as WebGLRenderingContext;
        const debugInfo = webgl.getExtension("WEBGL_debug_renderer_info");
        // Fallback to standard RENDERER string if the debug info extension is blocked
        const renderer = debugInfo
          ? webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : webgl.getParameter(webgl.RENDERER);

        if (renderer && /SwiftShader|software|llvmpipe/i.test(renderer)) {
          hasHardwareAcceleration = false;
        }
      }
    } catch (e) {
      hasHardwareAcceleration = false;
    }

    if (!hasHardwareAcceleration) {
      setShowWarning(true);
      return;
    }

    document.documentElement.classList.add("custom-cursor-active");
    setIsVisible(true);

    // Direct DOM update with translate3d — composited on GPU,
    // completely bypasses main-thread layout recalculation
    const handleMove = (e: MouseEvent) => {
      const t = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = t;
      if (ringRef.current) ringRef.current.style.transform = t;
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Track which elements already have listeners to prevent stacking
    const trackedElements = new WeakSet<Element>();

    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]',
      );
      interactives.forEach((el) => {
        if (trackedElements.has(el)) return;
        trackedElements.add(el);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    // Observe interactive elements
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    attachListeners();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
      document.documentElement.classList.remove("custom-cursor-active");
      // Clean up listeners from all current interactive elements
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]',
      );
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Hardware Acceleration Warning Toast */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 99999,
              maxWidth: "380px",
              background: "rgba(14, 14, 14, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(200, 169, 126, 0.25)",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(200, 169, 126, 0.05)",
              display: "flex",
              gap: "12px",
              color: "#F0EDE6",
              fontFamily: "var(--font-body)",
            }}
          >
            <div style={{ color: "#C8A97E", flexShrink: 0, marginTop: "2px" }}>
              <AlertTriangle size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <h4 style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 600,
                color: "#C8A97E",
                letterSpacing: "0.01em"
              }}>
                Hardware Acceleration Disabled
              </h4>
              <p style={{
                margin: 0,
                fontSize: "12px",
                lineHeight: "1.5",
                color: "#8A8A8A"
              }}>
                Graphics acceleration is turned off in your browser. The 3D portfolio experience may feel laggy. For the best experience, please enable it in your browser settings.
              </p>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              aria-label="Dismiss warning"
              style={{
                background: "transparent",
                border: "none",
                color: "#8A8A8A",
                cursor: "pointer",
                padding: "2px",
                alignSelf: "flex-start",
                borderRadius: "4px",
                transition: "color 0.2s, background 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F0EDE6";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#8A8A8A";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor elements (only rendered if hardware acceleration is active) */}
      {isVisible && (
        <>
          {/* Dot / Hover State */}
          <div
            ref={dotRef}
            className="hidden lg:flex"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: isHovering ? 40 : 6,
              height: isHovering ? 40 : 6,
              borderRadius: "50%",
              background: isHovering ? "transparent" : "#C8A97E",
              border: isHovering ? "1px solid rgba(200, 169, 126, 0.8)" : "none",
              pointerEvents: "none",
              zIndex: 9999,
              willChange: "transform",
              transform: "translate3d(-100px, -100px, 0)",
              transition:
                "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s, border 0.3s",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MousePointerClick
                    size={18}
                    color="#ffe5c1ff"
                    strokeWidth={2.5}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Outer Ring */}
          <div
            ref={ringRef}
            className="hidden lg:block"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: isHovering ? 0 : 32,
              height: isHovering ? 0 : 32,
              opacity: isHovering ? 0 : 1,
              borderRadius: "50%",
              border: "1px solid rgba(200, 169, 126, 0.25)",
              pointerEvents: "none",
              zIndex: 9998,
              willChange: "transform",
              transform: "translate3d(-100px, -100px, 0)",
              transition:
                "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
            }}
          />
        </>
      )}
    </>
  );
}
