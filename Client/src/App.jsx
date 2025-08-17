import TranscriptUpload from './components/TranscriptUpload';
import PromptInput from './components/PromptInput';
import SummaryEditor from './components/SummaryEditor';
import EmailShare from './components/EmailShare';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [inputMode, setInputMode] = useState(null); // 'upload' or 'prompt'

  // Only allow one input mode at a time
  const handleModeChange = (mode) => {
    setInputMode(mode);
    setTranscript("");
    setPrompt("");
    setSummary("");
    setIsEditing(false);
  };

  // Handle summary generation using backend API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGenerateSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/summarize`, {
        input: inputMode === "upload" ? transcript : prompt,
        instruction: inputMode === "upload" ? prompt : undefined,
      });
      if (res.data.summary) {
        setSummary(res.data.summary);
        setIsEditing(true);
      } else {
        setError(res.data.error || "Failed to generate summary");
      }
    } catch (err) {
      setError("Server error");
    }
    setLoading(false);
  };

  // Handle sharing via email (placeholder for backend integration)
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const handleShare = async () => {
    setEmailLoading(true);
    setEmailError("");
    setEmailSuccess("");
    if (!email || !summary) {
      setEmailError("Please enter an email and generate a summary first.");
      setEmailLoading(false);
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/send-email`, {
        to: email,
        summary,
      });
      if (res.data.success) {
        setEmailSuccess("Summary sent successfully!");
      } else {
        setEmailError(res.data.error || "Failed to send email");
      }
    } catch (err) {
      setEmailError("Server error");
    }
    setEmailLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">AI Meeting Notes Summarizer</h1>

      {/* Choose input mode */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${inputMode === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => handleModeChange('upload')}
        >
          Upload Transcript
        </button>
        <button
          className={`px-4 py-2 rounded ${inputMode === 'prompt' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => handleModeChange('prompt')}
        >
          Enter Prompt Only
        </button>
      </div>

      {/* Show only one input at a time */}
      {inputMode === 'upload' && (
        <TranscriptUpload transcript={transcript} setTranscript={setTranscript} />
      )}
      {inputMode === 'prompt' && (
        <PromptInput prompt={prompt} setPrompt={setPrompt} />
      )}

      {/* Generate summary button */}

      {inputMode && (
        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            onClick={handleGenerateSummary}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
      )}

      {/* Editable summary */}
      {summary && (
        <SummaryEditor summary={summary} setSummary={setSummary} isEditing={isEditing} />
      )}

      {/* Share via email */}
      {summary && (
        <div>
          <EmailShare email={email} setEmail={setEmail} handleShare={handleShare} />
          {emailLoading && <div className="text-blue-600 mt-2">Sending...</div>}
          {emailError && <div className="text-red-600 mt-2">{emailError}</div>}
          {emailSuccess && <div className="text-green-600 mt-2">{emailSuccess}</div>}
        </div>
      )}
    </div>
  );
}

export default App;
