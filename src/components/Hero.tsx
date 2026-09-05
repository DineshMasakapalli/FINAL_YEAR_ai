import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, TrendingUp, Star, FileText, Link, TrafficCone, Heart, Shield, Box, Code } from 'lucide-react';
import { trendingIdeas } from '@/data/mockData';

const iconMap: Record<string, typeof Zap> = {
  FileText,
  Link,
  TrafficCone,
  Heart,
  Shield,
  Box,
  TrendingUp,
  Code,
};

interface HeroProps {
  onGenerate: () => void;
  onTrendingClick: (domain: string) => void;
}

export default function Hero({ onGenerate, onTrendingClick }: HeroProps) {
  const [activeTrend, setActiveTrend] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrend((prev) => (prev + 1) % trendingIdeas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent-400" />
          <span className="text-sm font-medium text-gray-300">AI-Powered Project Mentor</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">FinalYear AI</span>
          <br />
          <span className="gradient-text">From Idea to Project</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Generate innovative final-year project ideas tailored to your branch, interests, and skills.
          Get a complete roadmap, tech stack, and AI mentorship — all in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={onGenerate}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-600 to-purple-600 text-white font-semibold rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-accent-500/30"
          >
            <Zap className="w-5 h-5 group-hover:animate-pulse" />
            Generate My Project Idea
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Trending Ideas Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-accent-400" />
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Trending Project Ideas</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {trendingIdeas.map((idea, index) => {
              const Icon = iconMap[idea.icon] || Zap;
              const isActive = index === activeTrend;
              return (
                <button
                  key={idea.title}
                  onClick={() => onTrendingClick(idea.domain)}
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'glass border-accent-500/50 scale-105 shadow-lg shadow-accent-500/10'
                      : 'glass border-white/5 hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {idea.title}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    idea.trend === 'Hot' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {idea.trend}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { label: 'Project Ideas', value: '50+' },
            { label: 'Tech Domains', value: '8' },
            { label: 'AI Mentor', value: '24/7' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
