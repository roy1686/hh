from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from app.agents.orchestrator import Orchestrator
from app.services.pdf_service import PDFService
from app.services.vector_store import VectorStore
import uuid

router = APIRouter()
orchestrator = Orchestrator()
vector_store = VectorStore()
pdf_service = PDFService()

class QueryRequest(BaseModel):
    query: str
    context_doc: str = None

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    contents = await file.read()
    pages = pdf_service.extract_text(contents, file.filename)
    chunks = pdf_service.chunk_text(pages)
    
    doc_id = str(uuid.uuid4())
    vector_store.add_documents(chunks, doc_id)
    
    return {"status": "success", "document_id": doc_id, "chunks_processed": len(chunks)}

@router.post("/query")
async def process_query(req: QueryRequest):
    result = await orchestrator.process_query(req.query, req.context_doc)
    return result

@router.get("/")
def read_root():
    return {"message": "Welcome to Veritas AI Multi-Agent API"}
    return {"message": "Welcome to Veritas AI Multi-Agent API"}
