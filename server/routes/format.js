const express = require('express');
const auth = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');
const { generateContent, buildFormatPrompt } = require('../services/gemini');
const router = express.Router();

// @route   POST /api/format-content
// @desc    Format raw text into LinkedIn-optimized content
router.post('/', auth, rateLimiter, async (req, res, next) => {
  try {
    const { rawText } = req.body;

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ error: 'Raw text is required' });
    }

    if (rawText.length > 5000) {
      return res.status(400).json({ error: 'Text too long. Maximum 5000 characters.' });
    }

    const prompt = buildFormatPrompt(rawText);
    const result = await generateContent(prompt);

    res.json({
      ...result,
      usage: req.aiUsage,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
