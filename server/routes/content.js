const express = require('express');
const auth = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');
const { generateContent, buildContentPrompt } = require('../services/gemini');
const router = express.Router();

// @route   POST /api/generate-content
// @desc    Generate LinkedIn content using Gemini AI
router.post('/', auth, rateLimiter, async (req, res, next) => {
  try {
    const { topic, contentType, tone, targetAudience, customInstructions } = req.body;

    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const prompt = buildContentPrompt({
      topic,
      contentType: contentType || 'text post',
      tone: tone || 'Professional & Insightful',
      targetAudience: targetAudience || 'Professional Network',
      customInstructions,
    });

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
