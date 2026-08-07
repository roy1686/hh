import pytest
from app.agents.orchestrator import Orchestrator
from unittest.mock import AsyncMock

@pytest.mark.asyncio
async def test_orchestrator_mock(mocker):
    orchestrator = Orchestrator()
    # Mock model by not setting API key
    for agent in [orchestrator.retrieval, orchestrator.reasoning, orchestrator.validation, orchestrator.compliance, orchestrator.risk, orchestrator.meeting]:
        agent.model = None
    
    # Fully mock the retrieval agent's execute to prevent live API embedding calls
    mock_retrieval_res = type("Obj", (object,), {"data": {"context": "mocked context"}, "dict": lambda: {}})
    mocker.patch.object(orchestrator.retrieval, "execute", new_callable=AsyncMock, return_value=mock_retrieval_res)
    
    # Mock the other agents to prevent live LLM calls
    mock_reasoning_res = type("Obj", (object,), {"data": {"draft_answer": "mocked answer"}, "dict": lambda: {}})
    mocker.patch.object(orchestrator.reasoning, "execute", new_callable=AsyncMock, return_value=mock_reasoning_res)
    
    mock_validation_res = type("Obj", (object,), {"data": {"verified_answer": "mocked final"}, "citations": [], "confidence_score": 99, "dict": lambda: {}})
    mocker.patch.object(orchestrator.validation, "execute", new_callable=AsyncMock, return_value=mock_validation_res)
    
    mock_compliance_res = type("Obj", (object,), {"dict": lambda: {}})
    mocker.patch.object(orchestrator.compliance, "execute", new_callable=AsyncMock, return_value=mock_compliance_res)
    
    result = await orchestrator.process_query("What is the termination notice?", context_doc="mock_doc_id")
    
    assert "final_answer" in result
    assert "trace" in result
    assert len(result["trace"]) >= 4 # Retrieval, Reasoning, Validation, Compliance
