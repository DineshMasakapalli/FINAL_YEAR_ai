import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, CircuitBoard, Wrench, Building2, Sparkles, Check, X, Mic, MicOff } from 'lucide-react';
import type { GenerateInput } from '@/types';

const branches = [
  { value: 'CSE', label: 'Computer Science (CSE)', icon: Cpu },
  { value: 'IT', label: 'Information Technology (IT)', icon: Code2 },
  { value: 'ECE', label: 'Electronics (ECE)', icon: CircuitBoard },
  { value: 'Mechanical', label: 'Mechanical Engineering', icon: Wrench },
  { value: 'Civil', label: 'Civil Engineering', icon: Building2 },
];

const interestOptions = ['AI/ML', 'Web Dev', 'IoT', 'Blockchain', 'Cybersecurity', 'App Dev', 'Data Science', 'AR/VR'];

const domainOptions = ['Healthcare', 'Education', 'Agriculture', 'Finance', 'Smart City'];

const projectTypes = ['Major', 'Mini', 'Startup Idea'];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

interface InputFormProps {
  onGenerate: (input: GenerateInput) => void;
  isLoading: boolean;
}

export default function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [branch, setBranch] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState('');
  const [domain, setDomain] = useState<string[]>([]);
  const [projectType, setProjectType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<unknown>(null);

  const toggleArrayItem = (arr: string[], value: string, setter: (v: string[]) => void) => {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice input is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      (recognitionRef.current as { stop: () => void })?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition() as { continuous: boolean; interimResults: boolean; lang: string; start: () => void; stop: () => void; onresult: ((e: { results: { 0: { 0: { transcript: string } } }[] }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null };
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setSkills((prev) => {
        const trimmed = prev.trim();
        return trimmed ? trimmed + ', ' + transcript : transcript;
      });
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!branch) newErrors.branch = 'Please select your branch';
    if (interests.length === 0) newErrors.interests = 'Select at least one interest';
    if (!skills.trim()) newErrors.skills = 'Enter your skills';
    if (domain.length === 0) newErrors.domain = 'Select a domain';
    if (!projectType) newErrors.projectType = 'Select a project type';
    if (!difficulty) newErrors.difficulty = 'Select a difficulty level';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onGenerate({ branch, interests, skills: skills.trim(), domain: domain.join(', '), projectType, difficulty });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-6 py-12"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
          <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">Step 1</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Tell Us About You</h2>
        <p className="text-gray-400">The more we know, the better your project ideas will be.</p>
      </div>

      <div className="glass rounded-3xl p-8 space-y-8">
        {/* Branch */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Your Branch</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {branches.map((b) => {
              const Icon = b.icon;
              const selected = branch === b.value;
              return (
                <motion.button
                  key={b.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setBranch(b.value)}
                  className={'flex items-center gap-3 p-4 rounded-xl border transition-all text-left ' + (selected ? 'bg-accent-500/20 border-accent-500/50 text-white' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200')}
                >
                  <Icon className={'w-5 h-5 ' + (selected ? 'text-accent-400' : 'text-gray-500')} />
                  <span className="text-sm font-medium">{b.label}</span>
                </motion.button>
              );
            })}
          </div>
          {errors.branch && <p className="text-red-400 text-xs mt-2">{errors.branch}</p>}
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Your Interests</label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <motion.button
                  key={interest}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleArrayItem(interests, interest, setInterests)}
                  className={'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ' + (selected ? 'bg-accent-500/20 border border-accent-500/50 text-accent-300' : 'border border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200')}
                >
                  {selected ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 opacity-0" />}
                  {interest}
                </motion.button>
              );
            })}
          </div>
          {errors.interests && <p className="text-red-400 text-xs mt-2">{errors.interests}</p>}
        </div>

        {/* Skills with Voice Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Your Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., Python, React, Arduino, TensorFlow..."
              className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceInput}
              className={'flex items-center justify-center gap-2 px-4 rounded-xl border transition-all ' + (isListening ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'border-white/10 text-gray-400 hover:border-accent-500/30 hover:text-accent-400')}
              title="Voice input"
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-medium hidden sm:inline">Stop</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">Speak</span>
                </>
              )}
            </motion.button>
          </div>
          {isListening && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-accent-400 mt-2 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              Listening... speak your skills
            </motion.p>
          )}
          {errors.skills && <p className="text-red-400 text-xs mt-2">{errors.skills}</p>}
        </div>

        {/* Domain */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Domain Preference</label>
          <div className="flex flex-wrap gap-2">
            {domainOptions.map((d) => {
              const selected = domain.includes(d);
              return (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleArrayItem(domain, d, setDomain)}
                  className={'px-4 py-2 rounded-full text-sm font-medium transition-all ' + (selected ? 'bg-accent-500/20 border border-accent-500/50 text-accent-300' : 'border border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200')}
                >
                  {d}
                </motion.button>
              );
            })}
          </div>
          {errors.domain && <p className="text-red-400 text-xs mt-2">{errors.domain}</p>}
        </div>

        {/* Project Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Project Type</label>
          <div className="grid grid-cols-3 gap-3">
            {projectTypes.map((type) => {
              const selected = projectType === type;
              return (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setProjectType(type)}
                  className={'px-4 py-3 rounded-xl border text-sm font-medium transition-all ' + (selected ? 'bg-accent-500/20 border-accent-500/50 text-white' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200')}
                >
                  {type}
                </motion.button>
              );
            })}
          </div>
          {errors.projectType && <p className="text-red-400 text-xs mt-2">{errors.projectType}</p>}
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">Difficulty Level</label>
          <div className="grid grid-cols-3 gap-3">
            {difficulties.map((d) => {
              const selected = difficulty === d;
              return (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setDifficulty(d)}
                  className={'px-4 py-3 rounded-xl border text-sm font-medium transition-all ' + (selected ? 'bg-accent-500/20 border-accent-500/50 text-white' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200')}
                >
                  {d}
                </motion.button>
              );
            })}
          </div>
          {errors.difficulty && <p className="text-red-400 text-xs mt-2">{errors.difficulty}</p>}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-accent-600 to-purple-600 text-white font-semibold rounded-2xl text-lg transition-all hover:shadow-2xl hover:shadow-accent-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Ideas...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Project Ideas
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
