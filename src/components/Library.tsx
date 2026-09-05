import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, X, Trash2, FileText, MessageCircle, Calendar } from 'lucide-react';
import type { ProjectIdea } from '@/types';

interface LibraryProps {
  isOpen: boolean;
  onClose: () => void;
  ideas: ProjectIdea[];
  onRemove: (id: string) => void;
  onExport: (idea: ProjectIdea) => void;
  onChat: (idea: ProjectIdea) => void;
}

export default function Library({ isOpen, onClose, ideas, onRemove, onExport, onChat }: LibraryProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-full sm:w-[420px] z-50 glass-dark border-r border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">My Library</h3>
                  <p className="text-xs text-gray-400">{ideas.length} saved {ideas.length === 1 ? 'idea' : 'ideas'}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {ideas.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <Bookmark className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-400 font-medium mb-1">No saved ideas yet</p>
                  <p className="text-sm text-gray-500">Save project ideas to access them later</p>
                </div>
              ) : (
                ideas.map((idea) => (
                  <div key={idea.id} className="glass rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm truncate">{idea.title}</h4>
                        <p className="text-xs text-accent-300 italic truncate">"{idea.tagline}"</p>
                      </div>
                      <button
                        onClick={() => onRemove(idea.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{idea.problem}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onChat(idea)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent-500/20 border border-accent-500/30 text-accent-300 text-xs font-medium hover:bg-accent-500/30 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Ask Mentor
                      </button>
                      <button
                        onClick={() => onExport(idea)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-gray-400 text-xs font-medium hover:border-white/20 hover:text-gray-200 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        PDF
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
