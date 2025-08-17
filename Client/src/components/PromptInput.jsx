import React from "react";

const PromptInput = ({ prompt, setPrompt }) => (
  <div>
    <label className="block font-semibold mb-1">Custom Instruction/Prompt</label>
    <textarea
      className="w-full border rounded p-2"
      rows={2}
      value={prompt}
      onChange={e => setPrompt(e.target.value)}
      placeholder="e.g. Summarize in bullet points for executives"
    />
  </div>
);

export default PromptInput;
