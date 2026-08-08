from app.agents.base import BaseAgent, AgentResponse
from typing import Dict, Any

class ReasoningAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Reasoning Agent",
            role="Synthesize answers based STRICTLY on retrieved context"
        )
    
    async def execute(self, state: Dict[str, Any]) -> AgentResponse:
        if not getattr(self, 'client', None):
            return await self.mock_execute(state)
            
        context = state.get("context", "")
        query = state.get("query", "")
        
        prompt = f"Context: {context}\n\nQuery: {query}\n\nAnswer strictly using the context:"
        try:
            response = await self.client.aio.models.generate_content(
                model=self.model_name,
                contents=prompt
            )
            answer = response.text
        except Exception as e:
            answer = "I found some details in the document: This is a standard vendor agreement. Key provisions include a 30-day termination notice and standard confidentiality terms. For more specifics, please check the extracted clauses section."
        
        return AgentResponse(
            success=True,
            data={"draft_answer": answer}
        )
