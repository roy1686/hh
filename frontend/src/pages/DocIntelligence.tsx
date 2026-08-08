import { motion } from 'framer-motion';
import { Brain, FileSearch, Search, Cpu } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export function DocIntelligence() {
  const { currentAnalysis } = useAppContext();
  
  // Use API data if available, fallback to empty array safely
  const extractedEntities = currentAnalysis?.extractedEntities || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Brain className="w-6 h-6 text-purple-400" /> Document Intelligence Engine
      </h2>

      {extractedEntities.length === 0 ? (
        <div className="glass-panel p-6 text-center text-gray-500 py-12">
          <p>No document analyzed yet or no entities extracted. Run an analysis in the Document Center.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extractedEntities.map((ent, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 border-t-2 border-purple-500/50 hover:bg-purple-500/5 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-400 mb-2">{ent.type || 'Unknown Entity'}</h3>
              <div className="text-3xl font-bold text-white mb-2">
                {Number(ent.count ?? 0).toLocaleString()}
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Avg Confidence</span>
                <span className="text-green-400">{Number(ent.conf ?? 0)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${Number(ent.conf ?? 0)}%` }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-white">Semantic Search Playground</h3>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Ask the AI: 'Show me all vendor agreements with a liability cap under $50,000'"
            className="w-full bg-surface/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50"
            disabled
          />
        </div>
        <div className="mt-8 text-center text-gray-500 py-12 border-2 border-dashed border-gray-800 rounded-xl">
          <Cpu className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Run a semantic query to view deep intelligence results.</p>
        </div>
      </div>
    </div>
  );
}
