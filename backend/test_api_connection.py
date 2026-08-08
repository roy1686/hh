import asyncio
from google import genai
from app.core.config import get_settings

def test():
    try:
        settings = get_settings()
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        print('Client created. Calling embed_content...')
        result = client.models.embed_content(model='text-embedding-004', contents='Say hi')
        print("Success:", dir(result))
        print("Embeddings array:", result.embeddings[0].values[:5])
    except Exception as e:
        print("Error:", repr(e))

if __name__ == "__main__":
    test()
