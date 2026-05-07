from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from ddgs import DDGS
import json
import os
import traceback

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    content: str
    base_url: str = "https://api.groq.com/openai/v1"
    # Use a valid Groq model name 
    model_name: str = "llama3-8b-8192"

# Removed async to prevent event loop connection errors with synchronous OpenAI client
@app.post("/api/analyze")
def analyze_content(req: AnalyzeRequest):
    if not req.content.strip():
        raise HTTPException(status_code=400, detail="Please enter some text to analyze.")
        
    api_key = os.environ.get("GROQ_API_KEY", "ollama")
    client = OpenAI(base_url=req.base_url, api_key=api_key)
    
    # Try searching DDG, but fail gracefully without killing the API
    search_query = req.content[:150].replace('\n', ' ')
    search_results = []
    
    try:
        with DDGS() as ddgs:
            for result in ddgs.text(search_query, max_results=5):
                search_results.append(result)
    except Exception as e:
        print(f"Search warning: {e}")
        
    formatted_search_context = ""
    for i, res in enumerate(search_results):
        formatted_search_context += f"Source {i+1} Title: {res.get('title')}\n"
        formatted_search_context += f"Source {i+1} Link: {res.get('href')}\n"
        formatted_search_context += f"Source {i+1} Snippet: {res.get('body')}\n\n"

    prompt = f'''
    You are a highly capable live fact-checking system.
    
    Your job is to read the Provided News Content and compare it against the LIVE Web Search Results below.

    Provide a detailed breakdown including a score (0-100), 
    a verdict, specific red flags found, and an analysis.
    
    You must respond in valid JSON format with exactly these fields:
    - "score" (number 0-100)
    - "verdict" (string: exactly one of "True", "Mostly True", "Mixed", "Mostly Fake", "Fake", "UNVERIFIED")
    - "reasoning" (string: Detailed markdown reasoning)
    - "redFlags" (array of strings)
    - "bias" (string)
    - "confidence" (number 0.0 to 1.0)

    Content to analyze:
    "{req.content}"
    
    Web Search Results Context (LIVE DATA FROM TODAY):
    {formatted_search_context if search_results else "No relevant search results found."}
    '''
    
    try:
        response = client.chat.completions.create(
            # Coerce the model name to a valid Groq model if the user sends an invalid one
            model="llama-3.3-70b-versatile" if req.base_url and "groq" in req.base_url else req.model_name,
            messages=[
                {"role": "system", "content": "You are an expert fact-checking AI. Always output valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        result_text = response.choices[0].message.content
        result = json.loads(result_text)
        
        vmap = {
            "True": "VERIFIED",
            "Mostly True": "VERIFIED",
            "Mixed": "MISLEADING",
            "Mostly Fake": "FALSE",
            "Fake": "FALSE",
            "UNVERIFIED": "UNVERIFIED"
        }
        result["verdict"] = vmap.get(result.get("verdict", "UNVERIFIED"), result.get("verdict", "UNVERIFIED"))
        result["sources"] = search_results
        
        return result
    except Exception as e:
        error_msg = f"{type(e).__name__}: {str(e)}"
        raise HTTPException(status_code=500, detail=error_msg)
