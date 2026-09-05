import { motion } from 'framer-motion';
import { Code2, Server, Brain, Cpu, Database, ArrowRight } from 'lucide-react';
import type { ProjectIdea } from '@/types';

export default function ArchitectureDiagram({ idea }: { idea: ProjectIdea }) {
  const layers = [
    { key: 'frontend', label: 'Frontend Layer', items: idea.techStack.frontend, icon: Code2, color: 'border-blue-500/30 bg-blue-500/5', iconColor: 'text-blue-400' },
    { key: 'backend', label: 'Backend Layer', items: idea.techStack.backend, icon: Server, color: 'border-green-500/30 bg-green-500/5', iconColor: 'text-green-400' },
    { key: 'aiml', label: 'AI/ML Layer', items: idea.techStack.aiml, icon: Brain, color: 'border-purple-500/30 bg-purple-500/5', iconColor: 'text-purple-400' },
    { key: 'database', label: 'Database Layer', items: idea.techStack.database, icon: Database, color: 'border-red-500/30 bg-red-500/5', iconColor: 'text-red-400' },
    { key: 'hardware', label: 'Hardware Layer', items: idea.techStack.hardware, icon: Cpu, color: 'border-orange-500/30 bg-orange-500/5', iconColor: 'text-orange-400' },
  ].filter((l) => l.items.length > 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <Server className="w-4 h-4 text-accent-400" />
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">System Architecture Diagram</h4>
      </div>

      <div className="flex flex-col items-center gap-1">
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <div key={layer.key} className="w-full flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className={'w-full max-w-md rounded-xl border p-3 ' + layer.color}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={'w-4 h-4 ' + layer.iconColor} />
                  <span className="text-xs font-semibold text-white">{layer.label}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {layer.items.map((item, j) => (
                    <span key={j} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              {i < layers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                >
                  <ArrowRight className="w-4 h-4 text-gray-600 rotate-90 my-0.5" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
