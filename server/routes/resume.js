const express = require('express');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');
const upload = require('../middleware/upload');
const { generateContent, buildResumePrompt } = require('../services/gemini');
const router = express.Router();

// Helpers for text extraction
const extractPdfText = async (filePath) => {
  const pdfParse = require('pdf-parse');
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

const extractDocxText = async (filePath) => {
  const mammoth = require('mammoth');
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

const extractCsvText = async (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
};

// @route   POST /api/analyze-resume
// @desc    Upload and analyze resume with Gemini AI
router.post('/', auth, rateLimiter, upload.single('resume'), async (req, res, next) => {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a resume file (PDF, DOCX, or CSV)' });
    }

    filePath = req.file.path;
    let resumeText = '';

    // Extract text based on file type
    const ext = path.extname(req.file.originalname).toLowerCase();
    switch (ext) {
      case '.pdf':
        resumeText = await extractPdfText(filePath);
        break;
      case '.docx':
        resumeText = await extractDocxText(filePath);
        break;
      case '.csv':
        resumeText = await extractCsvText(filePath);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported file type' });
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract sufficient text from the resume. Please ensure the file is not empty or corrupted.' });
    }

    // Send to Gemini for analysis
    const prompt = buildResumePrompt(resumeText);
    const analysis = await generateContent(prompt);

    // Store structured data in user profile
    req.user.resumeData = {
      headline: analysis.headlineRewrite || '',
      summary: analysis.aboutRewrite || '',
      skills: analysis.keywordGapAnalysis || [],
      authorityScore: analysis.authorityScore || 0,
      keywordGapAnalysis: analysis.keywordGapAnalysis || [],
      headlineRewrite: analysis.headlineRewrite || '',
      aboutRewrite: analysis.aboutRewrite || '',
      experienceSuggestions: analysis.experienceSuggestions || [],
      missingMetrics: analysis.missingMetrics || [],
      analyzedAt: new Date(),
    };
    req.user.authorityScore = analysis.authorityScore || req.user.authorityScore;
    await req.user.save();

    res.json({
      ...analysis,
      usage: req.aiUsage,
    });
  } catch (error) {
    next(error);
  } finally {
    // Always delete the uploaded file after processing
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

module.exports = router;
