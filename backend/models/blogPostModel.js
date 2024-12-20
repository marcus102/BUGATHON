const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog post title is required!'],
      minlength: 3,
      maxlength: 255
    },
    content: {
      type: String,
      required: [true, 'Blog post Content is required!']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Blog post must have a user']
    },
    viewCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    savesCount: {
      type: Number,
      default: 0
    },
    reportCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'rejected', 'published'],
      default: 'draft'
    },
    flagged: {
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

blogSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('likedBy', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('savedBy', {
  ref: 'Save',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('image', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('operatingSystem', {
  ref: 'OperatingSystem',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('programmingLanguages', {
  ref: 'Language',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('zoneOfInterests', {
  ref: 'ZoneOfInterest',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.virtual('viewers', {
  ref: 'Viewer',
  localField: '_id',
  foreignField: 'blogPost'
});

blogSchema.pre('findOneAndUpdate', function(next) {
  this.getUpdate().updatedAt = Date.now();
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
