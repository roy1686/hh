# Veritas AI: Agents & Skills Mapping

## Core AI Skills

The AI agents utilize several specialized, reusable skills to accomplish their tasks.

### 1. PDF Parsing Skill
- **Used by**: Knowledge Retrieval Agent
- **Description**: Extracts raw text, tables, and metadata from PDF files using PyMuPDF.

### 2. Semantic Search Skill
- **Used by**: Knowledge Retrieval Agent
- **Description**: Converts text chunks into embeddings and performs cosine similarity search using ChromaDB.

### 3. Citation Generation Skill
- **Used by**: Citation Validation Agent
- **Description**: Maps claims back to specific document chunks and extracts exact quote strings and page numbers.

### 4. Hallucination Detection Skill
- **Used by**: Citation Validation Agent
- **Description**: Cross-references generated text against source context. If a semantic match cannot be found, the claim is flagged or removed.

### 5. Compliance Rule Matching Skill
- **Used by**: Compliance Audit Agent
- **Description**: Evaluates document content against a configurable JSON schema of compliance rules.

### 6. Risk Classification Skill
- **Used by**: Risk Intelligence Agent
- **Description**: Categorizes extracted clauses into risk levels (Low, Medium, High) based on predefined risk vectors.

### 7. Action Item Extraction Skill
- **Used by**: Meeting Intelligence Agent
- **Description**: Uses NLP to identify tasks, assignees, and temporal expressions (deadlines).

### 8. Report Generation Skill
- **Used by**: All Agents (Orchestrator)
- **Description**: Compiles intermediate agent outputs into a cohesive, structured JSON report.

### 9. Confidence Scoring Skill
- **Used by**: Citation Validation Agent
- **Description**: Calculates a confidence score (0-100%) based on the strength of the citations and evidence provided.
