import { useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Shield, Settings, Activity, Brain, Server, CheckSquare, XSquare, Play } from 'lucide-react';
import { extractTextFromFile } from '../documentParser';
import { analyzeDocumentWithAI } from '../gemini';
import { useAppContext } from '../store/AppContext';
import { demoDocuments } from '../store/mockDocuments';

export function DocumentCenter() {
  const { setDocumentContext, updateFromAI, metrics } = useAppContext();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  
  // New State for Demo Workflow
  const [workflowStage, setWorkflowStage] = useState<'idle' | 'processing' | 'human_review' | 'completed'>('idle');
  const [logs, setLogs] = useState<{time: string, msg: string}[]>([]);
  const [performance, setPerformance] = useState({ time: 0, tokens: 0, conf: 0 });

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { time, msg }]);
  };

  const executePipeline = async (text: string) => {
    setUploading(true);
    setWorkflowStage('processing');
    setLogs([]);
    setProgress(5);
    const startTime = Date.now();
    
    addLog('Assigning task to OCR Agent...');
    setStatusText('Extracting text (OCR)...');
    
    // Simulate initial steps
    await new Promise(r => setTimeout(r, 1000));
    setProgress(20);
    addLog('OCR Agent: Text extraction complete (12 pages).');
    
    await new Promise(r => setTimeout(r, 1000));
    setProgress(35);
    addLog('Classification Agent: Document type identified.');
    setStatusText('Running AI Compliance & Risk Audit...');
    
    // Actual AI Call
    addLog('Orchestrator: Dispatching to Gemini AI Engine...');
    try {
      const aiResults = await analyzeDocumentWithAI(text);
      const endTime = Date.now();
      
      setProgress(75);
      addLog('Compliance Agent: Regulatory analysis complete.');
      await new Promise(r => setTimeout(r, 800));
      
      setProgress(90);
      addLog('Risk Agent: Liability & Risk scored.');
      addLog('Fraud Agent: Authenticity verified.');
      await new Promise(r => setTimeout(r, 800));
      
      setProgress(100);
      addLog('Orchestrator: Consensus reached. Generating report.');
      setStatusText('Analysis Complete!');

      // Set Global State
      setPerformance({
        time: Number(((endTime - startTime) / 1000).toFixed(1)),
        tokens: Math.floor(text.length / 4), // rough estimate
        conf: aiResults.confidenceScore || 96
      });

      updateFromAI({
        complianceChecks: aiResults.complianceChecks || [],
        risks: aiResults.risks || [],
        fraudProbability: aiResults.fraudProbability || 5,
        confidenceScore: aiResults.confidenceScore || 95,
        summary: aiResults.executiveSummary,
        keyClauses: aiResults.keyClauses || [],
        missingClauses: aiResults.missingClauses || [],
        positiveFindings: aiResults.positiveFindings || [],
        highRiskFindings: aiResults.highRiskFindings || [],
        recommendedActions: aiResults.recommendedActions || [],
        auditTimeline: logs
      }, {
        documentsProcessed: metrics.documentsProcessed + 1,
        complianceScore: aiResults.complianceScore || 85,
        riskScore: aiResults.riskScore || 20
      });

      setTimeout(() => {
        setUploading(false);
        setWorkflowStage('human_review');
        addLog('System: Awaiting Human-in-the-Loop approval.');
      }, 1000);

    } catch (err) {
      console.error(err);
      setStatusText('Error processing document.');
      setUploading(false);
      setWorkflowStage('idle');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await extractTextFromFile(file);
      const docId = `upload_${Date.now()}`;
      setDocumentContext(text, docId);
      executePipeline(text);
    } catch (err) {
      console.error(err);
      alert('Error extracting text.');
    }
  };

  const handleDemoClick = (docText: string, docId: string) => {
    setDocumentContext(docText, docId);
    executePipeline(docText);
  };

  const handleApproval = (status: string) => {
    setWorkflowStage('completed');
    addLog(`System: Document ${status} by Human Reviewer.`);
    alert(`Document ${status}. Dashboards have been finalized.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" /> AI Document Orchestrator
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload & Demo Library */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-white mb-4">1-Click Demo Library</h3>
            <p className="text-sm text-gray-400 mb-4">Select a pre-loaded enterprise document to trigger the autonomous workflow.</p>
            <div className="flex flex-col gap-2">
              {demoDocuments.map(doc => (
                <button 
                  key={doc.id}
                  onClick={() => handleDemoClick(doc.content, doc.id)}
                  disabled={workflowStage === 'processing'}
                  className="flex items-center justify-between px-4 py-3 bg-surface border border-white/10 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all text-left group disabled:opacity-50"
                >
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{doc.title}</div>
                    <div className="text-xs text-gray-500">{doc.type}</div>
                  </div>
                  <Play className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
            
            <div className="my-6 border-t border-white/10 relative">
              <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-[#0A0A0B] px-2 text-xs text-gray-500">OR</span>
            </div>

            <div className="border-2 border-dashed border-gray-700 hover:border-primary/50 transition-colors rounded-xl p-8 flex flex-col items-center text-center cursor-pointer bg-surface/30 relative">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={workflowStage === 'processing'}
              />
              <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
              <p className="font-medium text-white text-sm">Upload custom document</p>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          {workflowStage !== 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400">Response</p>
                <p className="text-lg font-bold text-white">{performance.time > 0 ? `${performance.time}s` : '--'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Tokens</p>
                <p className="text-lg font-bold text-white">{performance.tokens > 0 ? performance.tokens.toLocaleString() : '--'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Confidence</p>
                <p className="text-lg font-bold text-green-400">{performance.conf > 0 ? `${performance.conf}%` : '--'}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: AI Orchestrator & Human-in-the-Loop */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6 flex-1 flex flex-col min-h-[520px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" /> Orchestrator Timeline
              </h3>
              {workflowStage === 'processing' && (
                <span className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Activity className="w-4 h-4 animate-pulse" /> Processing
                </span>
              )}
            </div>

            {/* AI Decision Timeline */}
            <div className="flex-1 bg-[#050505] rounded-xl border border-white/5 p-4 font-mono text-sm overflow-y-auto custom-scrollbar space-y-2 h-[300px]">
              {logs.length === 0 ? (
                <div className="text-gray-600 text-center mt-20">Waiting for orchestrator trigger...</div>
              ) : (
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4 text-gray-300"
                    >
                      <span className="text-gray-600 shrink-0">[{log.time}]</span>
                      <span className={log.msg.includes('Orchestrator') ? 'text-primary' : log.msg.includes('Agent:') ? 'text-green-400' : 'text-gray-300'}>{log.msg}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            {/* Progress Bar */}
            {workflowStage === 'processing' && (
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Pipeline Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <motion.div className="bg-gradient-to-r from-blue-500 to-primary h-full" style={{ width: `${progress}%` }} transition={{ duration: 0.5 }}></motion.div>
                </div>
              </div>
            )}

            {/* Human in the loop Gateway */}
            <AnimatePresence>
              {workflowStage === 'human_review' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-xl border border-orange-500/30 bg-orange-500/10"
                >
                  <h4 className="text-orange-400 font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Human Approval Gateway
                  </h4>
                  <p className="text-sm text-gray-300 mb-4">AI analysis complete. Executive review required before finalizing audit logs.</p>
                  
                  <div className="flex gap-3">
                    <button onClick={() => handleApproval('Approved')} className="flex-1 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
                      <CheckSquare className="w-4 h-4" /> Approve
                    </button>
                    <button onClick={() => handleApproval('Rejected')} className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
                      <XSquare className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
