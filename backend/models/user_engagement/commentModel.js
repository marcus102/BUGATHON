const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bugFix: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BugFixes'
    },
    bugReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BugReport'
    },
    reusableCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReusableCode'
    },
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    },
    reportCount: {
      type: Number,
      default: 0
    },
    viewCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    pinMode: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now()
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

commentSchema.post('save', function(doc, next) {
  if (!this.parentComment) {
    this.parentComment = this._id;
  }
  next();
});

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'username profession role firstName lastName followersCount followingCount starCount',
    populate: {
      path: 'image',
      select: 'imageUrl'
    }
  });

  next();
});

commentSchema.virtual('likedBy', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'comment'
});

commentSchema.virtual('savedBy', {
  ref: 'Save',
  localField: '_id',
  foreignField: 'comment'
});

commentSchema.virtual('images', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'comment'
});

commentSchema.virtual('viewers', {
  ref: 'Viewer',
  localField: '_id',
  foreignField: 'comment'
});

commentSchema.pre('findOneAndUpdate', function(next) {
  this.getUpdate().updatedAt = Date.now();

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
