import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Star, Lightbulb, Code2, Server, Brain, Cpu, Database,
  CheckCircle2, Map, Trophy, IndianRupee, Wrench, ArrowRight, Bookmark,
  BookmarkCheck, FileText, GitCompare, MessageCircle, Layers,
  Database as DatabaseIcon, Sparkles, Loader2, Wand2, BarChart3
} from 'lucide-react';
import type { ProjectIdea, DatasetResource, ApiResource, ComplexityBreakdown } from '@/types';

const techIcons: Record<string, typeof Code2> = {
  frontend: Code2,
  backend: Server,
  aiml: Brain,
  hardware: Cpu,
  database: Database,
};

const techLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  aiml: 'AI/ML',
  hardware: 'Hardware',
  database: 'Database',
};

const techColors: Record<string, string> = {
  frontend: 'from-blue-500 to-cyan-400',
  backend: 'from-green-500 to-emerald-400',
  aiml: 'from-purple-500 to-pink-400',
  hardware: 'from-orange-500 to-yellow-400',
  database: 'from-red-500 to-rose-400',
};

function ComplexityChart({ complexity }: { complexity: ComplexityBreakdown }) {
  const bars = [
    { label: 'Frontend', value: complexity.frontend, color: 'from-blue-500 to-cyan-400' },
    { label: 'Backend', value: complexity.backend, color: 'from-green-500 to-emerald-400' },
    { label: 'AI/ML', value: complexity.aiml, color: 'from-purple-500 to-pink-400' },
    { label: 'Hardware', value: complexity.hardware, color: 'from-orange-500 to-yellow-400' },
    { label: 'Database', value: complexity.database, color: 'from-red-500 to-rose-400' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="w-4 h-4 text-accent-400" />
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Complexity Analyzer</h4>
      </div>
      <div className="space-y-2.5">
        {bars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-400 w-16 flex-shrink-0">{bar.label}</span>
            <div className="flex-1 h-6 rounded-lg bg-white/5 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: bar.value + '%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={'h-full rounded-lg bg-gradient-to-r ' + bar.color + ' flex items-center justify-end pr-2'}
              >
                <span className="text-[10px] font-bold text-white">{bar.value}%</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-xs text-gray-500">Total Tech Components: {complexity.total}</span>
        <span className="text-xs text-gray-500">Difficulty Weight: {Math.round(complexity.total * 3.5)}%</span>
      </div>
    </div>
  );
}

interface IdeaCardProps {
  idea: ProjectIdea;
  index: number;
  isSaved: boolean;
  onSave: () => void;
  onExport: () => void;
  onCompare: () => void;
  onChat: () => void;
  onImprove: () => void;
  onDatasets: () => void;
  isImproving: boolean;
}

function IdeaCard({ idea, index, isSaved, onSave, onExport, onCompare, onChat, onImprove, onDatasets, isImproving }: IdeaCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className="glass rounded-3xl overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-accent-500/10"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">Idea {index + 1}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-yellow-400">{idea.innovationScore}/10</span>
              </div>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-1">{idea.title}</h3>
            <p className="text-sm text-accent-300 italic">"{idea.tagline}"</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onSave}
            className={'p-2.5 rounded-xl border transition-all flex-shrink-0 ' + (isSaved ? 'bg-accent-500/20 border-accent-500/50 text-accent-400' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200')}
            title={isSaved ? 'Saved to Library' : 'Save to Library'}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Problem */}
        <div className="flex items-start gap-2 mt-4">
          <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-400">{idea.problem}</p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="p-6 border-b border-white/5">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h4>
        <div className="space-y-2.5">
          {Object.entries(techLabels).map(([key, label]) => {
            const items = idea.techStack[key as keyof typeof idea.techStack];
            if (!items || items.length === 0) return null;
            const Icon = techIcons[key];
            return (
              <div key={key} className="flex items-start gap-2">
                <Icon className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-gray-400">{label}:</span>
                  {items.map((item, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complexity Chart */}
      {idea.complexity && (
        <div className="p-6 border-b border-white/5">
          <ComplexityChart complexity={idea.complexity} />
        </div>
      )}

      {/* Core Features */}
      <div className="p-6 border-b border-white/5">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Core Features</h4>
        <ul className="space-y-2">
          {idea.coreFeatures.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Expandable section */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-400">
          {expanded ? 'Hide Details' : 'View Roadmap, Cost & More'}
        </span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              {/* Roadmap */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Map className="w-4 h-4 text-accent-400" />
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Development Roadmap</h4>
                </div>
                <div className="space-y-3">
                  {idea.roadmap.map((phase, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center text-xs font-bold text-accent-400">
                          {i + 1}
                        </div>
                        {i < idea.roadmap.length - 1 && <div className="w-px h-full bg-white/10 flex-1 mt-1" />}
                      </div>
                      <div className="pb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">{phase.phase}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">
                            {phase.weeks}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Impress */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Why This Impresses Judges</h4>
                </div>
                <p className="text-sm text-gray-300 bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-3">
                  {idea.whyImpress}
                </p>
              </div>

              {/* Cost & Hardware */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4 text-green-400" />
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estimated Cost</h4>
                  </div>
                  <p className="text-sm text-gray-300 bg-green-500/5 border border-green-500/10 rounded-xl p-3">
                    {idea.estimatedCost}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-4 h-4 text-blue-400" />
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hardware Needed</h4>
                  </div>
                  <p className="text-sm text-gray-300 bg-blue-500/5 border border-blue-500/10 rounded-xl p-3">
                    {idea.hardwareNeeded}
                  </p>
                </div>
              </div>

              {/* Future Enhancements */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Future Enhancements</h4>
                </div>
                <ul className="space-y-2">
                  {idea.futureEnhancements.map((enh, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{enh}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex items-center gap-2 p-4 border-t border-white/5 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onChat}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent-500/20 border border-accent-500/30 text-accent-300 text-sm font-medium hover:bg-accent-500/30 transition-all min-w-[120px]"
        >
          <MessageCircle className="w-4 h-4" />
          Ask Mentor
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDatasets}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 transition-all"
          title="Get Datasets & APIs"
        >
          <DatabaseIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Datasets</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onImprove}
          disabled={isImproving}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all disabled:opacity-50"
          title="Improve This Idea with AI"
        >
          {isImproving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          <span className="hidden sm:inline">Improve</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExport}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:border-white/20 hover:text-gray-200 transition-all"
          title="Export as PDF"
        >
          <FileText className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCompare}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:border-white/20 hover:text-gray-200 transition-all"
          title="Compare"
        >
          <GitCompare className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

interface IdeaListProps {
  ideas: ProjectIdea[];
  savedIds: Set<string>;
  onSave: (idea: ProjectIdea) => void;
  onExport: (idea: ProjectIdea) => void;
  onCompare: (idea: ProjectIdea) => void;
  onChat: (idea: ProjectIdea) => void;
  onImprove: (idea: ProjectIdea) => void;
  onDatasets: (idea: ProjectIdea) => void;
  improvingIds: Set<string>;
}

export default function IdeaList({ ideas, savedIds, onSave, onExport, onCompare, onChat, onImprove, onDatasets, improvingIds }: IdeaListProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
          <Sparkles className="w-3.5 h-3.5 text-accent-400" />
          <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">Step 2</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Your Project Ideas</h2>
        <p className="text-gray-400">3 AI-generated ideas tailored to your profile. Tap any card to see the full roadmap.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ideas.map((idea, index) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            index={index}
            isSaved={savedIds.has(idea.id)}
            onSave={() => onSave(idea)}
            onExport={() => onExport(idea)}
            onCompare={() => onCompare(idea)}
            onChat={() => onChat(idea)}
            onImprove={() => onImprove(idea)}
            onDatasets={() => onDatasets(idea)}
            isImproving={improvingIds.has(idea.id)}
          />
        ))}
      </div>
    </div>
  );
}
