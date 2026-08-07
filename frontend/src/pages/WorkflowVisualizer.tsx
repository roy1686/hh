import { motion } from 'framer-motion';
import { Activity, GitMerge, FileText, Database, Shield, Zap } from 'lucide-react';

export function WorkflowVisualizer() {
  const nodes = [
    { id: '1', label: 'Ingestion Layer', icon: FileText, delay: 0.1, status: 'active' },
    { id: '2', label: 'OCR & Parser', icon: Zap, delay: 0.2, status: 'active' },
    { id: '3', label: 'LLM Embeddings', icon: Database, delay: 0.3, status: 'idle' },
    { id: '4', label: 'Risk Engine', icon: Shield, delay: 0.4, status: 'idle' },
    { id: '5', label: 'Compliance Audit', icon: Shield, delay: 0.5, status: 'error' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <GitMerge className="w-6 h-6 text-primary" /> Live Workflow Topology
        </h2>
      </div>

      <div className="glass-panel p-8 min-h-[500px] flex items-center justify-center relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-surface to-surface">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center w-full max-w-5xl">
          {nodes.map((node, i) => (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: node.delay }}
              className="flex flex-col items-center relative"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 z-10 bg-surface shadow-xl
                ${node.status === 'active' ? 'border-primary text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 
                  node.status === 'error' ? 'border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 
                  'border-gray-600 text-gray-400'}
              `}>
                <node.icon className="w-8 h-8" />
              </div>
              <p className="mt-4 font-semibold text-sm text-center text-gray-300">{node.label}</p>
              
              {/* Connecting Line */}
              {i < nodes.length - 1 && (
                <div className="hidden md:block absolute top-8 left-16 w-full h-[2px] bg-gray-700 -z-10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: node.delay + 0.1, duration: 0.5 }}
                    className={`h-full ${node.status === 'active' ? 'bg-primary' : 'bg-transparent'}`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
