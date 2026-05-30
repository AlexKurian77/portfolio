"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Briefcase,
  Code,
  Award,
  Users,
  MoveRight,
} from "lucide-react";
import { detailedExperiences } from "@/lib/data";

const LaptopScene = dynamic(() => import("@/components/laptop/LaptopScene"), {
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ExperienceDetail() {
  const params = useParams();
  const router = useRouter();
  const exp = detailedExperiences.find((e) => e.id === params.id);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(-1);

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!exp) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ background: "var(--bg)" }}
      >
        <div className="text-center">
          <h2
            className="text-2xl mb-4 font-bold"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Experience not found
          </h2>
          <Link
            href="/"
            className="text-[#C8A97E] hover:underline"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen w-full relative"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        paddingBottom: "100px",
      }}
    >

      {!isMobile && (
        <>
          <LaptopScene
            currentPhase="experience"
            activeProject={exp.id}
            disableScroll={true}
          />
          {/* Dark overlay to ensure text readability against the 3D scene */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.8)",
              zIndex: 5,
            }}
          />
        </>
      )}

      {/* Background glow effects */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle, rgba(200, 169, 126, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem 4rem 2rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "4rem" }}
        >
          <button
            onClick={() => {
              if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
                router.back();
              } else {
                router.push("/");
              }
            }}
            className="inline-flex items-center gap-2 text-[#8A8A8A] hover:text-[#C8A97E] transition-colors duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>
        </motion.div>

        {/* Header (No caged div) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              color: "#F0EDE6",
            }}
          >
            {exp.role}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-12"
          >
            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.25rem",
                color: "#C8A97E",
                fontWeight: 500,
              }}
            >
              <Briefcase size={20} />
              <Link
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer", transition: "color 0.3s ease" }}
                className="hover:text-[#C8A97E99]"
              >
                {exp.company}
              </Link>
            </div>

            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#8A8A8A]" />

            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "1rem",
                color: "#8A8A8A",
              }}
            >
              <Calendar size={16} />
              {exp.duration}
            </div>

            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#8A8A8A]" />

            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#666",
              }}
            >
              <MapPin size={16} />
              {exp.location}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full h-[1px] mb-12"
            style={{
              background:
                "linear-gradient(90deg, rgba(200, 169, 126, 0.3), transparent)",
            }}
          />

          {/* Overview */}
          <motion.div variants={itemVariants} className="mb-16">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem",
                color: "#D0D0D0",
                lineHeight: 1.9,
              }}
            >
              {exp.overview}
            </p>
          </motion.div>

          {/* Conditional Legacy Achievements & Management */}
          {(exp.achievements?.length > 0 || exp.management) && (
            <div
              className={`grid grid-cols-1 ${exp.achievements?.length > 0 ? "md:grid-cols-2" : ""} gap-25 mb-32`}
            >
              {exp.achievements?.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h3
                    className="flex items-center gap-3 mb-6"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      color: "#E8D5B0",
                    }}
                  >
                    <Award size={24} className="text-[#C8A97E]" />
                    Key Achievements
                  </h3>
                  <ul className="flex flex-col gap-6">
                    {exp.achievements.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "1rem",
                          color: "#A0A0A0",
                          lineHeight: 1.8,
                        }}
                      >
                        <span className="text-[#C8A97E] mt-1.5 text-[10px]">
                          ◆
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {exp.management && (
                <motion.div variants={itemVariants}>
                  <h3
                    className="flex items-center gap-3 mb-6"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      color: "#E8D5B0",
                    }}
                  >
                    <Users size={24} className="text-[#C8A97E]" />
                    Management & Process
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      color: "#A0A0A0",
                      lineHeight: 1.9,
                    }}
                  >
                    {exp.management}
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {/* New Detailed Sections */}
          {exp.sections && exp.sections.length > 0 && (
            <div className="flex flex-col gap-14 mb-32 mt-10">
              {exp.sections.map((section: any, idx: number) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col gap-2"
                >
                  {section.link ? (
                    <button
                      onClick={() => window.open(section.link, "_blank")}
                      onMouseEnter={() => setIsHovering(idx)}
                      onMouseLeave={() => setIsHovering(-1)}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1.75rem",
                        fontWeight: 600,
                        marginBottom: "0rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        alignSelf: "flex-start",
                        cursor: "pointer",
                        color: isHovering == idx ? "#C8A97E" : "#F0EDE6",
                      }}
                    >
                      {section.title}
                      <MoveRight
                        size={15}
                        style={{
                          rotate: "-45deg",
                        }}
                      />
                    </button>
                  ) : (
                    <h3
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1.75rem",
                        fontWeight: 600,
                        color: "#F0EDE6",
                        marginBottom: "0rem",
                        alignSelf: "flex-start",
                      }}
                    >
                      {section.title}
                    </h3>
                  )}
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.05rem",
                      color: "#D0D0D0",
                      lineHeight: 1.9,
                      maxWidth: "900px",
                    }}
                  >
                    {section.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-4">
                    <div className="flex flex-col gap-2">
                      <h4
                        className="flex items-center gap-2 mb-6"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "#E8D5B0",
                        }}
                      >
                        <Award size={18} className="text-[#C8A97E]" />
                        Key Features
                      </h4>
                      <ul className="flex flex-col gap-4">
                        {section.features?.map((feature: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-4"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.95rem",
                              color: "#A0A0A0",
                              lineHeight: 1.7,
                            }}
                          >
                            <span className="text-[#C8A97E] mt-1.5 text-[10px]">
                              ◆
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4
                        className="flex items-center gap-2 mb-6"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "#E8D5B0",
                        }}
                      >
                        <Code size={18} className="text-[#C8A97E]" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {section.techStack?.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="tag-pill hover:scale-105"
                            style={{
                              padding: "0.4rem 0.8rem",
                              fontSize: "0.85rem",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Overall Tech Stack */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 30,
            }}
          >
            <h3
              className="flex items-center gap-3 mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "#E8D5B0",
              }}
            >
              <Code size={24} className="text-[#C8A97E]" />
              Overall Technologies Used
            </h3>
            <div className="flex flex-wrap gap-4">
              {exp.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="tag-pill hover:scale-105"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
