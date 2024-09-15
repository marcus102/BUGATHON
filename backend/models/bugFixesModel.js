const mongoose = require('mongoose');
// const BugReport = require('./bugReportModel');

const bugFixSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    state: {
      type: String,
      default: 'bug_fix'
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    parentSolution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BugFixes'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Bug solution must have a user']
    },
    bugReport: {
      type: mongoose.Schema.ObjectId,
      ref: 'BugReport',
      required: [true, 'The bug origin must be defined!']
    },
    viewCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    shareCount: {
      type: Number,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    frameworkVersions: [
      {
        name: String,
        version: String
      }
    ],
    totalAttempts: {
      type: Number,
      default: 0
    },
    reportCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    saveMode: {
      type: Boolean,
      default: false
    },
    updatedAt: {
      type: Date,
      default: null
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

bugFixSchema.pre('findOneAndUpdate', function(next) {
  this.getUpdate().updatedAt = Date.now();

  next();
});

bugFixSchema.pre('save', function(next) {
  const fieldsToCheck = ['title', 'solution', 'description', 'result', 'frameworkVersions', 'contributors', 'status'];

  const isFieldsUnmodified = !fieldsToCheck.some(field => this.isModified(field));

  if (isFieldsUnmodified || this.isNew) {
    return next();
  }

  this.updatedAt = Date.now();
  next();
});

bugFixSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'username profession role firstName lastName followersCount followingCount starCount',
    populate: {
      path: 'image',
      select: 'imageUrl'
    }
  })
    .populate({
      path: 'bugReport',
      select: 'title'
    })
    .populate({
      path: 'parentSolution',
      select: 'title'
    });

  next();
});

bugFixSchema.virtual('contributors', {
  ref: 'Contributor',
  localField: '_id',
  foreignField: 'parentBugFix'
});

bugFixSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'bugFix'
});

bugFixSchema.virtual('image', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'bugFix'
});

bugFixSchema.virtual('categories', {
  ref: 'Category',
  localField: 'bugReport',
  foreignField: 'bugReport'
});

bugFixSchema.virtual('operatingSystem', {
  ref: 'OperatingSystem',
  localField: 'bugReport',
  foreignField: 'bugReport'
});

bugFixSchema.virtual('programmingLanguages', {
  ref: 'Language',
  localField: 'bugReport',
  foreignField: 'bugReport'
});

bugFixSchema.virtual('zoneOfInterests', {
  ref: 'ZoneOfInterest',
  localField: 'bugReport',
  foreignField: 'bugReport'
});

bugFixSchema.virtual('likedBy', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'bugFix'
});

bugFixSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'bugFix'
});

bugFixSchema.virtual('childSolutions', {
  ref: 'BugFixes',
  localField: '_id',
  foreignField: 'parentSolution'
});

const BugFixes = mongoose.model('BugFixes', bugFixSchema);

module.exports = BugFixes;
