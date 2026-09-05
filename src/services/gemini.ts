import type { ProjectIdea, GenerateInput, ChatMessage, DatasetResource, ApiResource, ComplexityBreakdown } from '@/types';
import { generateMockIdeas } from '@/data/mockData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export function hasGeminiKey(): boolean {
  return !!GEMINI_API_KEY && GEMINI_API_KEY.length > 10;
}

async function callGemini(prompt: string, temperature = 0.9, maxTokens = 8192): Promise<string> {
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) throw new Error('Gemini API error: ' + response.status);

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty Gemini response');
  return text;
}

export async function generateIdeas(input: GenerateInput): Promise<ProjectIdea[]> {
  if (!hasGeminiKey()) {
    await new Promise((r) => setTimeout(r, 1500));
    return generateMockIdeas(input);
  }

  const prompt = buildGenerationPrompt(input);

  try {
    const text = await callGemini(prompt, 0.9, 8192);
    const ideas = parseGeminiIdeas(text);
    if (ideas.length === 0) return generateMockIdeas(input);
    return ideas.map(enhanceIdea);
  } catch (err) {
    console.error('Gemini generation failed, using mock data:', err);
    return generateMockIdeas(input);
  }
}

function buildGenerationPrompt(input: GenerateInput): string {
  return 'Generate 3 unique final year project ideas for a ' + input.branch + ' student interested in ' + input.interests.join(', ') + ' with skills in ' + input.skills + ' in the domain of ' + input.domain + '. The project type should be ' + input.projectType + ' and difficulty level ' + input.difficulty + '.\n\nReturn a JSON array of 3 objects with this exact structure:\n[\n  {\n    "title": "Project Title",\n    "tagline": "Catchy one-line tagline",\n    "problem": "2-line problem statement",\n    "innovationScore": 8,\n    "techStack": {\n      "frontend": ["React", "Tailwind CSS"],\n      "backend": ["Node.js", "Express"],\n      "aiml": ["TensorFlow"],\n      "hardware": ["Raspberry Pi"],\n      "database": ["PostgreSQL"]\n    },\n    "coreFeatures": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5"],\n    "roadmap": [\n      {"phase": "Phase 1: Research", "description": "...", "weeks": "Weeks 1-3"},\n      {"phase": "Phase 2: Prototype", "description": "...", "weeks": "Weeks 4-6"},\n      {"phase": "Phase 3: Core Build", "description": "...", "weeks": "Weeks 7-11"},\n      {"phase": "Phase 4: Testing & Deployment", "description": "...", "weeks": "Weeks 12-14"}\n    ],\n    "whyImpress": "Why this will impress judges and placement panels",\n    "estimatedCost": "Cost estimate in INR",\n    "hardwareNeeded": "Hardware list",\n    "futureEnhancements": ["enhancement 1", "enhancement 2", "enhancement 3"]\n  }\n]\n\nMake the ideas innovative, practical, and tailored to the student branch, interests, skills, and domain. Innovation scores should be 7-10. Return ONLY valid JSON.';
}

function parseGeminiIdeas(text: string): ProjectIdea[] {
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];
    const parsed = JSON.parse(jsonMatch[0]);
    return parsed.map((item: Record<string, unknown>, index: number) => ({
      id: 'gemini-' + Date.now() + '-' + index,
      title: String(item.title || 'Untitled Project'),
      tagline: String(item.tagline || ''),
      problem: String(item.problem || ''),
      innovationScore: Number(item.innovationScore || 7),
      techStack: {
        frontend: Array.isArray((item.techStack as Record<string, unknown>)?.frontend) ? (item.techStack as Record<string, string[]>).frontend : [],
        backend: Array.isArray((item.techStack as Record<string, unknown>)?.backend) ? (item.techStack as Record<string, string[]>).backend : [],
        aiml: Array.isArray((item.techStack as Record<string, unknown>)?.aiml) ? (item.techStack as Record<string, string[]>).aiml : [],
        hardware: Array.isArray((item.techStack as Record<string, unknown>)?.hardware) ? (item.techStack as Record<string, string[]>).hardware : [],
        database: Array.isArray((item.techStack as Record<string, unknown>)?.database) ? (item.techStack as Record<string, string[]>).database : [],
      },
      coreFeatures: Array.isArray(item.coreFeatures) ? item.coreFeatures as string[] : [],
      roadmap: Array.isArray(item.roadmap) ? item.roadmap as { phase: string; description: string; weeks: string }[] : [],
      whyImpress: String(item.whyImpress || ''),
      estimatedCost: String(item.estimatedCost || ''),
      hardwareNeeded: String(item.hardwareNeeded || ''),
      futureEnhancements: Array.isArray(item.futureEnhancements) ? item.futureEnhancements as string[] : [],
    }));
  } catch {
    return [];
  }
}

