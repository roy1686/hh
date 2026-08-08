import asyncio
from google import genai
import os
from app.core.config import get_settings

settings = get_settings()

async def main():
    try:
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        # Try aio
        try:
            res = await client.aio.models.generate_content(model="gemini-3.5-flash", contents="hi")
            print("aio success")
        except Exception as e:
            print("aio error:", e)
    except Exception as e:
        print("client error:", e)

if __name__ == "__main__":
    asyncio.run(main())
