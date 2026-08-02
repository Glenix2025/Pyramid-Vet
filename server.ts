import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { FAQ_KNOWLEDGE_BASE, PYRAMID_CLINIC_INFO, matchFAQLocal } from './src/data/faqKnowledgeBase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client lazily or safely with User-Agent header
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// System instruction for Gemini model
const SYSTEM_INSTRUCTION = `
You are the official customer service assistant chatbot for Pyramid Veterinary Surgery, a long-standing local vet clinic in Gordonvale, QLD, Australia.

CLINIC INFORMATION:
- Name: Pyramid Veterinary Surgery
- Address: 181–183 Dempsey Street, Gordonvale, QLD 4865
- Phone & After-Hours Contact: 07 4056-5989
- Online Booking: Available via the "Book Online" button
- Tagline: "Personalised service and quality care for your pets"
- Opening Hours: Mon–Fri 7:30am–1:30pm, Sat 8:00am–11:30am, Closed Sunday.

CRITICAL FORMATTING & BEHAVIOR RULES:
1. DO NOT output markdown bold asterisks (**). Always write plain text without any ** formatting.
2. DO NOT output raw URLs or markdown link syntax (e.g. no [url](url), no [Book Online](url), no raw https:// links).
3. DO NOT write duplicate website URLs or link wordings. Simply refer to booking online or calling us. An interactive "Book Online" button is automatically rendered below your response.
4. Maintain a warm, friendly, reassuring, community-rooted, and professional tone.
5. ANSWER ONLY FROM THE KNOWLEDGE BASE BELOW. DO NOT INVENT FACTS OR ASSUME UNLISTED SERVICES.
6. FOR ANYTHING OUTSIDE THE KNOWLEDGE BASE (e.g. specific medical diagnosis/symptoms, specific unlisted pricing, medical emergencies, or unconfirmed payment methods), YOU MUST RESPOND WITH: "Please call us on 07 4056-5989" and explain that our team will gladly assist directly.

OFFICIAL FAQ KNOWLEDGE BASE:
${FAQ_KNOWLEDGE_BASE.map(item => `${item.id}. ${item.question} -> ${item.answer}`).join('\n')}
`;

export function sanitizeChatText(text: string): string {
  if (!text) return '';
  let cleaned = text;

  // Remove markdown links e.g. [label](url)
  cleaned = cleaned.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
    if (label.startsWith('http') || label.includes('pyramidvet') || url.includes('pyramidvet')) {
      return '';
    }
    return label;
  });

  // Remove standalone HTTP/HTTPS URLs
  cleaned = cleaned.replace(/https?:\/\/[^\s\)]+/gi, '');

  // Remove all markdown ** asterisks
  cleaned = cleaned.replace(/\*\*/g, '');

  // Clean orphan brackets or leftover empty parens
  cleaned = cleaned.replace(/\(\s*\)/g, '');
  cleaned = cleaned.replace(/\[\s*\]/g, '');
  cleaned = cleaned.replace(/\b(at|via|on|page)\s*[\.,]/gi, '.');
  cleaned = cleaned.replace(/\b(at|via|on|page)\s*$/gi, '');

  // Clean spacing and orphan punctuation
  cleaned = cleaned.replace(/\s+/g, ' ');
  cleaned = cleaned.replace(/\s+([\.,!\?])/g, '$1');

  return cleaned.trim();
}

// API endpoint for Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback to deterministic local match if API key isn't present
      const localRes = matchFAQLocal(message);
      res.json({
        text: sanitizeChatText(localRes.text),
        isOutsideFAQ: localRes.isOutsideFAQ,
        suggestedActions: [
          { type: 'booking', label: 'Book Online', urlOrNumber: PYRAMID_CLINIC_INFO.bookingUrl },
          { type: 'phone', label: 'Call 07 4056-5989', urlOrNumber: PYRAMID_CLINIC_INFO.phone }
        ]
      });
      return;
    }

    // Call Gemini 3.6 Flash
    const formattedPrompt = `User Query: "${message}"\n\nInstructions: Respond concisely based ONLY on the Pyramid Veterinary Surgery FAQ knowledge base. Do NOT use ** or write raw URLs.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1
      }
    });

    const rawReply = response.text || "Please call us on 07 4056-5989";
    const replyText = sanitizeChatText(rawReply);

    const isOutsideFAQ = replyText.includes("07 4056-5989") && (
      replyText.toLowerCase().includes("please call") || 
      replyText.toLowerCase().includes("outside") ||
      replyText.toLowerCase().includes("cannot answer")
    );

    res.json({
      text: replyText,
      isOutsideFAQ,
      suggestedActions: [
        { type: 'booking', label: 'Book Online', urlOrNumber: PYRAMID_CLINIC_INFO.bookingUrl },
        { type: 'phone', label: 'Call 07 4056-5989', urlOrNumber: PYRAMID_CLINIC_INFO.phone }
      ]
    });
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);
    // Graceful error fallback
    const localRes = matchFAQLocal(req.body?.message || '');
    res.json({
      text: sanitizeChatText(localRes.text),
      isOutsideFAQ: localRes.isOutsideFAQ,
      suggestedActions: [
        { type: 'booking', label: 'Book Online', urlOrNumber: PYRAMID_CLINIC_INFO.bookingUrl },
        { type: 'phone', label: 'Call 07 4056-5989', urlOrNumber: PYRAMID_CLINIC_INFO.phone }
      ]
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', clinic: PYRAMID_CLINIC_INFO.name });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