function computeComplexity(idea: ProjectIdea): ComplexityBreakdown {
  const f = idea.techStack.frontend.length;
  const b = idea.techStack.backend.length;
  const a = idea.techStack.aiml.length;
  const h = idea.techStack.hardware.length;
  const d = idea.techStack.database.length;
  const total = f + b + a + h + d || 1;
  return {
    frontend: Math.round((f / total) * 100),
    backend: Math.round((b / total) * 100),
    aiml: Math.round((a / total) * 100),
    hardware: Math.round((h / total) * 100),
    database: Math.round((d / total) * 100),
    total,
  };
}

function enhanceIdea(idea: ProjectIdea): ProjectIdea {
  return { ...idea, complexity: computeComplexity(idea) };
}

export async function improveIdea(idea: ProjectIdea): Promise<ProjectIdea> {
  if (!hasGeminiKey()) {
    await new Promise((r) => setTimeout(r, 1500));
    return {
      ...idea,
      title: idea.title + ' Pro',
      tagline: idea.tagline + ' Now with next-gen capabilities.',
      innovationScore: Math.min(10, idea.innovationScore + 1),
      whyImpress: idea.whyImpress + ' The improved version adds cutting-edge features that push innovation boundaries further, making it even more compelling for judges and recruiters.',
      futureEnhancements: ['Quantum-inspired optimization for faster processing', 'Edge AI deployment for real-time inference', 'Federated learning for privacy-preserving improvements', ...idea.futureEnhancements],
      complexity: computeComplexity(idea),
    };
  }

  const prompt = 'You are an AI project mentor. Improve this final year project idea to make it more innovative and impressive.\n\nCurrent idea:\n' + JSON.stringify({ title: idea.title, tagline: idea.tagline, problem: idea.problem, techStack: idea.techStack, coreFeatures: idea.coreFeatures, roadmap: idea.roadmap, whyImpress: idea.whyImpress, futureEnhancements: idea.futureEnhancements }) + '\n\nReturn an improved version as JSON with the same structure. Make the title more catchy, the problem more impactful, add 1-2 innovative features, increase the innovation score, and add cutting-edge future enhancements. Return ONLY valid JSON.';

  try {
    const text = await callGemini(prompt, 0.9, 4096);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found');
    const item = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
    const improved: ProjectIdea = {
      ...idea,
      title: String(item.title || idea.title),
      tagline: String(item.tagline || idea.tagline),
      problem: String(item.problem || idea.problem),
      innovationScore: Math.min(10, Number(item.innovationScore || idea.innovationScore + 1)),
      coreFeatures: Array.isArray(item.coreFeatures) ? item.coreFeatures as string[] : idea.coreFeatures,
      whyImpress: String(item.whyImpress || idea.whyImpress),
      futureEnhancements: Array.isArray(item.futureEnhancements) ? item.futureEnhancements as string[] : idea.futureEnhancements,
    };
    return enhanceIdea(improved);
  } catch (err) {
    console.error('Improve idea failed:', err);
    return enhanceIdea(idea);
  }
}

export async function getDatasetsAndApis(idea: ProjectIdea): Promise<{ datasets: DatasetResource[]; apis: ApiResource[] }> {
  if (!hasGeminiKey()) {
    await new Promise((r) => setTimeout(r, 1200));
    return generateMockDatasetsAndApis(idea);
  }

  const prompt = 'For the project "' + idea.title + '" which uses ' + JSON.stringify(idea.techStack) + ' and solves: ' + idea.problem + '\n\nRecommend 3 datasets and 3 APIs that would be useful. Return JSON:\n{\n  "datasets": [{"name": "Dataset Name", "url": "https://kaggle.com/...", "description": "What it contains"}],\n  "apis": [{"name": "API Name", "url": "https://...", "description": "What it provides"}]\n}\nReturn ONLY valid JSON with real, well-known dataset and API names.';

  try {
    const text = await callGemini(prompt, 0.7, 2048);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found');
    const parsed = JSON.parse(jsonMatch[0]) as { datasets?: DatasetResource[]; apis?: ApiResource[] };
    return {
      datasets: parsed.datasets || [],
      apis: parsed.apis || [],
    };
  } catch (err) {
    console.error('Datasets/APIs fetch failed:', err);
    return generateMockDatasetsAndApis(idea);
  }
}

