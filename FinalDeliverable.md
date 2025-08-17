# AI Meeting Notes Summarizer – Final Deliverables

## 1. Approach & Process

**Goal:**  
Build a full-stack web application that allows users to upload meeting transcripts or enter prompts, generate AI-powered summaries, edit them, and share via email.

**Process:**
- **Frontend:** Designed a modular React app with clear separation of concerns (upload, prompt, summary, email).
- **Backend:** Built an Express.js API server for two main tasks:
  - AI summary generation using Groq’s Llama-3 model via the `@ai-sdk/groq` and `ai` packages.
  - Email sending using Nodemailer, with secure SMTP credentials via environment variables.
- **Integration:** The frontend communicates with the backend via REST API endpoints for both summary generation and email sending.
- **Security:** Sensitive keys and credentials are managed via `.env` files and never committed to version control.

## 2. Tech Stack

- **Frontend:**  
  - React (with Vite for fast development)
  - Tailwind CSS for styling
  - Fetch API for backend communication

- **Backend:**  
  - Node.js with Express.js
  - @ai-sdk/groq and ai for LLM integration
  - Nodemailer for email delivery
  - dotenv for environment variable management

- **Other:**  
  - Deployed on Vercel
  - SMTP provider: Gmail

## 3. Deployment

**Frontend:**  
[Deployed Frontend Link Here]

**Backend:**  
[Deployed Backend/API Link Here]

---

**Instructions for Reviewers:**
- Use the frontend link to access the app.
- You can upload a `.txt` transcript or enter a prompt.
- Click “Generate Summary” to get an AI summary.
- Edit the summary if needed.
- Enter an email address and click “Share” to send the summary.
