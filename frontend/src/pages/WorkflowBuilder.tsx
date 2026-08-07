import { motion } from 'framer-motion';
import { Share2, FileText, CheckCircle, AlertTriangle, Shield, Download, MoreVertical } from 'lucide-react';

export function WorkflowBuilder() {
  const nodes = [
    { id: 1, title: 'Document Upload', type: 'trigger', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
    { id: 2, title: 'OCR & Data Extraction', type: 'agent', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/20', borderColor: 'border-purple-500/30' },
    { id: 3, title: 'Compliance Auditor', type: 'agent', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', borderColor: 'border-green-500/30' },
    { id: 4, title: 'Risk Analyzer', type: 'agent', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20', borderColor: 'border-red-500/30' },
    { id: 5, title: 'Fraud Detection', type: 'agent', icon: Shield, color: 'text-orange-400', bg: 'bg-orange-500/20', borderColor: 'border-orange-500/30' },
    { id: 6, title: 'Final Report Generation', type: 'action', icon: Download, color: 'text-primary', bg: 'bg-primary/20', borderColor: 'border-primary/30' },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Share2 className="w-6 h-6 text-primary" /> Visual Workflow Builder
        </h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-surface text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all text-sm font-medium">Add Node</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)]">Save Pipeline</button>
        </div>
      </div>

      <div className="flex-1 glass-panel relative overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] min-h-[500px]">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-24 right-24 h-1 bg-gray-700/50 -translate-y-1/2 z-0">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-primary to-green-500" 
            initial={{ width: 0 }} 
            animate={{ width: '100%' }} 
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.div>
        </div>

        {/* Nodes */}
        <div className="absolute inset-0 flex items-center justify-between px-12 z-10 overflow-x-auto">
          {nodes.map((node, i) => (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`w-40 shrink-0 bg-surface/90 backdrop-blur-md border ${node.borderColor} p-4 rounded-2xl shadow-xl flex flex-col items-center text-center mx-4 group hover:-translate-y-2 transition-transform cursor-grab`}
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </div>
              <div className={`w-14 h-14 ${node.bg} rounded-xl flex items-center justify-center mb-4 shadow-lg border border-white/5`}>
                <node.icon className={`w-7 h-7 ${node.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 leading-tight">{node.title}</h3>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${node.color} opacity-80`}>
                {node.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
