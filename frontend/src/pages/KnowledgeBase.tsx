import { motion } from 'framer-motion';
import { Book, Database, Cloud, RefreshCw } from 'lucide-react';

export function KnowledgeBase() {
  const sources = [
    { name: 'Corporate Policies (SharePoint)', type: 'Vector Database', docs: 1250, status: 'Synced' },
    { name: 'Historical Contracts (AWS S3)', type: 'Document Store', docs: 45000, status: 'Syncing...' },
    { name: 'Compliance Rulesets 2026', type: 'Rules Engine', docs: 42, status: 'Synced' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Book className="w-6 h-6 text-green-400" /> Enterprise Knowledge Base
        </h2>
        <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary/30 transition-colors font-medium text-sm">
          Connect Data Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map((src, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-surface rounded-lg">
                  {src.name.includes('SharePoint') ? <Cloud className="w-6 h-6 text-blue-400" /> : <Database className="w-6 h-6 text-purple-400" />}
                </div>
                <span className={`px-2 py-1 text-xs rounded font-medium flex items-center gap-1 ${src.status === 'Synced' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                  {src.status === 'Syncing...' && <RefreshCw className="w-3 h-3 animate-spin" />}
                  {src.status}
                </span>
              </div>
              <h3 className="font-semibold text-white mb-1">{src.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{src.type}</p>
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <div className="text-sm text-gray-400">
                <span className="font-bold text-white">{src.docs.toLocaleString()}</span> indexed documents
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
