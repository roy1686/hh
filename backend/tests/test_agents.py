import pytest
from app.agents.orchestrator import Orchestrator

@pytest.mark.asyncio
async def test_orchestrator_mock():
    orchestrator = Orchestrator()
    # Mock model by not setting API key
    for agent in [orchestrator.retrieval, orchestrator.reasoning, orchestrator.validation, orchestrator.compliance, orchestrator.risk, orchestrator.meeting]:
        agent.model = None
    
    result = await orchestrator.process_query("What is the termination notice?", context_doc="mock_doc_id")
    
    assert "final_answer" in result
    assert "trace" in result
    assert len(result["trace"]) >= 4 # Retrieval, Reasoning, Validation, Compliance
    assert result["trace"][0]["agent"] == "Knowledge Retrieval Agent"
