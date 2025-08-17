import React from "react";

const EmailShare = ({ email, setEmail, handleShare }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold">Share Summary via Email</label>
    <input
      type="email"
      className="border rounded p-2"
      placeholder="Recipient email address"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
    <button
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      onClick={handleShare}
    >
      Share
    </button>
  </div>
);

export default EmailShare;
