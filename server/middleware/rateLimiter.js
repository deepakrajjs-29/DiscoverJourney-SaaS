const User = require('../models/User');

const DAILY_LIMIT = 10;

const rateLimiter = async (req, res, next) => {
  try {
    const user = req.user;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastPost = user.lastPostDate ? new Date(user.lastPostDate) : null;
    const lastPostDay = lastPost ? new Date(lastPost.setHours(0, 0, 0, 0)) : null;

    // Reset daily count if it's a new day
    if (!lastPostDay || lastPostDay.getTime() < today.getTime()) {
      user.postsGeneratedToday = 0;
      user.lastPostDate = new Date();
      await user.save();
    }

    if (user.postsGeneratedToday >= DAILY_LIMIT) {
      return res.status(429).json({
        error: 'Daily limit reached',
        message: `You have used all ${DAILY_LIMIT} AI generations for today. Limits reset at midnight.`,
        remaining: 0,
        limit: DAILY_LIMIT,
      });
    }

    // Increment counter
    user.postsGeneratedToday += 1;
    user.lastPostDate = new Date();
    user.totalPostsGenerated += 1;
    await user.save();

    req.aiUsage = {
      used: user.postsGeneratedToday,
      remaining: DAILY_LIMIT - user.postsGeneratedToday,
      limit: DAILY_LIMIT,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = rateLimiter;
