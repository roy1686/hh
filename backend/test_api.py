import asyncio
from app.api.endpoints import process_query, QueryRequest

async def main():
    try:
        res = await process_query(QueryRequest(query='hi', context_doc='hello'))
        print(res)
    except Exception as e:
        print(e)

if __name__ == "__main__":
    asyncio.run(main())
