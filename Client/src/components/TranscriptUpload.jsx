import React from "react";

const TranscriptUpload = ({ transcript, setTranscript }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTranscript(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <label className="block font-semibold mb-1">Upload Transcript</label>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      {transcript && (
        <div className="mt-2 text-xs text-gray-500">Transcript loaded ({transcript.length} chars)</div>
      )}
    </div>
  );
};

export default TranscriptUpload;
