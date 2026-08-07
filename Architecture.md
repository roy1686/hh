# Veritas AI Architecture

## Overview
Veritas AI is an enterprise-grade Multi-Agent Knowledge & Compliance Intelligence Platform. The architecture is designed to maximize reliability, transparency, and accuracy by separating responsibilities into distinct AI agents.

## System Components

### 1. Frontend (React / Vite)
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS (dark theme, glassmorphism)
- **Animations**: Framer Motion
- **Role**: Provides the enterprise dashboard, interactive agent visualization, and user interfaces.

### 2. Backend (FastAPI)
- **Framework**: FastAPI (Python)
- **Role**: Handles API requests, orchestrates the multi-agent pipeline, and serves Server-Sent Events (SSE) or WebSockets for real-time UI updates.

### 3. Agent Router & Orchestrator
- **Role**: A custom lightweight orchestrator that passes the state (uploaded document context, user query, intermediate outputs) through the pipeline of specialized agents.

### 4. Vector Database & RAG
- **Tooling**: PyMuPDF (parsing), ChromaDB (local vector store).
- **Role**: Ingests documents, creates embeddings, and provides semantic search capabilities to the Knowledge Retrieval Agent.

### 5. LLM Integration
- **Provider**: Google Gemini API (Free version initially).
- **Integration**: LiteLLM or direct SDK to wrap the API and ensure structured JSON outputs for inter-agent communication.

## Agent Workflow
1. **Input**: User uploads PDF and asks a query.
2. **Knowledge Retrieval**: Parses PDF, chunks, stores in ChromaDB, retrieves context.
3. **Reasoning**: Drafts initial response based *only* on context.
4. **Citation Validation**: Verifies claims against context, adds page numbers.
5. **Compliance/Risk/Meeting**: Specialized parallel agents run if applicable.
6. **Output**: Final verified JSON response sent to frontend.
