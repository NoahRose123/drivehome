const express = require('express');
const path = require('path');
const { analyzeCode, generateCode, debugCode } = require('./index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoints
app.post('/api/analyze', async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }
    
    const result = await analyzeCode(code, language || 'javascript');
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const { description, language } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    
    const result = await generateCode(description, language || 'javascript');
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/debug', async (req, res) => {
  try {
    const { code, errorMessage, language } = req.body;
    if (!code || !errorMessage) {
      return res.status(400).json({ error: 'Code and error message are required' });
    }
    
    const result = await debugCode(code, errorMessage, language || 'javascript');
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Web interface running at http://localhost:${PORT}`);
  console.log('📝 Make sure you have set your ANTHROPIC_API_KEY in the .env file');
}); 