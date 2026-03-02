const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/dashboard
// @desc    Get dashboard data with calculated scores
router.get('/', auth, async (req, res, next) => {
  try {
    const user = req.user;

    // Calculate Market Position Score
    const profileCompleteness = user.getProfileCompleteness();
    const hasResume = user.resumeData?.authorityScore > 0;
    const resumeScore = hasResume ? user.resumeData.authorityScore : 0;
    const activityScore = Math.min(user.totalPostsGenerated * 5, 30);
    const skillScore = Math.min(user.coreSkills.length * 5, 20);
    const marketPositionScore = Math.round(
      (profileCompleteness * 0.3) + (resumeScore * 0.3) + (activityScore) + (skillScore)
    );

    // Calculate Profile Strength
    const profileStrength = profileCompleteness;

    // Keyword Optimization Score
    const keywordOptimizationScore = hasResume
      ? Math.max(100 - (user.resumeData.keywordGapAnalysis?.length || 0) * 10, 30)
      : 40;

    // Visibility Score
    const visibilityScore = Math.round(
      (marketPositionScore * 0.4) + (profileStrength * 0.3) + (activityScore)
    );

    // Weekly Authority Moves
    const weeklyAuthorityMoves = [
      {
        activity: 'LinkedIn Profile Audit',
        status: profileCompleteness >= 80 ? 'Completed' : 'In Progress',
        impact: 'High Visibility Gain',
        points: profileCompleteness >= 80 ? 250 : 0,
        icon: 'alternate_email',
        color: 'indigo',
      },
      {
        activity: 'AI Content Drafting',
        status: user.totalPostsGenerated > 0 ? 'In Progress' : 'Queued',
        impact: 'Medium Authority Boost',
        points: user.totalPostsGenerated * 50,
        icon: 'edit_note',
        color: 'orange',
      },
      {
        activity: 'Resume Optimization',
        status: hasResume ? 'Completed' : 'Queued',
        impact: 'High Career Impact',
        points: hasResume ? 300 : 0,
        icon: 'description',
        color: 'emerald',
      },
      {
        activity: 'Network Expansion',
        status: 'Queued',
        impact: 'Networking Value',
        points: 0,
        icon: 'hub',
        color: 'purple',
      },
    ];

    // Visibility Upgrade Plan
    const visibilityUpgradePlan = [];
    if (profileCompleteness < 80) {
      visibilityUpgradePlan.push({
        title: 'Complete Your Profile',
        description: `Your profile is ${profileCompleteness}% complete. Fill in missing fields.`,
        icon: 'person',
        priority: 'high',
      });
    }
    if (!user.domainFocus) {
      visibilityUpgradePlan.push({
        title: 'Set Domain Focus',
        description: 'Define your focus area to get targeted content suggestions.',
        icon: 'target',
        priority: 'high',
      });
    }
    if (user.totalPostsGenerated < 3) {
      visibilityUpgradePlan.push({
        title: 'Generate 3 Posts',
        description: 'Use the Content Engine to create authority-building posts.',
        icon: 'edit_note',
        priority: 'medium',
      });
    }
    if (!hasResume) {
      visibilityUpgradePlan.push({
        title: 'Upload Your Resume',
        description: 'Get AI-powered optimization suggestions for your resume.',
        icon: 'upload_file',
        priority: 'medium',
      });
    }

    // Suggested Content Focus
    const suggestedContentFocus = [
      {
        title: 'Rewrite Headline',
        description: `Focus on "${user.domainFocus || 'your domain'}" to match trending searches.`,
        icon: 'magic_button',
      },
      {
        title: 'Engage 5 Peers',
        description: 'Comment on recent posts from lead researchers in your field.',
        icon: 'group',
      },
      {
        title: 'Post: Weekly Learnings',
        description: 'Share one insight from your latest project or coursework.',
        icon: 'article',
      },
    ];

    res.json({
      marketPositionScore: Math.min(marketPositionScore, 100),
      profileStrength,
      keywordOptimizationScore,
      visibilityScore: Math.min(visibilityScore, 100),
      weeklyAuthorityMoves,
      visibilityUpgradePlan,
      suggestedContentFocus,
      hasActivity: profileCompleteness > 30 || user.totalPostsGenerated > 0 || hasResume,
      stats: {
        totalPostsGenerated: user.totalPostsGenerated,
        authorityScore: user.authorityScore,
        profileCompleteness,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
