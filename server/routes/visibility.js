const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/visibility-insights
// @desc    Get visibility intelligence data
router.get('/', auth, async (req, res, next) => {
  try {
    const user = req.user;
    const domain = user.domainFocus || 'Technology';
    
    // Dynamic logic variables calculation
    const profileCompleteness = user.getProfileCompleteness() || 0;
    const resumeScore = user.resumeData?.authorityScore || 0;
    const postCount = user.totalPostsGenerated || 0;
    const skillBonus = Math.min((user.coreSkills?.length || 0) * 2, 20);
    
    // Base scores for calculating dynamic matches
    const baseScore = Math.min(Math.round((profileCompleteness + resumeScore + postCount * 5) / 2) + skillBonus, 99) || 45;

    // Dynamic stats calculation
    const baseReach = (postCount * 125) + (profileCompleteness * 12);
    const avgReachStr = baseReach >= 1000 ? (baseReach / 1000).toFixed(1) + 'k' : baseReach.toString();
    const engagementNum = Math.min((profileCompleteness * 0.04) + (postCount * 0.2) + (skillBonus * 0.1), 15).toFixed(1);
    const reachChange = Math.min(postCount * 3 + Math.round(profileCompleteness / 10), 85);
    const engageChange = Math.min(postCount * 2 + Math.round(resumeScore / 20), 45);

    res.json({
      highPerformingPostTypes: [
        {
          title: 'The "Learning Out Loud" Update',
          description: 'Share a specific takeaway from a recent project or lecture.',
          matchScore: Math.round(baseScore * 0.95), // dynamically calculated
          growth: postCount > 0 ? '+High Growth' : 'Potential Growth',
          icon: 'school',
          color: 'indigo',
        },
        {
          title: 'Project Breakdown Carousel',
          description: 'Step-by-step visual of how you built a technical solution.',
          matchScore: Math.round(baseScore * 0.88),
          growth: postCount > 1 ? '+High Engagement' : 'Steady Growth',
          icon: 'terminal',
          color: 'purple',
        },
        {
          title: 'The Internship Myth-Buster',
          description: 'Address common misconceptions about student roles.',
          matchScore: Math.round(baseScore * 0.75),
          growth: postCount > 2 ? '+Viral Potential' : 'Authority Builder',
          icon: 'group',
          color: 'blue',
        },
        {
          title: 'The "Before vs After" Story',
          description: 'Show your growth with a personal transformation narrative.',
          matchScore: Math.round(baseScore * 0.82),
          growth: 'Authority Builder',
          icon: 'compare_arrows',
          color: 'emerald',
        },
      ],
      bestPostingTimes: [
        { day: 'Tuesdays', time: '8:45 AM', engagement: 'Peak' },
        { day: 'Thursdays', time: '12:30 PM', engagement: 'High' },
        { day: 'Wednesdays', time: '5:00 PM', engagement: 'Medium' },
      ],
      weeklyEngagement: [
        Math.min(profileCompleteness, 30), 
        Math.min(profileCompleteness + 15, 60), 
        baseScore, 
        Math.min(baseScore - 15, 80), 
        Math.max(baseScore - 5, 40), 
        20, 
        15
      ],
      hookFrameworks: [
        {
          name: 'The Contrarian',
          template: `"Everyone told me [Popular Advice in ${domain}] was true. After 3 months, I realized they were wrong..."`,
        },
        {
          name: 'The Specific Success',
          template: '"How I landed an interview at [Company] using only a 30-second DM strategy..."',
        },
        {
          name: 'The Vulnerable Open',
          template: '"I almost quit [Field] last month. Here\'s what changed my mind..."',
        },
        {
          name: 'The Data Point',
          template: '"I analyzed 100 LinkedIn profiles in my field. Here\'s the #1 thing top performers do differently..."',
        },
      ],
      contentThemes: [
        { theme: `${domain} Insights`, frequency: 'weekly', priority: 'high' },
        { theme: 'Career Journey Updates', frequency: 'bi-weekly', priority: 'medium' },
        { theme: 'Project Showcases', frequency: 'weekly', priority: 'high' },
        { theme: 'Industry Commentary', frequency: 'bi-weekly', priority: 'medium' },
      ],
      weeklyPlanTemplate: [
        { day: 'Monday', action: 'Engage – Comment on 5 posts in your niche' },
        { day: 'Tuesday', action: 'Publish – Share a "Learning Out Loud" post' },
        { day: 'Wednesday', action: 'Connect – Send 3 personalized connection requests' },
        { day: 'Thursday', action: 'Publish – Project breakdown or career insight' },
        { day: 'Friday', action: 'Reflect – Save top-performing content from your feed' },
      ],
      hasActivity: Boolean(user.domainFocus) || user.totalPostsGenerated > 0,
      stats: {
        avgReach: postCount > 0 ? avgReachStr : '0',
        avgReachChange: postCount > 0 ? reachChange : 0,
        engagementRate: postCount > 0 ? engagementNum + '%' : '0%',
        engagementChange: postCount > 0 ? engageChange : 0,
        bestPostType: postCount > 0 ? 'Project Breakdowns' : 'None yet',
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
