export const mockData = {
  metrics: {
    documentsProcessed: 12453,
    complianceScore: 94,
    riskScore: 12,
    activeAgents: 14,
    costSavings: "$124,500",
    timeSaved: "3,400 hours"
  },
  agents: [
    { id: 1, name: "Document Intake Agent", status: "idle", confidence: "-", task: "Waiting for upload" },
    { id: 2, name: "OCR & Vision Agent", status: "running", confidence: "99%", task: "Extracting text from MSA_Corp.pdf" },
    { id: 3, name: "Classification Agent", status: "completed", confidence: "98%", task: "Classified as Master Service Agreement" },
    { id: 4, name: "Compliance Auditor", status: "idle", confidence: "-", task: "Pending classification" },
    { id: 5, name: "Legal Clause Checker", status: "idle", confidence: "-", task: "Pending compliance" },
    { id: 6, name: "Risk Analysis Agent", status: "running", confidence: "87%", task: "Analyzing financial liabilities" },
    { id: 7, name: "Fraud Detection Agent", status: "completed", confidence: "99.9%", task: "Metadata verification passed" },
    { id: 8, name: "Report Generator", status: "idle", confidence: "-", task: "Waiting for final risk scores" }
  ],
  recentActivities: [
    { id: 1, action: "Compliance Audit Passed", target: "Vendor_Agreement_Q3.pdf", time: "2 mins ago", type: "success" },
    { id: 2, action: "High Risk Detected", target: "Liability_Waiver.docx", time: "15 mins ago", type: "warning" },
    { id: 3, action: "Fraud Alert: Signature Mismatch", target: "Contract_Signed_V2.pdf", time: "1 hour ago", type: "error" },
    { id: 4, action: "Document Classified", target: "Employee_Handbook.pdf", time: "2 hours ago", type: "info" }
  ],
  complianceChecks: [
    { id: 1, rule: "GDPR Data Processing Agreement", status: "Passed", details: "Standard clauses found on page 4." },
    { id: 2, rule: "HIPAA PHI Protection", status: "Passed", details: "No unencrypted PHI detected." },
    { id: 3, rule: "ISO 27001 ISMS", status: "Warning", details: "Data retention policy is underspecified." },
    { id: 4, rule: "Internal Liability Cap", status: "Failed", details: "Liability cap exceeds $1M threshold." }
  ],
  risks: [
    { id: 1, type: "Financial", severity: "High", description: "Uncapped indemnification clause.", location: "Section 4.2" },
    { id: 2, type: "Operational", severity: "Medium", description: "SLA penalties are above standard 10%.", location: "Section 7.1" },
    { id: 3, type: "Legal", severity: "Low", description: "Governing law in non-standard jurisdiction.", location: "Section 12.0" }
  ],
  fraudIndicators: [
    { id: 1, indicator: "Metadata Creation Date", status: "Verified", confidence: 99 },
    { id: 2, indicator: "Signature Tampering", status: "Flagged", confidence: 85 },
    { id: 3, indicator: "Font Anomaly Detection", status: "Verified", confidence: 97 }
  ],
  documents: [
    { id: 1, name: "MSA_Corp.pdf", type: "PDF", size: "2.4 MB", status: "Processing", date: "2026-08-07" },
    { id: 2, name: "Vendor_Agreement_Q3.pdf", type: "PDF", size: "1.1 MB", status: "Completed", date: "2026-08-07" },
    { id: 3, name: "Liability_Waiver.docx", type: "DOCX", size: "0.5 MB", status: "Flagged", date: "2026-08-06" }
  ],
  analytics: [
    { name: "Mon", processed: 120, flagged: 12 },
    { name: "Tue", processed: 150, flagged: 15 },
    { name: "Wed", processed: 200, flagged: 22 },
    { name: "Thu", processed: 180, flagged: 10 },
    { name: "Fri", processed: 250, flagged: 25 },
    { name: "Sat", processed: 90, flagged: 5 },
    { name: "Sun", processed: 110, flagged: 8 }
  ]
};
