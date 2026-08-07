import fitz  # PyMuPDF
import io
import docx
from typing import List, Dict

class PDFService:
    @staticmethod
    def extract_text(file_bytes: bytes, filename: str = "document.pdf") -> List[Dict[str, str]]:
        """
        Extracts text from a PDF or DOCX file byte stream.
        Returns a list of dictionaries containing page number and text.
        """
        if filename.lower().endswith(".docx"):
            doc = docx.Document(io.BytesIO(file_bytes))
            text = "\n".join([para.text for para in doc.paragraphs])
            return [{"page": 1, "text": text}]
            
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        pages = []
        for i in range(len(doc)):
            page = doc.load_page(i)
            text = page.get_text()
            if text.strip():
                pages.append({
                    "page": i + 1,
                    "text": text
                })
        return pages

    @staticmethod
    def chunk_text(pages: List[Dict[str, str]], chunk_size: int = 1000, overlap: int = 200) -> List[Dict[str, str]]:
        """
        Chunks the text of each page to fit within LLM context windows and improve retrieval.
        """
        chunks = []
        for page in pages:
            text = page["text"]
            words = text.split()
            for i in range(0, len(words), chunk_size - overlap):
                chunk_words = words[i:i + chunk_size]
                if chunk_words:
                    chunks.append({
                        "page": page["page"],
                        "text": " ".join(chunk_words)
                    })
        return chunks
