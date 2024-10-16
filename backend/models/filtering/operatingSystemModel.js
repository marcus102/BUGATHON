const mongoose = require('mongoose');

const operatingSystemSchema = new mongoose.Schema(
  {
    operatingSystem: {
      type: String,
      enum: ['Android', 'Cross-platform', 'IOS', 'Linux', 'MacOS', 'Windows', 'Other', 'All'],
      default: 'all'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: String,
    bugReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BugReport'
    },
    bugFix: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserAttempt'
    },
    reusableCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReusableCode'
    },
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const OperatingSystem = mongoose.model('OperatingSystem', operatingSystemSchema);

module.exports = OperatingSystem;
