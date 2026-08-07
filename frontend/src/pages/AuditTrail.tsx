import { motion } from 'framer-motion';
import { Activity, Terminal, ShieldCheck, Shield } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export function AuditTrail() {
  const { currentAnalysis } = useAppContext();

  if (!currentAnalysis) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 glass-panel">
        <Shield className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg">No audit logs available.</p>
        <p className="text-sm mt-2 text-center max-w-sm">Run a document through the orchestrator to view its processing timeline.</p>
      </div>
    );
  }

  const logs = currentAnalysis.auditTimeline || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Activity className="w-6 h-6 text-red-400" /> Immutable Audit Trail
      </h2>

      <div className="glass-panel p-6 border-l-4 border-l-red-500 relative overflow-hidden min-h-[400px]">
        <div className="absolute top-4 right-4 text-xs text-gray-500 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-green-500" /> SOC2 Compliant Log
        </div>
        
        <div className="flex items-center gap-2 mb-6 text-gray-400">
          <Terminal className="w-5 h-5" /> 
          <span className="font-mono text-sm">/var/log/docuguard/audit.log</span>
        </div>

        <div className="space-y-3 font-mono text-xs md:text-sm overflow-x-auto">
          {logs.length > 0 ? logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-2 hover:bg-white/5 rounded transition-colors whitespace-nowrap"
            >
              <span className="text-gray-500 shrink-0">[{log.time}]</span>
              <span className={log.msg.includes('Orchestrator') ? 'text-primary w-40 shrink-0' : log.msg.includes('Agent') ? 'text-green-400 w-40 shrink-0' : 'text-orange-400 w-40 shrink-0'}>
                {log.msg.includes('Agent') ? log.msg.split(':')[0] : 'System'}
              </span>
              <span className="text-gray-300 flex-1">{log.msg.includes(':') ? log.msg.substring(log.msg.indexOf(':') + 1).trim() : log.msg}</span>
              <span className="text-gray-600 shrink-0">IP: Internal</span>
            </motion.div>
          )) : (
            <div className="text-gray-500">No logs generated for this session yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
