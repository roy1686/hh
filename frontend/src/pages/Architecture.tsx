import { motion } from 'framer-motion';
import { Server, Brain, Shield, FileText, Database, ArrowRight } from 'lucide-react';

export function Architecture() {
  const nodes = [
    { id: 1, label: 'Browser Client', icon: FileText, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 2, label: 'Agent Orchestrator', icon: Server, color: 'bg-primary/20 text-primary border-primary/30' },
    { id: 3, label: 'Gemini 3.5 Flash', icon: Brain, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 4, label: 'Knowledge Base', icon: Database, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    { id: 5, label: 'Compliance Engine', icon: Shield, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { id: 6, label: 'Risk Engine', icon: Shield, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 7, label: 'Report Generator', icon: FileText, color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Server className="w-6 h-6 text-primary" /> System Architecture
      </h2>

      <div className="glass-panel p-12 flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        
        <div className="flex flex-col items-center gap-8 relative z-10 w-full max-w-4xl">
          {/* Top Level */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl border flex flex-col items-center w-64 ${nodes[0].color} bg-surface/80 backdrop-blur-md`}>
            {(() => {
              const Icon = nodes[0].icon;
              return <Icon className="w-8 h-8 mb-2" />;
            })()}
            <span className="font-semibold text-white">{nodes[0].label}</span>
          </motion.div>

          <ArrowRight className="w-6 h-6 text-gray-600 rotate-90" />

          {/* Orchestrator Level */}
          <div className="flex gap-16 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className={`p-4 rounded-xl border flex flex-col items-center w-64 ${nodes[1].color} bg-surface/80 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.2)]`}>
              {(() => {
                const Icon = nodes[1].icon;
                return <Icon className="w-8 h-8 mb-2" />;
              })()}
              <span className="font-semibold text-white">{nodes[1].label}</span>
            </motion.div>
            <ArrowRight className="w-6 h-6 text-gray-600" />
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className={`p-4 rounded-xl border flex flex-col items-center w-64 ${nodes[2].color} bg-surface/80 backdrop-blur-md`}>
              {(() => {
                const Icon = nodes[2].icon;
                return <Icon className="w-8 h-8 mb-2" />;
              })()}
              <span className="font-semibold text-white">{nodes[2].label}</span>
            </motion.div>
          </div>

          <ArrowRight className="w-6 h-6 text-gray-600 rotate-90" />

          {/* Engines Level */}
          <div className="flex gap-6 w-full justify-center">
            {[4, 5, 6].map((idx, i) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1) }} className={`p-4 rounded-xl border flex flex-col items-center w-48 ${nodes[idx].color} bg-surface/80 backdrop-blur-md`}>
                {(() => {
                  const Icon = nodes[idx].icon;
                  return <Icon className="w-6 h-6 mb-2" />;
                })()}
                <span className="font-semibold text-white text-sm text-center">{nodes[idx].label}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
