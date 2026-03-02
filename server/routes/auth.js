const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to profile setup if profile is incomplete, otherwise dashboard
    const isProfileComplete = req.user.university && req.user.domainFocus;
    const redirectPath = isProfileComplete ? '/dashboard' : '/profile-setup';
    res.redirect(`${process.env.CLIENT_URL}${redirectPath}`);
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
router.get('/me', auth, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      nickname: req.user.nickname,
      email: req.user.email,
      profilePhoto: req.user.profilePhoto,
      university: req.user.university,
      degree: req.user.degree,
      yearOfStudy: req.user.yearOfStudy,
      domainFocus: req.user.domainFocus,
      targetRole: req.user.targetRole,
      careerAim: req.user.careerAim,
      coreSkills: req.user.coreSkills,
      authorityScore: req.user.authorityScore,
      totalPostsGenerated: req.user.totalPostsGenerated,
      profileCompleteness: req.user.getProfileCompleteness(),
    },
  });
});

// @route   POST /api/auth/logout
// @desc    Logout - clear cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
