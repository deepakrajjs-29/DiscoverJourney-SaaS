const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  university: {
    type: String,
    default: '',
  },
  degree: {
    type: String,
    default: '',
  },
  yearOfStudy: {
    type: String,
    default: '',
  },
  domainFocus: {
    type: String,
    default: '',
  },
  targetRole: {
    type: String,
    default: '',
  },
  careerAim: {
    type: String,
    default: '',
  },
  coreSkills: {
    type: [String],
    default: [],
  },
  authorityScore: {
    type: Number,
    default: 0,
  },
  postsGeneratedToday: {
    type: Number,
    default: 0,
  },
  lastPostDate: {
    type: Date,
    default: null,
  },
  totalPostsGenerated: {
    type: Number,
    default: 0,
  },
  resumeData: {
    headline: { type: String, default: '' },
    summary: { type: String, default: '' },
    experience: { type: String, default: '' },
    skills: { type: [String], default: [] },
    authorityScore: { type: Number, default: 0 },
    keywordGapAnalysis: { type: [String], default: [] },
    headlineRewrite: { type: String, default: '' },
    aboutRewrite: { type: String, default: '' },
    experienceSuggestions: { type: [String], default: [] },
    missingMetrics: { type: [String], default: [] },
    analyzedAt: { type: Date, default: null },
  },
}, {
  timestamps: true,
});

// Calculate profile completeness
userSchema.methods.getProfileCompleteness = function () {
  const fields = ['fullName', 'email', 'university', 'degree', 'yearOfStudy', 'domainFocus', 'targetRole', 'careerAim'];
  const filled = fields.filter(f => this[f] && this[f].length > 0).length;
  const skillScore = this.coreSkills.length > 0 ? 1 : 0;
  const photoScore = this.profilePhoto ? 1 : 0;
  return Math.round(((filled + skillScore + photoScore) / (fields.length + 2)) * 100);
};

module.exports = mongoose.model('User', userSchema);
