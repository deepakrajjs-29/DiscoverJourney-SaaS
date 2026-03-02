const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   PUT /api/user/profile
// @desc    Update user profile
router.put('/profile', auth, async (req, res, next) => {
  try {
    const allowedFields = [
      'fullName', 'nickname', 'university', 'degree',
      'yearOfStudy', 'domainFocus', 'targetRole',
      'careerAim', 'coreSkills', 'profilePhoto',
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const user = await req.user.constructor.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        nickname: user.nickname,
        email: user.email,
        profilePhoto: user.profilePhoto,
        university: user.university,
        degree: user.degree,
        yearOfStudy: user.yearOfStudy,
        domainFocus: user.domainFocus,
        targetRole: user.targetRole,
        careerAim: user.careerAim,
        coreSkills: user.coreSkills,
        authorityScore: user.authorityScore,
        profileCompleteness: user.getProfileCompleteness(),
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/user/stats
// @desc    Get user analytics
router.get('/stats', auth, async (req, res, next) => {
  try {
    res.json({
      totalPostsGenerated: req.user.totalPostsGenerated,
      authorityScore: req.user.authorityScore,
      profileCompleteness: req.user.getProfileCompleteness(),
      postsGeneratedToday: req.user.postsGeneratedToday,
      dailyLimit: 10,
      memberSince: req.user.createdAt,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/user/export
// @desc    Export user data as JSON
router.get('/export', auth, async (req, res, next) => {
  try {
    const userData = {
      profile: {
        fullName: req.user.fullName,
        email: req.user.email,
        domainFocus: req.user.domainFocus,
        targetRole: req.user.targetRole,
        coreSkills: req.user.coreSkills,
        university: req.user.university,
        degree: req.user.degree,
      },
      content: {
        totalPostsGenerated: req.user.totalPostsGenerated,
      },
      resume: req.user.resumeData,
      memberSince: req.user.createdAt
    };
    
    res.setHeader('Content-disposition', 'attachment; filename=discoverjourney_data.json');
    res.setHeader('Content-type', 'application/json');
    res.write(JSON.stringify(userData, null, 2));
    res.end();
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/user
// @desc    Delete user account
router.delete('/', auth, async (req, res, next) => {
  try {
    await req.user.constructor.findByIdAndDelete(req.user._id);
    res.json({ message: 'Account permanently deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
