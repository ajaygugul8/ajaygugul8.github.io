import { motion } from "motion/react";
import { Mic, RefreshCw, Volume2, Square, Lock, X } from "lucide-react";

export default function FridayAIChatModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
          
          {/* Lock icon */}
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
              <Lock className="w-6 h-6 text-amber-600 dark:text-amber-500" />
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-xl font-bold text-center text-neutral-900 dark:text-white">
            Friday AI
          </h2>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Microphone instruction */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
                <Mic className="w-8 h-8 text-red-600 dark:text-red-500" />
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Tap the 🔒 to unlock your microphone and start speaking.
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
              <Mic className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              <span className="text-xs font-medium text-blue-900 dark:text-blue-400">One Time Question</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">
              <RefreshCw className="w-6 h-6 text-green-600 dark:text-green-500" />
              <span className="text-xs font-medium text-green-900 dark:text-green-400">Auto Mode</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors">
              <Volume2 className="w-6 h-6 text-purple-600 dark:text-purple-500" />
              <span className="text-xs font-medium text-purple-900 dark:text-purple-400">Test Voice</span>
            </button>
          </div>
          
          {/* Flat mode button */}
          <div className="flex justify-center">
            <button className="flex flex-col items-center gap-3 p-6 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl">
              <Square className="w-8 h-8 text-white" />
              <span className="text-sm font-semibold text-white">Flat Mode</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
