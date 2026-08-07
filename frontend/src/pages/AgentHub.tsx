import { motion } from 'framer-motion';
import { Cpu, Search, CheckCircle, Shield, FileText, Activity, Layers, AlertTriangle } from 'lucide-react';
import { mockData } from '../store/mockData';

export function AgentHub() {
  const agents = [
    { name: "Document Intake Agent", status: "running", task: "Parsing uploaded file", icon: Layers, conf: 99 },
    { name: "OCR & Vision Agent", status: "completed", task: "Extracted text & tables", icon: FileText, conf: 98 },
    { name: "Classification Agent", status: "completed", task: "Master Service Agreement", icon: Search, conf: 95 },
    { name: "Compliance Auditor", status: "running", task: "Checking against GDPR rules", icon: CheckCircle, conf: 82 },
    { name: "Risk Analysis Agent", status: "idle", task: "Waiting for compliance...", icon: AlertTriangle, conf: 0 },
    { name: "Fraud Detection Agent", status: "idle", task: "Waiting for risk...", icon: Shield, conf: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary" /> Autonomous Agents Hub
        </h2>
        <div className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Swarm Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel p-6 relative overflow-hidden group ${agent.status === 'running' ? 'border-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-white/5'}`}
          >
            {agent.status === 'running' && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[shimmer_2s_infinite]"></div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${agent.status === 'running' ? 'bg-primary/20 text-primary' : agent.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-surface text-gray-500'}`}>
                <agent.icon className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded uppercase tracking-wider ${agent.status === 'running' ? 'bg-primary/20 text-primary' : agent.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-surface text-gray-500 border border-white/5'}`}>
                {agent.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-1">{agent.name}</h3>
            <p className="text-gray-400 text-sm mb-4 h-10">{agent.task}</p>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Confidence</span>
                <span className={agent.conf > 90 ? 'text-green-400' : agent.conf > 80 ? 'text-orange-400' : 'text-gray-500'}>{agent.conf}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${agent.conf > 90 ? 'bg-green-400' : agent.conf > 80 ? 'bg-orange-400' : 'bg-gray-600'}`} 
                  style={{ width: `${agent.conf}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
