from pydantic import BaseModel
from typing import Any, Dict, List, Optional
import google.generativeai as genai
from app.core.config import get_settings

class AgentResponse(BaseModel):
    success: bool
    data: Any
    error: Optional[str] = None
    confidence_score: Optional[float] = None
    citations: Optional[List[Dict[str, Any]]] = None

class BaseAgent:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role
        settings = get_settings()
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-1.5-pro')
        else:
            self.model = None # Mock mode

    async def execute(self, state: Dict[str, Any]) -> AgentResponse:
        """Execute the agent's main logic."""
        raise NotImplementedError("Each agent must implement the execute method.")

    async def mock_execute(self, state: Dict[str, Any]) -> AgentResponse:
        """A mocked execution for testing when API key is not present."""
        return AgentResponse(success=True, data={"message": f"Mock response from {self.name}"})
