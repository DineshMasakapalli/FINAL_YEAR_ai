export interface ProjectIdea {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  innovationScore: number;
  techStack: {
    frontend: string[];
    backend: string[];
    aiml: string[];
    hardware: string[];
    database: string[];
  };
  coreFeatures: string[];
  roadmap: {
    phase: string;
    description: string;
    weeks: string;
  }[];
  whyImpress: string;
  estimatedCost: string;
  hardwareNeeded: string;
  futureEnhancements: string[];
  datasets?: DatasetResource[];
  apis?: ApiResource[];
  complexity?: ComplexityBreakdown;
}

export interface DatasetResource {
  name: string;
  url: string;
  description: string;
}

export interface ApiResource {
  name: string;
  url: string;
  description: string;
}

export interface ComplexityBreakdown {
  frontend: number;
  backend: number;
  aiml: number;
  hardware: number;
  database: number;
  total: number;
}

export interface GenerateInput {
  branch: string;
  interests: string[];
  skills: string;
  domain: string;
  projectType: string;
  difficulty: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type Theme = 'dark' | 'light';
