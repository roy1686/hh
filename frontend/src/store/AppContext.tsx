import { createContext, useContext, useState, type ReactNode } from 'react';

type AnalysisResult = {
  complianceChecks: any[];
  risks: any[];
  fraudProbability: number;
  confidenceScore: number;
  summary: string;
  keyClauses: string[];
  missingClauses: string[];
  positiveFindings: string[];
  highRiskFindings: string[];
  recommendedActions: string[];
  auditTimeline: { time: string; msg: string }[];
};

type AppState = {
  documentContext: string;
  currentDocumentId: string | null;
  metrics: {
    documentsProcessed: number;
    complianceScore: number;
    riskScore: number;
    activeAgents: number;
  };
  currentAnalysis: AnalysisResult | null;
  setDocumentContext: (text: string, documentId: string) => void;
  updateFromAI: (data: Partial<AnalysisResult>, globalMetrics?: Partial<AppState['metrics']>) => void;
  clearAnalysis: () => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [documentContext, setDocumentContextState] = useState<string>('');
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  
  // Global aggregate metrics (could be fetched from a real backend DB in the future)
  const [metrics, setMetrics] = useState({
    documentsProcessed: 12453,
    complianceScore: 0,
    riskScore: 0,
    activeAgents: 4
  });

  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);

  const setDocumentContext = (text: string, documentId: string) => {
    // When a new document is selected, CLEAR the old analysis state to prevent bleed-through
    setDocumentContextState(text);
    setCurrentDocumentId(documentId);
    setCurrentAnalysis(null);
  };

  const clearAnalysis = () => {
    setCurrentAnalysis(null);
  };

  const updateFromAI = (data: Partial<AnalysisResult>, globalMetrics?: Partial<AppState['metrics']>) => {
    setCurrentAnalysis(prev => {
      const base: AnalysisResult = prev || {
        complianceChecks: [],
        risks: [],
        fraudProbability: 0,
        confidenceScore: 0,
        summary: "",
        keyClauses: [],
        missingClauses: [],
        positiveFindings: [],
        highRiskFindings: [],
        recommendedActions: [],
        auditTimeline: []
      };
      return { ...base, ...data };
    });

    if (globalMetrics) {
      setMetrics(prev => ({ ...prev, ...globalMetrics }));
    }
  };

  return (
    <AppContext.Provider value={{ documentContext, currentDocumentId, metrics, currentAnalysis, setDocumentContext, updateFromAI, clearAnalysis }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
