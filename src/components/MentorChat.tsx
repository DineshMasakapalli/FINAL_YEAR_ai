import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles, Bot, User } from 'lucide-react';
import type { ProjectIdea, ChatMessage } from '@/types';
import { chatWithMentor } from '@/services/gemini';

interface MentorChatProps {
  idea: ProjectIdea | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MentorChat({ idea, isOpen, onClose }: MentorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0 && idea) {
      setMessages([{
        role: 'assistant',
        content: 'Hi! I\'m your AI mentor for "' + idea.title + '". Ask me anything — how to start, which datasets to use, how to improve your project, or anything else!',
        timestamp: Date.now(),
      }]);
    }
  }, [isOpen, idea, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await chatWithMentor(userMessage.content, idea, messages);

    setMessages((prev) => [...prev, {
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
    }]);
    setIsTyping(false);
  };

  const suggestedQuestions = [
    'How do I start this project?',
    'Which datasets should I use?',
    'How can I improve this idea?',
    'What are the key challenges?',
  ];

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] z-50 glass-dark border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">AI Mentor</h3>
                  <p className="text-xs text-gray-400">Ask anything about your project</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Context banner */}
            {idea && (
              <div className="px-4 py-2.5 bg-accent-500/10 border-b border-accent-500/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-accent-400 flex-shrink-0" />
                  <p className="text-xs text-accent-300 truncate">{idea.title}</p>
                </div>
              </div>
            )}

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={'flex gap-2.5 ' + (msg.role === 'user' ? 'flex-row-reverse' : '')}
                >
                  <div className={'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ' + (msg.role === 'user' ? 'bg-white/10' : 'bg-gradient-to-br from-accent-500 to-purple-600')}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-gray-300" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ' + (msg.role === 'user' ? 'bg-accent-500/20 text-white border border-accent-500/30' : 'bg-white/5 text-gray-200 border border-white/10')}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {messages.length <= 1 && !isTyping && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-gray-500 font-medium">Suggested questions:</p>
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="w-full text-left px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your mentor..."
                  className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20 transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-3 rounded-xl bg-gradient-to-r from-accent-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
