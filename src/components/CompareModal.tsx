import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, X, Star, Check, Trophy, IndianRupee } from 'lucide-react';
import type { ProjectIdea } from '@/types';

interface CompareModalProps {
  ideas: ProjectIdea[] | null;
  onClose: () => void;
}

export default function CompareModal({ ideas, onClose }: CompareModalProps) {
  if (!ideas || ideas.length < 2) return null;

  const [idea1, idea2] = ideas;

  const rows: { label: string; get: (idea: ProjectIdea) => string | string[] }[] = [
    { label: 'Problem', get: (i) => i.problem },
    { label: 'Innovation Score', get: (i) => `${i.innovationScore}/10` },
    { label: 'Frontend', get: (i) => i.techStack.frontend.join(', ') },
    { label: 'Backend', get: (i) => i.techStack.backend.join(', ') },
    { label: 'AI/ML', get: (i) => i.techStack.aiml.join(', ') || 'N/A' },
    { label: 'Hardware', get: (i) => i.techStack.hardware.join(', ') || 'N/A' },
    { label: 'Database', get: (i) => i.techStack.database.join(', ') },
    { label: 'Core Features', get: (i) => i.coreFeatures },
    { label: 'Roadmap Phases', get: (i) => i.roadmap.map((r) => r.phase).join('\n') },
    { label: 'Why It Impresses', get: (i) => i.whyImpress },
    { label: 'Estimated Cost', get: (i) => i.estimatedCost },
    { label: 'Hardware Needed', get: (i) => i.hardwareNeeded },
    { label: 'Future Enhancements', get: (i) => i.futureEnhancements },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[90vh] overflow-hidden glass rounded-3xl flex flex-col"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Compare Ideas</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-5">
            {/* Headers */}
            <div className="grid grid-cols-[140px_1fr_1fr] gap-4 mb-4">
              <div></div>
              <div className="glass rounded-xl p-3">
                <h4 className="font-semibold text-white text-sm truncate">{idea1.title}</h4>
                <p className="text-xs text-accent-300 italic truncate">"{idea1.tagline}"</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400">{idea1.innovationScore}/10</span>
                </div>
              </div>
              <div className="glass rounded-xl p-3">
                <h4 className="font-semibold text-white text-sm truncate">{idea2.title}</h4>
                <p className="text-xs text-accent-300 italic truncate">"{idea2.tagline}"</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400">{idea2.innovationScore}/10</span>
                </div>
              </div>
            </div>

            {/* Comparison rows */}
            <div className="space-y-3">
              {rows.map((row, i) => (
                <div key={i} className="grid grid-cols-[140px_1fr_1fr] gap-4 items-start">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider pt-2">{row.label}</div>
                  <div className="glass rounded-xl p-3 text-sm text-gray-300">
                    {Array.isArray(row.get(idea1)) ? (
                      <ul className="space-y-1">
                        {(row.get(idea1) as string[]).map((item, j) => (
                          <li key={j} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-xs whitespace-pre-wrap">{row.get(idea1) as string}</span>
                    )}
                  </div>
                  <div className="glass rounded-xl p-3 text-sm text-gray-300">
                    {Array.isArray(row.get(idea2)) ? (
                      <ul className="space-y-1">
                        {(row.get(idea2) as string[]).map((item, j) => (
                          <li key={j} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-xs whitespace-pre-wrap">{row.get(idea2) as string}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Winner badge */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <p className="text-sm text-gray-400">
                {idea1.innovationScore > idea2.innovationScore
                  ? `"${idea1.title}" has a higher innovation score`
                  : idea2.innovationScore > idea1.innovationScore
                  ? `"${idea2.title}" has a higher innovation score`
                  : 'Both ideas have equal innovation scores'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
