// MVM Patron web server: serves the built site from dist/ and answers the AI chat
// through /api/chat, so the Gemini API key never reaches the browser.

require('dotenv').config();
const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 8080;
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const model = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const staticPath = path.join(__dirname, 'dist');

const SYSTEM_PROMPT = 'Jesteś ekspertem wulkanizacji pracującym dla warsztatu MVM Patron w Pisarzowicach. Specjalizujemy się w: Motocyklach (szosowe, turystyczne, skutery, choppery), Serwisie dętek rowerowych, Autach 4x4, Autach osobowych oraz Detailingu kół. Odpowiadaj profesjonalnie, zwięźle i po polsku. Zawsze zachęcaj do kontaktu telefonicznego +48 721 456 905 w pilnych sprawach.';
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set: the site works, but the AI chat will return an error.');
}

// One reverse proxy (Caddy, or Cloud Run's front end) sits between visitors and this server.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.get('/healthz', (req, res) => res.type('text').send('ok'));

// Older visits registered a service worker from the AI Studio template; replace it with one
// that removes itself.
app.get('/service-worker.js', (req, res) => {
  res.type('application/javascript').set('Cache-Control', 'no-store').send(
    "self.addEventListener('install', () => self.skipWaiting());\n" +
    "self.addEventListener('activate', () => self.registration.unregister());\n"
  );
});

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

app.post('/api/chat', chatLimiter, express.json({ limit: '50kb' }), async (req, res) => {
  if (!apiKey) {
    return res.status(503).json({ error: 'Chat is not configured.' });
  }

  const messages = Array.isArray(req.body && req.body.messages) ? req.body.messages : null;
  const valid = messages && messages.length > 0 && messages.length <= MAX_MESSAGES && messages.every(
    (m) => m && (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' && m.content.length > 0 && m.content.length <= MAX_MESSAGE_LENGTH
  );
  if (!valid) {
    return res.status(400).json({ error: 'Invalid messages.' });
  }

  // Gemini expects the conversation to start with a user turn.
  const firstUser = messages.findIndex((m) => m.role === 'user');
  if (firstUser === -1) {
    return res.status(400).json({ error: 'Invalid messages.' });
  }
  const contents = messages.slice(firstUser).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': apiKey },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { temperature: 0.7 },
        }),
        signal: AbortSignal.timeout(30000),
      }
    );
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      console.error(`Gemini API error ${response.status}:`, data && data.error ? data.error.message : 'no body');
      return res.status(502).json({ error: 'Upstream error.' });
    }
    const text = data && data.candidates && data.candidates[0] && data.candidates[0].content &&
      (data.candidates[0].content.parts || []).map((p) => p.text || '').join('');
    if (!text) {
      return res.status(502).json({ error: 'Empty response.' });
    }
    res.json({ text });
  } catch (error) {
    console.error('Gemini request failed:', error.message);
    res.status(502).json({ error: 'Upstream error.' });
  }
});

// Hashed build assets never change, so browsers may cache them for a year.
app.use('/assets', express.static(path.join(staticPath, 'assets'), { immutable: true, maxAge: '1y' }));
app.use(express.static(staticPath, { maxAge: '1d', index: false }));

// Single-page app: every other GET returns index.html, never cached so deploys show at once.
app.get('*', (req, res) => {
  if (path.extname(req.path)) {
    return res.status(404).type('text').send('Not found');
  }
  res.set('Cache-Control', 'no-cache').sendFile(path.join(staticPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
