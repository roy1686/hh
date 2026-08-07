# DocuGuard AI / Veritas AI

## One-line Product Definition
An autonomous, multi-agent Enterprise Operating System for continuous legal, compliance, and risk auditing at scale.

## Problem
Compliance teams manually review thousands of pages of vendor agreements, NDAs, and healthcare forms. This process is slow, error-prone, and scales poorly, while existing AI solutions act as unverifiable black boxes that hallucinate legal advice.

## Track C
This project strictly adheres to Track C (AI Agent Challenge). We built a multi-agent swarm architecture emphasizing Grounding & Verifiability. Every AI decision can be traced back to exact document clauses, and consequential actions require a Human-in-the-Loop gateway.

## Why This Matters
Legal and compliance errors cost Fortune 500 companies billions annually. Automating this with highly-verifiable, deterministic AI agents drastically reduces operational friction while eliminating catastrophic oversight.

## Solution
An ultra-premium, cinematic AI dashboard where users drop unstructured documents and watch a live orchestrator dispatch specialized AI agents (OCR, Compliance, Risk, Fraud) to extract, analyze, and score the document against enterprise policies.

## Why Multi-Agent
Single-prompt LLMs fail at complex, multi-step compliance audits due to context exhaustion and conflicting instructions. By utilizing a Multi-Agent architecture, we separate concerns:
1. Classification Agent identifies the ruleset.
2. Compliance Agent runs strict boolean checks.
3. Risk Agent predicts business liability.
4. Orchestrator synthesizes consensus.

## Key Features
- **Cinematic UI/UX:** Dark Green/Gold glassmorphism aesthetic.
- **Autonomous Orchestrator:** Visual pipeline of AI agent activity.
- **Explainable AI Dashboards:** Risk and Compliance scores backed by evidence.
- **Human Approval Gateway:** System halts until a human reviews the AI audit.
- **AI Copilot:** Conversational interface strictly grounded in document context.

## Architecture
(See `Architecture.md` for deep dive)
React (Vite) Frontend -> Orchestrator Engine -> Google Gemini 1.5 Flash -> Global Context State

## Agent Architecture
- **DocuGuard Compliance Auditor:** Specialized prompt chaining to extract structured JSON findings from raw text.
- **Copilot Grounding Skill:** Forces Gemini to refuse answering if evidence is missing from the document.

## Document Processing Pipeline
`Unstructured Document` -> `Text Extraction` -> `Agent Distribution` -> `Reasoning` -> `Structured Audit JSON`

## Grounding & Citation System
The AI is strictly prompted to only cite text that exists in the document. Bounding boxes/quotes are used to map AI risks directly to specific clauses.

## Human-in-the-Loop
After the AI finishes the audit, the pipeline enters a `human_review` state. The document is locked until an executive clicks "Approve" or "Reject".

## Demo Flow
1. Open the app (view the 5-second cinematic initialization).
2. Click "Launch Console".
3. Navigate to "Document Center".
4. Select a document from the "1-Click Demo Library" (or upload a custom PDF/TXT).
5. Watch the Orchestrator Timeline execute the multi-agent swarm.
6. Review the Explainable AI Dashboards (Compliance, Risk).
7. Approve the audit via the Human-in-the-Loop gateway.

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- AI Provider: Google Generative Language API (Gemini 1.5 Flash).
- Deployment: Vercel.

## Project Structure
- `/src/pages/`: UI Dashboards
- `/src/gemini.ts`: Core AI integrations and Prompts
- `/src/store/`: Global state management
- `AGENTS.md` / `SPEC.md`: Technical documentation

## Local Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env.local` file with your `VITE_GEMINI_API_KEY`.
4. Run `npm run dev`.

## Environment Variables
`VITE_GEMINI_API_KEY` = Your Google Gemini API Key

## Running Frontend
`npm run dev`

## Running Backend
The architecture is serverless/client-side for the hackathon demo to ensure immediate 1-click testability by judges without needing docker/database setups. The Gemini API is called directly.

## Running Tests
`npm run build` (Ensures strict TypeScript compilation passes)

## Playwright
Configured in `playwright.config.ts`.

## CI/CD
We utilize Vercel's automated GitHub deployments. Every push to the `main` branch triggers a Vite build. If the TypeScript compilation fails, the deployment is blocked.

## Security
API keys are handled exclusively through Vercel Environment Variables in production. No secrets are committed to the repository.

## Known Limitations
- OCR extraction for complex scanned PDFs is simulated/simplified in the frontend.
- Vector database embedding is bypassed in favor of large-context window injection for the hackathon demo speed.

## Future Improvements
- AWS Textract integration for enterprise OCR.
- Pinecone integration for cross-document RAG.

## Hackathon Demo Instructions
Navigate to the deployed Vercel URL. Do not use the "Doc Intelligence" page as it was deprecated in favor of the unified Document Center. Follow the **Demo Flow** outlined above for the optimal judging experience.