function generateMockDatasetsAndApis(idea: ProjectIdea): { datasets: DatasetResource[]; apis: ApiResource[] } {
  const hasML = idea.techStack.aiml.length > 0;
  const hasIoT = idea.techStack.hardware.length > 0;

  const datasets: DatasetResource[] = [
    { name: 'Kaggle - ' + idea.title.split(':')[0], url: 'https://www.kaggle.com/datasets', description: 'Search for datasets related to ' + idea.title.toLowerCase().split(':')[0] + '. Look for well-reviewed ones with good documentation.' },
    { name: 'UCI ML Repository', url: 'https://archive.ics.uci.edu/', description: 'Classic curated ML datasets suitable for academic projects.' },
    { name: hasIoT ? 'ThingSpeak IoT Data' : 'Google Dataset Search', url: hasIoT ? 'https://thingspeak.com/' : 'https://datasetsearch.research.google.com/', description: hasIoT ? 'Real-time IoT sensor data streams for testing hardware integrations.' : 'Search across thousands of academic and research datasets.' },
  ];

  const apis: ApiResource[] = [
    { name: 'Google Maps API', url: 'https://developers.google.com/maps', description: 'Location and mapping capabilities for spatial features.' },
    { name: hasML ? 'TensorFlow Hub' : 'OpenAI API', url: hasML ? 'https://tfhub.dev/' : 'https://platform.openai.com/', description: hasML ? 'Pre-trained ML models ready for fine-tuning on your data.' : 'AI-powered text and code generation capabilities.' },
    { name: 'Firebase', url: 'https://firebase.google.com/', description: 'Real-time database, authentication, and hosting for rapid development.' },
  ];

  return { datasets, apis };
}

export async function chatWithMentor(
  message: string,
  idea: ProjectIdea | null,
  history: ChatMessage[]
): Promise<string> {
  if (!hasGeminiKey()) {
    await new Promise((r) => setTimeout(r, 1000));
    return generateMockChatResponse(message, idea);
  }

  const context = idea
    ? 'You are an AI mentor helping a student with their final year project: "' + idea.title + '". Project details: ' + idea.problem + ' Tech stack: ' + JSON.stringify(idea.techStack) + '. Core features: ' + idea.coreFeatures.join(', ') + '. Roadmap: ' + idea.roadmap.map((r) => r.phase).join(', ') + '.'
    : 'You are an AI mentor helping a student with their final year project.';

  const conversationHistory = history
    .slice(-5)
    .map((m) => m.role + ': ' + m.content)
    .join('\n');

  const prompt = context + '\n\nPrevious conversation:\n' + conversationHistory + '\n\nStudent question: ' + message + '\n\nProvide a helpful, detailed, and encouraging response. Keep it concise but informative.';

  try {
    const text = await callGemini(prompt, 0.7, 1024);
    return text;
  } catch (err) {
    console.error('Gemini chat failed, using mock response:', err);
    return generateMockChatResponse(message, idea);
  }
}

function generateMockChatResponse(message: string, idea: ProjectIdea | null): string {
  const lower = message.toLowerCase();

  if (lower.includes('start') || lower.includes('begin')) {
    return 'Great question! Here is how to get started with ' + (idea?.title || 'your project') + ':\n\n1. Set up your development environment - Install the required tools and frameworks from your tech stack.\n2. Start with Phase 1 - Research existing solutions and gather datasets or resources.\n3. Build a minimal prototype - Get the core feature working end-to-end before adding complexity.\n4. Iterate weekly - Set small, achievable goals each week following your roadmap.\n\nThe most important thing is to get something working quickly, even if it is rough. You can refine it later!';
  }

  if (lower.includes('dataset') || lower.includes('data')) {
    return 'For datasets, I recommend:\n\n1. Kaggle - Search for datasets related to your domain. Look for well-reviewed ones with good documentation.\n2. Google Dataset Search - Great for finding academic and research datasets.\n3. UCI ML Repository - Classic ML datasets that are well-curated.\n4. Create your own - If existing datasets do not fit, consider collecting data using surveys, web scraping, or sensors.\n\nAlways check the license and citation requirements before using any dataset in your project!';
  }

  if (lower.includes('improve') || lower.includes('better') || lower.includes('enhance')) {
    return 'Here are ways to make ' + (idea?.title || 'your project') + ' stand out:\n\n1. Add real-time features - Live data processing makes demos more impressive.\n2. Include analytics - A dashboard showing insights adds depth.\n3. Focus on UI/UX - A polished interface makes a huge difference in presentations.\n4. Write good documentation - A clear README and demo video show professionalism.\n5. Add testing - Unit tests and error handling demonstrate engineering maturity.\n\nJudges love projects that work flawlessly during the demo. Practice your demo flow!';
  }

  if (lower.includes('tech') || lower.includes('stack') || lower.includes('tool')) {
    return 'Your tech stack is well-chosen! Here is my advice:\n\n1. Start with what you know - Use technologies you are comfortable with to build fast.\n2. Learn one new thing - Adding one new technology shows learning ability.\n3. Keep it simple - Do not over-engineer. Use the simplest stack that gets the job done.\n4. Document your choices - Be ready to explain why you chose each technology.';
  }

  return 'That is a great question! Here is my guidance:\n\n1. Break it down - Split the problem into smaller, manageable tasks.\n2. Prioritize - Focus on the core feature first, then add enhancements.\n3. Test continuously - Do not wait until the end to test. Validate each piece as you build.\n4. Ask for feedback - Show your work to professors and peers regularly.\n5. Stay organized - Use Git for version control and keep your code clean.\n\nRemember, the journey of building a final year project is as important as the final result. You will learn a lot along the way!';
}
