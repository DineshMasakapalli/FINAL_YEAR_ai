import { motion } from 'framer-motion';
import { Clock, Users, IndianRupee, Gauge } from 'lucide-react';
import type { ProjectIdea } from '@/types';

function estimateWeeks(roadmap: ProjectIdea['roadmap']): number {
  let total = 0;
  for (const phase of roadmap) {
    const match = phase.weeks.match(/(\d+)/g);
    if (match) {
      const nums = match.map(Number);
      if (nums.length >= 2) total += nums[1] - nums[0] + 1;
      else total += nums[0];
    }
  }
  return total || 14;
}

function estimateTeamSize(idea: ProjectIdea): number {
  const techCount = idea.techStack.frontend.length + idea.techStack.backend.length + idea.techStack.aiml.length + idea.techStack.hardware.length;
  if (techCount > 12) return 4;
  if (techCount > 8) return 3;
  return 2;
}

function parseCost(costStr: string): number {
  const match = costStr.match(/₹([\d,]+)/);
  if (match) return parseInt(match[1].replace(/,/g, ''), 10);
  const numMatch = costStr.match(/(\d[\d,]*)/);
  return numMatch ? parseInt(numMatch[1].replace(/,/g, ''), 10) : 5000;
}

const difficultyMap: Record<string, number> = { Beginner: 30, Intermediate: 60, Advanced: 90 };

export default function CostTimeCalculator({ idea }: { idea: ProjectIdea }) {
  const weeks = estimateWeeks(idea.roadmap);
  const teamSize = estimateTeamSize(idea);
  const cost = parseCost(idea.estimatedCost);
  const difficultyScore = difficultyMap[idea.innovationScore >= 9 ? 'Advanced' : idea.innovationScore >= 7 ? 'Intermediate' : 'Beginner'] || 60;

  const stats = [
    { icon: Clock, label: 'Est. Time', value: weeks + ' weeks', color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-600/5' },
    { icon: Users, label: 'Team Size', value: teamSize + ' members', color: 'text-green-400', bg: 'from-green-500/10 to-green-600/5' },
    { icon: IndianRupee, label: 'Est. Cost', value: '₹' + cost.toLocaleString('en-IN'), color: 'text-yellow-400', bg: 'from-yellow-500/10 to-yellow-600/5' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Gauge className="w-4 h-4 text-accent-400" />
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Cost & Time Calculator</h4>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={'rounded-xl p-3 bg-gradient-to-br ' + stat.bg + ' border border-white/10 text-center'}
            >
              <Icon className={'w-5 h-5 mx-auto mb-1.5 ' + stat.color} />
              <div className={'text-sm font-bold ' + stat.color}>{stat.value}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Difficulty meter */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-gray-400">Difficulty Level</span>
          <span className="text-xs font-bold text-accent-400">{difficultyScore}%</span>
        </div>
        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: difficultyScore + '%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
          />
        </div>
      </div>
    </div>
  );
}
