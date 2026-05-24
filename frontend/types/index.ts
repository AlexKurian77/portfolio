export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url?: string;
  github?: string;
  stack: string[];
  image: string;
  color: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: Skill[];
}

export interface Skill {
  name: string;
}

export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export type ScrollPhase = 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'contact';

export interface PhaseBreakpoint {
  start: number;
  end: number;
}

export type ScrollBreakpoints = Record<ScrollPhase, PhaseBreakpoint>;
