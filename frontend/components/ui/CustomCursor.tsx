"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { MousePointerClick } from "lucide-react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only show on devices with fine pointers
    const hasPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!hasPointer) return;

    setIsVisible(true);

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMove);

    // Observe interactive elements
    const observer = new MutationObserver(() => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]',
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]',
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot / Hover State */}
      <motion.div
        className="hidden lg:flex"
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          width: isHovering ? 40 : 6,
          height: isHovering ? 40 : 6,
          borderRadius: "50%",
          background: isHovering ? "transparent" : "#C8A97E",
          border: isHovering ? "1px solid rgba(200, 169, 126, 0.8)" : "none",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s",
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
      </motion.div>
      {/* Outer Ring */}
      <motion.div
        className="hidden lg:block"
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          width: isHovering ? 0 : 32,
          height: isHovering ? 0 : 32,
          opacity: isHovering ? 0 : 1,
          borderRadius: "50%",
          border: "1px solid rgba(200, 169, 126, 0.25)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
        }}
      />
    </>
  );
}
