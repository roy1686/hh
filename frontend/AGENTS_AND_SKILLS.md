# Agents & Skills Catalog

## Core Agent: DocuGuard Compliance Auditor

**Purpose:** To ingest raw document text, classify the document type, and perform a deep regulatory and legal compliance audit.
**Inputs:** Unstructured document text (up to 50,000 characters).
**Outputs:** Structured JSON containing Compliance Score, Risk Score, Fraud Probability, Confidence Score, Executive Summary, Key Clauses, Missing Clauses, Positive Findings, High-Risk Findings, Recommended Actions, Compliance Checks array, and Risks array.
**Tools:** Gemini 1.5 Flash Large Context Model.
**Workflow:**
1. Receives document context from Orchestrator.
2. Identifies document type and implicit ruleset.
3. Evaluates presence/absence of critical clauses (e.g., GDPR, Indemnification).
4. Generates scored findings.
5. Returns structured JSON to the global state.
**Constraints:** Must adhere strictly to the provided text. Must return exactly 4 compliance checks and 3 risks.
**Failure Behavior:** If the LLM times out or returns malformed JSON, the agent gracefully degrades to a secure fallback object and logs the error in the Audit Trail.
**Grounding Behavior:** Bases all risk descriptions on specific text discovered in the document.
**Source Implementation:** `src/gemini.ts` -> `analyzeDocumentWithAI()`

---

## Custom Skill: Compliance Evidence Verification

**Purpose:** To locate supporting evidence within the document to justify AI-generated risks and compliance failures.
**Inputs:** A specific query regarding a risk or clause (e.g., "Where is the liability cap?"), and the full document context.
**Outputs:** A direct quotation from the text, or a refusal if evidence is missing.
**Tools:** Gemini 1.5 Flash with strict context grounding prompt.
**Workflow:**
1. Receives natural language query from User via Copilot.
2. Scans the document context in memory.
3. Extracts the exact sentence/paragraph.
4. Returns the evidence.
**Constraints:** Must never hallucinate clauses.
**Failure Behavior:** Returns "An error occurred while connecting to the AI."
**Grounding Behavior:** Refuses unsupported claims by returning: *"I cannot answer this based on the provided document."*
**Source Implementation:** `src/gemini.ts` -> `processQuery()`
