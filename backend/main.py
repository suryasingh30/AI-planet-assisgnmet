import os
import tempfile
import sqlite3
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from transformers import pipeline

# Load environment variables
load_dotenv()

# Hugging Face Token
HF_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")
if not HF_TOKEN:
    raise ValueError("HUGGINGFACE_API_TOKEN environment variable is missing.")

# Initialize Hugging Face Question Answering pipeline
try:
    qa_pipeline = pipeline(
        "question-answering",
        model="distilbert-base-uncased-distilled-squad",
        use_auth_token=HF_TOKEN
    )
except Exception as e:
    raise ValueError(f"Failed to initialize Hugging Face pipeline: {e}")

# SQLite Database setup
DB_NAME = "documents.db"
if not os.path.exists(DB_NAME):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE documents (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        filename TEXT,
                        upload_date TEXT,
                        content TEXT)''')
    conn.commit()
    conn.close()

# FastAPI app initialization
app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint for uploading PDF
@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    temp_file_path = None
    try:
        # Save the uploaded file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, mode="wb") as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        # Extract content from the PDF
        loader = PyPDFLoader(temp_file_path)
        documents = loader.load()

        if not documents:
            raise HTTPException(status_code=400, detail="The uploaded PDF does not contain readable text.")

        # Combine document content and store in the database
        content = " ".join([doc.page_content for doc in documents])
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO documents (filename, upload_date, content) VALUES (?, ?, ?)",
            (file.filename, datetime.now().strftime("%Y-%m-%d %H:%M:%S"), content),
        )
        conn.commit()
        conn.close()

        return {"message": "PDF uploaded and processed successfully."}

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
    finally:
        # Clean up temporary file
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)

# Endpoint for querying documents
@app.get("/query/")
async def query_document(query: str):
    try:
        # Fetch the latest document content from the database
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("SELECT content FROM documents ORDER BY id DESC LIMIT 1")
        document_content = cursor.fetchone()
        conn.close()

        if not document_content:
            raise HTTPException(status_code=404, detail="No documents found. Please upload a PDF first.")

        # Use Hugging Face QA model to answer the query
        context = document_content[0]
        answer = qa_pipeline(question=query, context=context)
        return {"answer": answer["answer"], "confidence": answer.get("score")}

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the PDF Question-Answering API"}
