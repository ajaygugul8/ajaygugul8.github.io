import { motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingFridayButton({ isOpen, onClick }) {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-[#A366FF] to-[#F97316] hover:shadow-xl'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Pulsing dot indicator */}
            <motion.div
              className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </motion.button>
      
      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
            Chat with Friday
          </div>
        </div>
      )}
    </motion.div>
  );
}
