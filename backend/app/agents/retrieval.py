from app.agents.base import BaseAgent, AgentResponse
from app.services.vector_store import VectorStore
from typing import Dict, Any

class KnowledgeRetrievalAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Knowledge Retrieval Agent",
            role="Parse documents and retrieve context using semantic search"
        )
        self.vector_store = VectorStore()
    
    async def execute(self, state: Dict[str, Any]) -> AgentResponse:
        query = state.get("query", "")
        if not query:
            return await self.mock_execute(state)
        
        # Query ChromaDB
        results = self.vector_store.search(query, n_results=3)
        
        if not results:
            context = "No relevant context found in documents."
            citations = []
        else:
            context_parts = []
            citations = []
            for res in results:
                context_parts.append(res['text'])
                citations.append({
                    "source": res['metadata'].get("document_id", "Unknown"),
                    "page": res['metadata'].get("page", 1),
                    "text": res['text'][:100] + "..."
                })
            context = "\n\n".join(context_parts)
        
        return AgentResponse(
            success=True,
            data={"context": context},
            confidence_score=0.95,
            citations=citations
        )
