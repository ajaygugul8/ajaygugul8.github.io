import { motion } from "motion/react";
import { User, FolderOpen, Mail, Lock, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FridayAIChatModal from "./FridayAIChatModal";
import FloatingFridayButton from "./FloatingFridayButton";

export default function Agent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 text-[#1a1a1a] dark:text-[#faf9f6]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-[#1a1a1a] dark:text-[#faf9f6]">Friday</h1>
              <p className="text-2xl text-[#555] dark:text-[#faf9f6]/70">
                My personal AI — under active development
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30">
              <div className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-500 animate-pulse" />
              <span className="text-sm text-amber-700 dark:text-amber-500">Under Development</span>
            </div>
          </motion.div>
          
          {/* Right Side - Animated Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <AnimatedOrb />
          </motion.div>
        </section>
        
        {/* Mock Chat UI */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl bg-white/90 dark:bg-neutral-900/50 backdrop-blur-xl border border-[#A366FF]/20 dark:border-[#A366FF]/20 shadow-2xl overflow-hidden">
            {/* Lock Overlay */}
            <div className="absolute inset-0 bg-white/90 dark:bg-neutral-950/70 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center space-y-3">
                <Lock className="w-12 h-12 text-[#A366FF] mx-auto" />
                <p className="text-lg text-[#555] dark:text-[#faf9f6]/70">Coming Soon</p>
              </div>
            </div>
            
            {/* Chat Content */}
            <div className="p-8 space-y-6">
              {/* Mock Messages */}
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-[#A366FF] text-white px-6 py-3 rounded-2xl rounded-tr-sm max-w-xs">
                    Who are you?
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-neutral-200 dark:bg-neutral-800 text-[#1a1a1a] dark:text-[#faf9f6] px-6 py-3 rounded-2xl rounded-tl-sm max-w-xs">
                    I'm Friday — Ajay's AI agent.
                  </div>
                </div>
              </div>
              
              {/* Input Box */}
              <div className="relative">
                <input
                  type="text"
                  disabled
                  placeholder="Friday is waking up…"
                  className="w-full px-6 py-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700/50 text-[#555] dark:text-[#faf9f6]/40 placeholder:text-neutral-500 dark:placeholder:text-[#faf9f6]/40 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Friday AI Chat Modal */}
      <FridayAIChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      {/* Floating Friday Button */}
      <FloatingFridayButton 
        isOpen={isModalOpen}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl p-8 bg-white dark:bg-neutral-900/30 backdrop-blur-xl border border-[#A366FF]/20 dark:border-[#A366FF]/20 hover:border-[#A366FF]/50 dark:hover:border-[#A366FF]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(163,102,255,0.15)]"
    >
      <div className="space-y-4">
        <div className="text-[#A366FF] group-hover:text-[#F97316] transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-[#1a1a1a] dark:text-[#faf9f6]">{title}</h3>
        <p className="text-[#555] dark:text-[#faf9f6]/70">{description}</p>
      </div>
    </motion.div>
  );
}

function AnimatedOrb() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const width = canvas.width = 400;
    const height = canvas.height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    
    let time = 0;
    
    function drawOrb() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient for the orb
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 120);
      gradient.addColorStop(0, "rgba(163, 102, 255, 0.8)");
      gradient.addColorStop(0.5, "rgba(249, 115, 22, 0.4)");
      gradient.addColorStop(1, "rgba(163, 102, 255, 0)");
      
      // Draw pulsing orb
      const pulseScale = 1 + Math.sin(time * 0.02) * 0.1;
      const baseRadius = 80 * pulseScale;
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw waveform rings
      for (let i = 0; i < 3; i++) {
        const offset = i * 40;
        const radius = baseRadius + offset + Math.sin(time * 0.03 + i) * 10;
        const opacity = 0.3 - i * 0.1;
        
        ctx.strokeStyle = `rgba(163, 102, 255, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const wave = Math.sin(angle * 3 + time * 0.05 + i) * 5;
          const r = radius + wave;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.stroke();
      }
      
      // Draw particles
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + time * 0.01;
        const radius = 100 + Math.sin(time * 0.02 + i) * 20;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const size = 2 + Math.sin(time * 0.03 + i) * 1;
        
        ctx.fillStyle = i % 2 === 0 ? "rgba(163, 102, 255, 0.6)" : "rgba(249, 115, 22, 0.6)";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      time += 1;
    }
    
    const animationId = setInterval(drawOrb, 1000 / 60);
    
    return () => clearInterval(animationId);
  }, []);
  
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-md"
      />
      <div className="absolute inset-0 bg-gradient-radial from-[#A366FF]/20 via-transparent to-transparent blur-3xl" />
    </div>
  );
}
