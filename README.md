To include a new folder for testing with the structure you described, we can update the documentation to reflect the changes. Below is the modified README content, including details about the testing folder and its purpose.

---

# PDF Question-Answering Application

## Overview

This project is a web application that enables users to upload PDF files, extract their text content, and query the extracted text using a question-answering model powered by Hugging Face's Transformers library. The backend is implemented in Python using FastAPI, and the frontend is built with React.

---

## Features

- Upload PDFs to extract readable content.
- Save and store the extracted content in a SQLite database.
- Query the content using a question-answering model.
- Interactive frontend for asking questions and displaying results.
- Predefined testing with sample PDF files and expected outputs.

---

## Application Architecture

### Frontend

- **Framework**: React
- **Libraries**: Axios for API calls, custom components for chat UI

### Backend

- **Framework**: FastAPI
- **Database**: SQLite
- **Machine Learning**: Hugging Face Transformers for QA model
- **Middleware**: CORS middleware for cross-origin support

---

## Tech Stack

### Frontend

- React
- Axios

### Backend

- FastAPI
- SQLite
- Hugging Face Transformers
- Python Libraries: `os`, `tempfile`, `sqlite3`, `datetime`, `dotenv`

---

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js and npm

### Backend Setup

1. Clone the repository.
   ```bash
   git clone https://github.com/suryasingh30/AI-planet-assisgnmet
   cd backend
   ```
2. Install Python dependencies.
   ```bash
   pip install -r requirements.txt
   ```
3. Set up the environment variables by creating a `.env` file with the following content:
   ```
   HUGGINGFACE_API_TOKEN=<Your Hugging Face API Token>
   ```
4. Run the FastAPI server.
   ```bash
   uvicorn main:app --reload
   ```
   The server will run at `http://127.0.0.1:8000`.

### Frontend Setup

1. Navigate to the `frontend` folder.
   ```bash
   cd frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the React development server.
   ```bash
   npm run dev
   ```
   The application will run at `http://localhost:3000`.

---

## Testing

### Testing Folder Structure

```
project/
├── testing/
│   ├── input-pdfs/
│   │   └── sample.pdf           # PDF to be uploaded for testing
│   ├── queries-and-answers/
│   │   ├── queries.txt          # Questions to ask and answers
```

### How to Test

1. Place the PDF files you want to test in the `input-pdfs` folder.
2. Define the questions to ask in `queries-and-answers/queries.txt`.
3. Add the expected answers for validation in `queries-and-answers/expected-answers.txt`.
4. Start the backend and frontend servers.
5. Upload a PDF from the `input-pdfs` folder using the frontend or API.
6. Query the PDF content with questions from `queries-and-answers/queries.txt`.

---

## API Documentation

### Endpoints

#### **1. Upload PDF**

- **Endpoint**: `/upload-pdf/`
- **Method**: POST
- **Description**: Upload a PDF file and extract its content.
- **Request**:
  - File: PDF file
- **Response**:
  ```json
  {
    "message": "PDF uploaded and processed successfully."
  }
  ```

#### **2. Query Document**

- **Endpoint**: `/query/`
- **Method**: GET
- **Description**: Query the latest uploaded document content.
- **Request Parameters**:
  - `query`: The question to ask.
- **Response**:
  ```json
  {
    "answer": "<Answer to the query>",
    "confidence": <Confidence score>
  }
  ```

#### **3. Root**

- **Endpoint**: `/`
- **Method**: GET
- **Description**: Basic health check endpoint.
- **Response**:
  ```json
  {
    "message": "Welcome to the PDF Question-Answering API"
  }
  ```

---

## Folder Structure

```
AI planet assisgnmet/
├── backend/
│   ├── main.py          # FastAPI application
│   ├── requirements.txt # Backend dependencies
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── components/  # Reusable components
│   │   └── index.js     # Entry point
│   ├── package.json     # Frontend dependencies
│   └── .env             # Frontend environment variables (if required)
├── testing/
│   ├── input-pdfs/
│   │   └── sample.pdf
│   ├── queries-and-answers/
│   │   ├── queries.txt
```

---

## Future Improvements

- Add support for multiple file uploads.
- Enhance error handling and edge case management.
- Implement user authentication for better security.
- Improve the UI for a more intuitive experience.

---

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for their Transformers library.
- [FastAPI](https://fastapi.tiangolo.com/) for its easy-to-use backend framework.
- The open-source community for inspiration and guidance.

---

## Contact

For questions or contributions, feel free to reach out to Suryanarayan Singh at 3suryasingh@gmail.com.
