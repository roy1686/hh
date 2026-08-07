from typing import Dict, Any
from app.agents.retrieval import KnowledgeRetrievalAgent
from app.agents.reasoning import ReasoningAgent
from app.agents.validation import CitationValidationAgent
from app.agents.compliance import ComplianceAuditAgent
from app.agents.risk import RiskIntelligenceAgent
from app.agents.meeting import MeetingIntelligenceAgent

class Orchestrator:
    def __init__(self):
        self.retrieval = KnowledgeRetrievalAgent()
        self.reasoning = ReasoningAgent()
        self.validation = CitationValidationAgent()
        self.compliance = ComplianceAuditAgent()
        self.risk = RiskIntelligenceAgent()
        self.meeting = MeetingIntelligenceAgent()

    async def process_query(self, query: str, context_doc: str = None) -> Dict[str, Any]:
        """Runs the multi-agent pipeline."""
        state = {"query": query, "context_doc": context_doc}
        trace = []

        # Step 1: Retrieval
        retrieval_res = await self.retrieval.execute(state)
        state["context"] = retrieval_res.data.get("context", "")
        trace.append({"agent": self.retrieval.name, "status": "completed", "result": retrieval_res.dict()})

        # Step 2: Reasoning
        reasoning_res = await self.reasoning.execute(state)
        state["draft_answer"] = reasoning_res.data.get("draft_answer", "")
        trace.append({"agent": self.reasoning.name, "status": "completed", "result": reasoning_res.dict()})

        # Step 3: Citation Validation
        validation_res = await self.validation.execute(state)
        state["final_answer"] = validation_res.data.get("verified_answer", "")
        trace.append({"agent": self.validation.name, "status": "completed", "result": validation_res.dict()})
        
        # We can run Risk and Compliance in parallel in a real app
        compliance_res = await self.compliance.execute(state)
        trace.append({"agent": self.compliance.name, "status": "completed", "result": compliance_res.dict()})

        return {
            "final_answer": state["final_answer"],
            "trace": trace,
            "citations": validation_res.citations,
            "confidence": validation_res.confidence_score
        }
