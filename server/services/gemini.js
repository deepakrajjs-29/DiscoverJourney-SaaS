const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;

const getGenAI = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

const generateContent = async (prompt, options = {}) => {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: options.model || 'gemini-2.0-flash' });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: options.temperature || 0.7,
      maxOutputTokens: options.maxTokens || 2048,
      responseMimeType: 'application/json',
    },
  });

  const response = result.response;
  const text = response.text();

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
};

const buildContentPrompt = ({ topic, contentType, tone, targetAudience, customInstructions }) => {
  return `You are an expert LinkedIn content strategist specializing in helping students build professional authority.

Generate a high-impact LinkedIn ${contentType || 'post'} with the following parameters:
- Topic: ${topic}
- Tone: ${tone || 'Professional & Insightful'}
- Target Audience: ${targetAudience || 'Professional Network'}
${customInstructions ? `- Additional Instructions: ${customInstructions}` : ''}

Return a JSON object with exactly these fields:
{
  "hook": "A scroll-stopping opening line (1-2 sentences max, attention-grabbing)",
  "content": "Full post body with clean formatting. Use line breaks for readability. Include unicode bold for headings (e.g. 𝗕𝗼𝗹𝗱 𝗧𝗲𝘅𝘁). Use bullet points with ✅ or → symbols. End with a call-to-action.",
  "hashtags": ["array", "of", "5-7", "relevant", "hashtags"],
  "imagePrompt": "A detailed professional image prompt description aligned with the topic, suitable for LinkedIn, student context",
  "summary": "One-line summary of the post's key message"
}`;
};

const buildResumePrompt = (resumeText) => {
  return `You are an expert career advisor and LinkedIn profile optimizer for students and early-career professionals.

Analyze the following resume text and provide detailed optimization recommendations:

RESUME TEXT:
${resumeText}

Return a JSON object with exactly these fields:
{
  "authorityScore": <number 0-100 rating the resume's professional authority>,
  "keywordGapAnalysis": ["array of important missing keywords/skills for their field"],
  "headlineRewrite": ["array of 3 distinct, optimized LinkedIn headlines"],
  "aboutRewrite": ["array of 3 compelling LinkedIn 'About' section rewrites"],
  "experienceSuggestions": ["array of specific suggestions to improve experience descriptions"],
  "missingMetrics": ["array of places where they should add quantifiable metrics"]
}`;
};

const buildFormatPrompt = (rawText) => {
  return `You are a LinkedIn content formatting expert. Transform the following raw text into a polished, high-engagement LinkedIn post.

RAW TEXT:
${rawText}

Return a JSON object with exactly these fields:
{
  "formattedLinkedInText": "The fully formatted post with proper line breaks, spacing, and structure for LinkedIn",
  "boldConvertedText": "Same post but with key phrases converted to unicode bold (𝗕𝗼𝗹𝗱 format)",
  "optimizedHashtags": ["array", "of", "5-7", "optimized", "hashtags"],
  "improvedCTA": "A stronger call-to-action line for the end of the post"
}`;
};

module.exports = {
  generateContent,
  buildContentPrompt,
  buildResumePrompt,
  buildFormatPrompt,
};
