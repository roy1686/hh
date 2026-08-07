import { motion } from 'framer-motion';
import { Activity, Terminal, ShieldCheck } from 'lucide-react';

export function AuditTrail() {
  const logs = [
    { time: '10:45:12', user: 'AI Orchestrator', action: 'Flagged vendor agreement for missing indemnity.', ip: 'Internal' },
    { time: '10:40:05', user: 'Sarah Connor', action: 'Approved risk override for Contract #992.', ip: '192.168.1.45' },
    { time: '09:15:30', user: 'System', action: 'Synced 1,250 docs from SharePoint.', ip: 'Internal' },
    { time: '08:00:00', user: 'John Smith', action: 'Changed LLM Engine to Gemini 3.5 Flash.', ip: '10.0.0.12' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Activity className="w-6 h-6 text-red-400" /> Immutable Audit Trail
      </h2>

      <div className="glass-panel p-6 border-l-4 border-l-red-500 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-xs text-gray-500 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-green-500" /> SOC2 Compliant Log
        </div>
        
        <div className="flex items-center gap-2 mb-6 text-gray-400">
          <Terminal className="w-5 h-5" /> 
          <span className="font-mono text-sm">/var/log/docuguard/audit.log</span>
        </div>

        <div className="space-y-3 font-mono text-xs md:text-sm overflow-x-auto">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-2 hover:bg-white/5 rounded transition-colors whitespace-nowrap"
            >
              <span className="text-gray-500 shrink-0">[{log.time}]</span>
              <span className="text-primary w-32 shrink-0">{log.user}</span>
              <span className="text-gray-300 flex-1">{log.action}</span>
              <span className="text-gray-600 shrink-0">IP: {log.ip}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
