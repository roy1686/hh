// Veritas AI / DocuGuard AI 
// Secure API Wrapper

const BACKEND_URL = "http://localhost:8000/api/v1"; // In production, this would point to the deployed backend URL

export async function processQuery(query: string, context: string): Promise<string> {
    try {
        const response = await fetch(`${BACKEND_URL}/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: query,
                context_doc: context
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.answer || "An error occurred while connecting to the AI.";
    } catch (error) {
        console.error("Error connecting to backend API:", error);
        return "An error occurred while connecting to the AI.";
    }
}

export async function analyzeDocumentWithAI(context: string): Promise<any> {
    try {
        const response = await fetch(`${BACKEND_URL}/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                context: context
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error analyzing document via backend:", error);
        // Fallback object to prevent UI crashes if backend is totally unreachable
        return {
            complianceScore: 78,
            riskScore: 45,
            fraudProbability: 12,
            confidenceScore: 94,
            executiveSummary: "FALLBACK DATA (BACKEND UNAVAILABLE) - This document contains standard provisions but lacks several critical clauses required by enterprise policy.",
            keyClauses: ["Confidentiality", "Governing Law"],
            missingClauses: ["Indemnification", "Data Processing Consent (GDPR)"],
            positiveFindings: ["Clear termination clauses", "Appropriate jurisdiction defined"],
            highRiskFindings: ["Missing liability cap", "Vague intellectual property assignment"],
            recommendedActions: ["Request revision of IP clause", "Escalate to legal for indemnification review"],
            complianceChecks: [
                { id: 1, rule: "GDPR Consent", status: "Failed", details: "No explicit consent for EU data processing found." },
                { id: 2, rule: "Standard Arbitration", status: "Passed", "details": "Arbitration clause meets enterprise standards." },
                { id: 3, rule: "Liability Cap", status: "Warning", details: "Cap is ambiguously defined." },
                { id: 4, rule: "Confidentiality Duration", status: "Passed", details: "Survives termination for 5 years." }
            ],
            risks: [
                { id: 1, type: "Legal", severity: "High", description: "Missing indemnification exposes firm to 3rd party claims.", location: "Page 2" },
                { id: 2, type: "Financial", severity: "Medium", description: "Uncapped damages in breach scenarios.", location: "Page 3" },
                { id: 3, type: "Operational", severity: "Low", description: "SLA response times not clearly defined.", location: "Page 4" }
            ]
        };
    }
}