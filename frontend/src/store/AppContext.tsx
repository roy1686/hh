import { createContext, useContext, useState, type ReactNode } from 'react';
import { mockData as initialMockData } from './mockData';

type AppState = {
  documentContext: string;
  metrics: typeof initialMockData.metrics;
  complianceChecks: typeof initialMockData.complianceChecks;
  risks: typeof initialMockData.risks;
  aiInsights: any; // Holds summary, clauses, etc.
  setDocumentContext: (text: string) => void;
  updateFromAI: (data: any) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [documentContext, setDocumentContext] = useState<string>('');
  const [metrics, setMetrics] = useState(initialMockData.metrics);
  const [complianceChecks, setComplianceChecks] = useState(initialMockData.complianceChecks);
  const [risks, setRisks] = useState(initialMockData.risks);
  const [aiInsights, setAiInsights] = useState<any>({});

  const updateFromAI = (data: any) => {
    if (data.metrics) {
      setMetrics(prev => ({ ...prev, ...data.metrics }));
    }
    if (data.complianceChecks) {
      setComplianceChecks(data.complianceChecks);
    }
    if (data.risks) {
      setRisks(data.risks);
    }
    if (data.aiInsights) {
      setAiInsights(data.aiInsights);
    }
  };

  return (
    <AppContext.Provider value={{ documentContext, setDocumentContext, metrics, updateFromAI, complianceChecks, risks, aiInsights }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
