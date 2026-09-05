import { motion } from 'framer-motion';
import { Brain, Bookmark, Sun, Moon, Sparkles } from 'lucide-react';
import type { Theme } from '@/types';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenLibrary: () => void;
  savedCount: number;
  onLogoClick: () => void;
}

export default function Navbar({ theme, onToggleTheme, onOpenLibrary, savedCount, onLogoClick }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-30 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-white text-lg leading-none">FinalYear AI</h1>
            <p className="text-xs text-gray-500 leading-none mt-0.5">From Idea to Project</p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLibrary}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-white/10 transition-all text-gray-300 hover:text-white"
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">My Library</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all text-gray-300 hover:text-white"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
