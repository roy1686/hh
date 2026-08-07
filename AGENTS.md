# Veritas AI Agents

This document defines the specialized AI agents that power Veritas AI. Each agent is designed to prevent hallucinations and ensure high compliance.

## 1. Knowledge Retrieval Agent
- **Role**: Ingest and retrieve data.
- **Responsibilities**: Parse documents, chunk text, generate embeddings, and retrieve the most relevant context based on semantic search.
- **Constraint**: Must never fabricate evidence.

## 2. Reasoning Agent
- **Role**: Synthesize answers.
- **Responsibilities**: Receive retrieved context and user query. Generate grounded answers based *strictly* on the provided context.
- **Constraint**: Never answer without evidence.

## 3. Citation Validation Agent
- **Role**: Fact-checker.
- **Responsibilities**: Verify every statement made by the Reasoning Agent. Attach page numbers and highlight exact supporting text. Reject unsupported claims.
- **Constraint**: High strictness; must output structured citation data.

## 4. Compliance Audit Agent
- **Role**: Rule checker.
- **Responsibilities**: Compare uploaded documents against predefined compliance rules. Generate PASS / WARNING / FAIL reports with evidence.

## 5. Risk Intelligence Agent
- **Role**: Risk detector.
- **Responsibilities**: Identify missing clauses, inconsistencies, deadlines, obligations, and potential compliance risks in legal or business documents.

## 6. Meeting Intelligence Agent
- **Role**: Action extractor.
- **Responsibilities**: Extract decisions, action items, owners, and deadlines from meeting transcripts, linking every item back to the source text.
