import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight, Zap, Lock, BarChart, Cpu, ArrowRight } from 'lucide-react';

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Premium particle background
  useEffect(() => {
    // We could add a canvas particle engine here for absolute peak performance,
    // but framer motion handles the DOM nodes well enough for a prototype.
  }, []);

  return (
    <div className="min-h-screen bg-[#010804] text-white overflow-x-hidden selection:bg-[#D4AF37]/30 font-sans">
      
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#10B981]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Premium Navbar */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-[#010804]/60 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#D4AF37] flex items-center justify-center p-[1px] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500">
              <div className="w-full h-full bg-[#010804] rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <span className="font-semibold text-lg tracking-wider">DOCUGUARD <span className="text-[#D4AF37]">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#agents" className="hover:text-white transition-colors">Agent Swarm</a>
            <a href="#security" className="hover:text-white transition-colors">Enterprise Security</a>
          </div>
          <Link 
            to="/app" 
            className="group relative px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 overflow-hidden transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/20 to-[#D4AF37]/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative text-sm font-medium flex items-center gap-2">
              Launch Console <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto w-full relative">
          
          <motion.div style={{ y, opacity }} className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">Enterprise Edition 2.0</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8"
            >
              Intelligent logic. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-white to-[#D4AF37]">
                Flawless execution.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mb-12 leading-relaxed"
            >
              DocuGuard AI is not a dashboard. It is an autonomous swarm of AI agents designed to read, analyze, and secure enterprise contracts at the speed of light.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link 
                to="/app" 
                className="group relative px-8 py-4 rounded-2xl bg-white text-black font-semibold text-lg overflow-hidden transition-transform hover:scale-105 duration-500 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  Enter Command Center <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating UI Elements / Abstract Representation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="absolute top-0 right-0 w-[500px] h-[500px] hidden lg:block"
          >
            <div className="relative w-full h-full">
              {/* Central Core */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/10 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 border border-[#10B981]/20 rounded-full border-dashed"
              />
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 p-4 rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-medium text-gray-300">Risk Engine</span>
                </div>
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div className="text-[10px] text-gray-500">Confidence Score</div>
              </motion.div>

              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-32 right-10 p-4 rounded-2xl bg-surface/80 backdrop-blur-xl border border-[#10B981]/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-4 h-4 text-[#10B981]" />
                  <span className="text-xs font-medium text-gray-300">Compliance</span>
                </div>
                <div className="w-32 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-[#10B981]" />
                </div>
                <div className="mt-2 text-xs text-[#10B981]">No breaches detected</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apple-style feature grid */}
      <section className="py-32 relative z-10 bg-[#010804]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Designed for scale. <br/>Built for security.</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">Every pixel and algorithm is optimized for massive enterprise workloads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Zap}
              title="Hyper-Speed OCR"
              desc="Extract text from 10,000 pages in under 4 seconds using proprietary vision models."
            />
            <FeatureCard 
              icon={Lock}
              title="Military-Grade Security"
              desc="SOC2 Type II compliant with zero-retention policies for sensitive legal documents."
              highlight
            />
            <FeatureCard 
              icon={BarChart}
              title="Explainable Decisions"
              desc="Every AI judgment comes with verifiable citations and confidence metrics."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, highlight = false }: { icon: any, title: string, desc: string, highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:-translate-y-2
      ${highlight 
        ? 'bg-gradient-to-b from-[#10B981]/10 to-transparent border-[#10B981]/30 hover:border-[#10B981]/60 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'}`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6
        ${highlight ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-white/5 text-gray-300'}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light">{desc}</p>
    </div>
  );
}
