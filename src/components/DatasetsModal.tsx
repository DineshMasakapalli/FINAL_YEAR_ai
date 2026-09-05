import { motion, AnimatePresence } from 'framer-motion';
import { Database, Plug, X, ExternalLink, Loader2 } from 'lucide-react';
import type { DatasetResource, ApiResource } from '@/types';

interface DatasetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  datasets: DatasetResource[];
  apis: ApiResource[];
  isLoading: boolean;
  ideaTitle: string;
}

export default function DatasetsModal({ isOpen, onClose, datasets, apis, isLoading, ideaTitle }: DatasetsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="w-full max-w-2xl max-h-[85vh] overflow-hidden glass rounded-3xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Datasets & APIs</h3>
                  <p className="text-xs text-gray-400 truncate max-w-[300px]">For: {ideaTitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 space-y-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 text-accent-400 animate-spin mb-3" />
                  <p className="text-gray-400 text-sm">Finding the best datasets and APIs...</p>
                </div>
              ) : (
                <>
                  {/* Datasets */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recommended Datasets</h4>
                    </div>
                    <div className="space-y-2">
                      {datasets.map((ds, i) => (
                        <motion.a
                          key={i}
                          href={ds.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">{ds.name}</h5>
                              <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{ds.description}</p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* APIs */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Plug className="w-4 h-4 text-green-400" />
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recommended APIs</h4>
                    </div>
                    <div className="space-y-2">
                      {apis.map((api, i) => (
                        <motion.a
                          key={i}
                          href={api.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/30 hover:bg-green-500/5 transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">{api.name}</h5>
                              <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-green-400 transition-colors" />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{api.description}</p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
