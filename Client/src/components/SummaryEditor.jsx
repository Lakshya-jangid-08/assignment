import React from "react";

const SummaryEditor = ({ summary, setSummary, isEditing }) => (
  <div>
    <label className="block font-semibold mb-1">Generated Summary (Editable)</label>
    <textarea
      className="w-full border rounded p-2"
      rows={6}
      value={summary}
      onChange={e => setSummary(e.target.value)}
      disabled={!isEditing}
    />
  </div>
);

export default SummaryEditor;
