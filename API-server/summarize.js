

import express from 'express';
import cors from 'cors';
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import dotenv from 'dotenv';
import { sendSummaryEmail } from './sendMail.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { to, summary } = req.body;
  if (!to || !summary) {
    return res.status(400).json({ error: 'Recipient and summary required' });
  }
  try {
    const info = await sendSummaryEmail({ to, summary });
    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Email error' });
  }
});

app.post('/api/summarize', async (req, res) => {
  const { input, instruction } = req.body;
  console.log("Received request to summarize:", { input, instruction });

  if (!input) {
    return res.status(400).json({ error: 'No input provided' });
  }
  try {
    const prompt = instruction
      ? `${instruction}\n\n${input}`
      : input;
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
    });
    res.json({ summary: text });
  } catch (err) {
    res.status(500).json({ error: err.message || 'AI error' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`AI API server running on port ${PORT}`);
});
