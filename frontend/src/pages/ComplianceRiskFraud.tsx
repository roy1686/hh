import { Shield, AlertTriangle, CheckCircle, XCircle, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export function ComplianceRiskFraud({ view }: { view: 'compliance' | 'risk' | 'fraud' }) {
  const { complianceChecks, risks, metrics, aiInsights } = useAppContext();
  
  const hasData = complianceChecks.length > 0 || risks.length > 0 || aiInsights?.summary;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 glass-panel">
        <Shield className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg">No analysis data available.</p>
        <p className="text-sm">Run a document through the AI Orchestrator to populate these dashboards.</p>
      </div>
    );
  }

  if (view === 'compliance') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-400" /> Compliance Audit
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-400">Overall Score</p>
            <p className="text-3xl font-bold text-green-400">{metrics.complianceScore}/100</p>
          </div>
        </div>

        {/* Explainable AI Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-panel p-6 border border-green-500/20">
            <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Positive Findings</h3>
            <ul className="space-y-2">
              {aiInsights?.positiveFindings?.map((item: string, i: number) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-6 border border-orange-500/20">
            <h3 className="text-orange-400 font-semibold mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Missing or Incomplete</h3>
            <ul className="space-y-2">
              {aiInsights?.missingClauses?.map((item: string, i: number) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">⚠</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4">Detailed Rule Checks</h3>
        <div className="grid gap-4">
          <AnimatePresence>
            {complianceChecks.map((check: any, i: number) => (
              <motion.div 
                key={check.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel p-6 border-l-4 ${check.status === 'Passed' ? 'border-l-green-500' : check.status === 'Warning' ? 'border-l-orange-500' : 'border-l-red-500'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{check.rule}</h3>
                    <p className="text-gray-400 text-sm">{check.details}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${check.status === 'Passed' ? 'bg-green-500/20 text-green-400' : check.status === 'Warning' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>
                    {check.status === 'Passed' && <CheckCircle className="w-4 h-4" />}
                    {check.status === 'Warning' && <AlertCircle className="w-4 h-4" />}
                    {check.status === 'Failed' && <XCircle className="w-4 h-4" />}
                    {check.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (view === 'risk') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" /> Risk Analysis
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-400">Risk Severity Score</p>
            <p className="text-3xl font-bold text-red-400">{metrics.riskScore}/100</p>
          </div>
        </div>

        {/* Explainable AI Section */}
        {aiInsights?.highRiskFindings?.length > 0 && (
          <div className="glass-panel p-6 border border-red-500/20 mb-8 bg-red-500/5">
            <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Critical Business Risks Identified</h3>
            <ul className="space-y-2">
              {aiInsights.highRiskFindings.map((item: string, i: number) => (
                <li key={i} className="text-sm text-red-200 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">⚠</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <h3 className="text-xl font-bold text-white mb-4">Specific Risk Vectors</h3>
        <div className="grid gap-4">
          <AnimatePresence>
            {risks.map((risk: any, i: number) => (
              <motion.div 
                key={risk.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-surface text-gray-300 rounded text-xs border border-white/10 uppercase tracking-wider">{risk.type}</span>
                      <span className="text-sm text-gray-500">Location: {risk.location}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{risk.description}</h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${risk.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : risk.severity === 'Medium' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                    {risk.severity} Risk
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Fraud view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-orange-400" /> Fraud Detection
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-8 text-center flex flex-col items-center justify-center">
          <p className="text-gray-400 mb-2">Calculated Fraud Probability</p>
          <div className="text-6xl font-bold mb-4">
            <span className={aiInsights?.fraudProbability > 30 ? 'text-red-500' : 'text-green-500'}>
              {aiInsights?.fraudProbability || 5}%
            </span>
          </div>
          <p className="text-sm text-gray-500 max-w-xs">Probability based on metadata inconsistencies, forged signature detection, and linguistic anomalies.</p>
        </div>
        
        <div className="space-y-4">
          <div className="glass-panel p-6">
            <h3 className="text-white font-semibold mb-2">Recommended Actions</h3>
            <ul className="space-y-3">
              {aiInsights?.recommendedActions?.map((action: string, i: number) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2 bg-surface p-3 rounded-lg border border-white/5">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
