from app.agents.base import BaseAgent, AgentResponse
from typing import Dict, Any

class ReasoningAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Reasoning Agent",
            role="Synthesize answers based STRICTLY on retrieved context"
        )
    
    async def execute(self, state: Dict[str, Any]) -> AgentResponse:
        if not self.model:
            return await self.mock_execute(state)
            
        context = state.get("context", "")
        query = state.get("query", "")
        
        prompt = f"Context: {context}\n\nQuery: {query}\n\nAnswer strictly using the context:"
        response = self.model.generate_content(prompt)
        
        return AgentResponse(
            success=True,
            data={"draft_answer": response.text}
        )
