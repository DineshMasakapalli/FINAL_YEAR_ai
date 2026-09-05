import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InputForm from '@/components/InputForm';
import IdeaList from '@/components/IdeaList';
import MentorChat from '@/components/MentorChat';
import Library from '@/components/Library';
import CompareModal from '@/components/CompareModal';
import DatasetsModal from '@/components/DatasetsModal';
import { generateIdeas, improveIdea, getDatasetsAndApis } from '@/services/gemini';
import { exportToPDF } from '@/services/pdfExport';
import type { ProjectIdea, GenerateInput, Theme, DatasetResource, ApiResource } from '@/types';

type Step = 'hero' | 'form' | 'results';

const STORAGE_KEY = 'finalyear-ai-library';
const THEME_KEY = 'finalyear-ai-theme';

export default function App() {
  const [step, setStep] = useState<Step>('hero');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<ProjectIdea[]>([]);
  const [chatIdea, setChatIdea] = useState<ProjectIdea | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [compareIdeas, setCompareIdeas] = useState<ProjectIdea[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [lastInput, setLastInput] = useState<GenerateInput | null>(null);
  const [improvingIds, setImprovingIds] = useState<Set<string>>(new Set());
  const [datasetsModalOpen, setDatasetsModalOpen] = useState(false);
  const [datasetsModalIdea, setDatasetsModalIdea] = useState<string>('');
  const [datasets, setDatasets] = useState<DatasetResource[]>([]);
  const [apis, setApis] = useState<ApiResource[]>([]);
  const [datasetsLoading, setDatasetsLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.body.style.backgroundColor = theme === 'dark' ? '#0a0a0a' : '#f9fafb';
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedIdeas(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const persistSaved = useCallback((updated: ProjectIdea[]) => {
    setSavedIdeas(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const handleGenerate = async (input: GenerateInput) => {
    setLastInput(input);
    setIsLoading(true);
    setStep('results');
    const generated = await generateIdeas(input);
    setIdeas(generated);
    setIsLoading(false);
  };

  const handleSave = (idea: ProjectIdea) => {
    const exists = savedIdeas.some((s) => s.id === idea.id);
    if (exists) {
      persistSaved(savedIdeas.filter((s) => s.id !== idea.id));
    } else {
      persistSaved([...savedIdeas, idea]);
    }
  };

  const handleRemove = (id: string) => {
    persistSaved(savedIdeas.filter((s) => s.id !== id));
  };

  const handleExport = (idea: ProjectIdea) => {
    exportToPDF(idea);
  };

  const handleCompare = (idea: ProjectIdea) => {
    const existing = compareIdeas.find((c) => c.id === idea.id);
    if (existing) {
      setCompareIdeas(compareIdeas.filter((c) => c.id !== idea.id));
      return;
    }
    const updated = [...compareIdeas, idea];
    if (updated.length > 2) {
      setCompareIdeas([updated[updated.length - 2], updated[updated.length - 1]]);
    } else {
      setCompareIdeas(updated);
    }
    if (updated.length >= 2 || compareIdeas.length >= 1) {
      setCompareOpen(true);
    }
  };

  const handleChat = (idea: ProjectIdea) => {
    setChatIdea(idea);
    setChatOpen(true);
  };

  const handleImprove = async (idea: ProjectIdea) => {
    setImprovingIds((prev) => new Set(prev).add(idea.id));
    const improved = await improveIdea(idea);
    setIdeas((prev) => prev.map((i) => i.id === idea.id ? improved : i));
    setImprovingIds((prev) => {
      const next = new Set(prev);
      next.delete(idea.id);
      return next;
    });
  };

  const handleDatasets = async (idea: ProjectIdea) => {
    setDatasetsModalIdea(idea.title);
    setDatasetsModalOpen(true);
    setDatasetsLoading(true);
    setDatasets([]);
    setApis([]);
    const result = await getDatasetsAndApis(idea);
    setDatasets(result.datasets);
    setApis(result.apis);
    setDatasetsLoading(false);
  };

  const handleTrendingClick = (_domain: string) => {
    setStep('form');
  };

  const savedIds = new Set(savedIdeas.map((s) => s.id));

  return (
    <div className={'min-h-screen ' + (theme === 'dark' ? 'bg-surface-900' : 'bg-gray-50') + ' transition-colors duration-300'}>
      {/* Grid background */}
      {theme === 'dark' && (
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-50" />
      )}

      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onOpenLibrary={() => setLibraryOpen(true)}
        savedCount={savedIdeas.length}
        onLogoClick={() => setStep('hero')}
      />

      <main className="relative">
        {step === 'hero' && (
          <Hero
            onGenerate={() => setStep('form')}
            onTrendingClick={handleTrendingClick}
          />
        )}

        {step === 'form' && (
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
        )}

        {step === 'results' && (
          <>
            {isLoading ? (
              <div className="min-h-screen flex flex-col items-center justify-center px-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-accent-500/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full bg-accent-500/30 animate-ping" style={{ animationDelay: '0.3s' }} />
                    <div className="absolute inset-4 rounded-full bg-accent-500/40 animate-ping" style={{ animationDelay: '0.6s' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-accent-400 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Generating Your Ideas...</h3>
                  <p className="text-gray-400">AI is crafting personalized project ideas just for you</p>
                </motion.div>
              </div>
            ) : (
              <>
                <IdeaList
                  ideas={ideas}
                  savedIds={savedIds}
                  onSave={handleSave}
                  onExport={handleExport}
                  onCompare={handleCompare}
                  onChat={handleChat}
                  onImprove={handleImprove}
                  onDatasets={handleDatasets}
                  improvingIds={improvingIds}
                />
                <div className="max-w-5xl mx-auto px-6 pb-12 flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep('form')}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all text-gray-300 hover:text-white font-medium"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Generate New Ideas
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep('hero')}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all text-gray-300 hover:text-white font-medium"
                  >
                    Back to Home
                  </motion.button>
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <MentorChat
        idea={chatIdea}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      <Library
        isOpen={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        ideas={savedIdeas}
        onRemove={handleRemove}
        onExport={handleExport}
        onChat={(idea) => { setLibraryOpen(false); handleChat(idea); }}
      />

      <CompareModal
        ideas={compareIdeas.length >= 2 ? compareIdeas : null}
        onClose={() => { setCompareOpen(false); setCompareIdeas([]); }}
      />

      <DatasetsModal
        isOpen={datasetsModalOpen}
        onClose={() => setDatasetsModalOpen(false)}
        datasets={datasets}
        apis={apis}
        isLoading={datasetsLoading}
        ideaTitle={datasetsModalIdea}
      />
    </div>
  );
}
