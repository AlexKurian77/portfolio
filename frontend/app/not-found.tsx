import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Background glow effects */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle, rgba(200, 169, 126, 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(6rem, 15vw, 12rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "rgba(200, 169, 126, 0.15)",
            marginBottom: "1rem",
            background: "linear-gradient(180deg, #F0EDE6 0%, rgba(240, 237, 230, 0.2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>
        
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 600,
            color: "#F0EDE6",
            marginBottom: "1.5rem",
          }}
        >
          Page not found
        </h2>
        
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.1rem",
            color: "#8A8A8A",
            marginBottom: "3rem",
            maxWidth: "400px",
          }}
        >
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="glass-card hover:bg-white/5 transition-colors flex items-center gap-2"
          style={{
            padding: "12px 24px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            color: "#C8A97E",
            fontWeight: 500,
            pointerEvents: "auto",
          }}
        >
          <ArrowLeft size={18} />
          Return Home
        </Link>
      </div>
    </main>
  );
}
