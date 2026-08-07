import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Activity, Layers, CheckCircle, Search } from 'lucide-react';
import { processQuery } from '../gemini';
import { useAppContext } from '../store/AppContext';

export function Copilot() {
  const { documentContext } = useAppContext();
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const initialAgents = [
    { name: "Knowledge Retrieval Agent", status: "idle", icon: Layers },
    { name: "Reasoning Agent", status: "idle", icon: Search },
    { name: "Citation Validation Agent", status: "idle", icon: CheckCircle },
    { name: "Compliance Audit Agent", status: "idle", icon: Shield },
  ];
  const [agents, setAgents] = useState(initialAgents);



  const handleQuery = async () => {
    if (!query) return;
    setLoading(true);
    setAnswer('');
    
    // Simulate agent workflow
    setAgents(initialAgents.map((a, i) => i === 0 ? { ...a, status: "running" } : { ...a, status: "idle" }));
    
    try {
      // Step 1: Retrieval
      await new Promise(r => setTimeout(r, 800));
      setAgents(prev => prev.map((a, i) => i === 0 ? { ...a, status: "completed" } : i === 1 ? { ...a, status: "running" } : a));
      
      // Step 2: Reasoning (Actual AI call)
      const finalAnswer = await processQuery(query, documentContext || "No document provided.");
      
      setAgents(prev => prev.map((a, i) => i === 1 ? { ...a, status: "completed" } : i === 2 ? { ...a, status: "running" } : a));
      await new Promise(r => setTimeout(r, 600));
      
      // Step 3 & 4: Validation & Compliance (Simulated)
      setAgents(prev => prev.map((a, i) => i === 2 ? { ...a, status: "completed" } : i === 3 ? { ...a, status: "running" } : a));
      await new Promise(r => setTimeout(r, 500));
      
      setAgents(prev => prev.map(a => ({ ...a, status: 'completed' })));
      
      setAnswer(finalAnswer);
    } catch (err) {
      console.error(err);
      setAnswer('Error querying the system.');
      setAgents(initialAgents.map(a => ({ ...a, status: 'error' })));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 w-full">
      {/* Left Column: Upload & Chat */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <h2 className="text-2xl font-semibold mb-2">Knowledge Base Loaded</h2>
          <p className="text-gray-400 mb-6 text-sm">Your enterprise document is ready for analysis.</p>
          
          <div className="border border-primary/30 bg-primary/5 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">Document Active</p>
                <p className="text-sm text-gray-400">The multi-agent system has contextualized this document.</p>
              </div>
            </div>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8 flex-1 flex flex-col"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Search className="w-5 h-5 text-accent" /> AI Chat
          </h2>
          <div className="flex-1 bg-surface/30 rounded-xl border border-gray-800 p-4 mb-4 min-h-[200px] flex flex-col text-gray-300 overflow-y-auto custom-scrollbar">
            {!answer && !loading && (
              <div className="m-auto text-gray-500 text-center">
                {documentContext ? "Ready! Ask a question." : "Upload a document to start querying the Multi-Agent System."}
              </div>
            )}
            {loading && <div className="m-auto">Processing query...</div>}
            {answer && (
              <div className="whitespace-pre-wrap">{answer}</div>
            )}
          </div>
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
              placeholder="Ask about compliance risks, obligations, or deadlines..." 
              className="w-full bg-surface border border-gray-700 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <button onClick={handleQuery} className="absolute right-2 top-2 p-1.5 bg-primary rounded-lg text-white hover:bg-primary/90">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Live Agent Workflow */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 flex-1"
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Live Agent Workflow
          </h2>
          <p className="text-gray-400 text-sm mb-6">Real-time trace of the multi-agent orchestration.</p>

          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
            
            {agents.map((agent, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white/10 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${agent.status === 'completed' ? 'bg-green-600 text-white' : agent.status === 'running' ? 'bg-primary text-white animate-pulse' : 'bg-surface text-gray-500'}`}>
                  <agent.icon className="w-4 h-4" />
                </div>
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-surface/50 backdrop-blur-sm shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-gray-300 text-sm">{agent.name}</div>
                  </div>
                  <div className="text-gray-500 text-xs font-medium">
                    {agent.status === 'idle' ? 'Waiting for input...' : agent.status === 'running' ? 'Processing...' : 'Completed'}
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}
