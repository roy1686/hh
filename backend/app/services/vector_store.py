import chromadb
from chromadb import Documents, EmbeddingFunction, Embeddings
from app.core.config import get_settings
from typing import List, Dict
class CustomGeminiEmbeddingFunction(EmbeddingFunction):
    def __init__(self, api_key: str):
        pass
        
    def __call__(self, input: Documents) -> Embeddings:
        # Return a dummy zero vector of size 768 for the demo since document upload is bypassed
        return [[0.0] * 768 for _ in input]

class VectorStore:
    def __init__(self, persist_directory: str = "./chroma_db"):
        self.client = chromadb.PersistentClient(path=persist_directory)
        self.collection_name = "knowledge_base"
        
        settings = get_settings()
        if settings.GEMINI_API_KEY:
            self.ef = CustomGeminiEmbeddingFunction(api_key=settings.GEMINI_API_KEY)
            self.collection = self.client.get_or_create_collection(name=self.collection_name, embedding_function=self.ef)
        else:
            self.collection = self.client.get_or_create_collection(name=self.collection_name)

    def add_documents(self, documents: List[Dict[str, str]], document_id: str):
        """
        Adds chunks of a document to the vector store.
        documents should be a list of dicts: {"page": int, "text": str}
        """
        ids = []
        texts = []
        metadatas = []
        
        for idx, doc in enumerate(documents):
            ids.append(f"{document_id}_chunk_{idx}")
            texts.append(doc["text"])
            metadatas.append({"document_id": document_id, "page": doc["page"]})
            
        if ids:
            self.collection.add(
                documents=texts,
                metadatas=metadatas,
                ids=ids
            )

    def search(self, query: str, n_results: int = 5) -> List[Dict]:
        """
        Searches for the top n_results most similar to the query.
        """
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )
        
        formatted_results = []
        if results['documents'] and results['documents'][0]:
            for i in range(len(results['documents'][0])):
                formatted_results.append({
                    "text": results['documents'][0][i],
                    "metadata": results['metadatas'][0][i],
                    "distance": results['distances'][0][i] if 'distances' in results and results['distances'] else None
                })
        return formatted_results
