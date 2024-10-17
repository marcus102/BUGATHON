const Blog = require('../models/blogPostModel');
const User = require('../models/userModel');
const BlockedUser = require('../models/restrictions/blockedUserModel');
const BlockedPost = require('../models/restrictions/blockedPostModel');
const Category = require('./../models/filtering/categoriesModel');
const OperatingSystem = require('./../models/filtering/operatingSystemModel');
const Language = require('./../models/filtering/programmingLanguagesModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.createBlogPost = catchAsync(async (req, res, next) => {
  const { content, title, category, language, operatingSystem } = req.body;
  const newBlogPost = new Blog({
    title: title,
    content: content,
    user: req.user.id
  });

  await newBlogPost.save();

  const { _id } = newBlogPost;

  if (category) {
    await Category.create({
      category: category,
      user: req.user.id,
      username: req.user.username,
      blogPost: _id
    });
  }

  if (language) {
    await Language.create({
      language: language,
      user: req.user.id,
      username: req.user.username,
      blogPost: _id
    });
  }

  if (operatingSystem) {
    await OperatingSystem.create({
      operatingSystem: operatingSystem,
      user: req.user.id,
      username: req.user.username,
      blogPost: _id
    });
  }

  await User.findByIdAndUpdate(req.user.id, { $inc: { blogPostCount: 1 } });

  res.status(201).json({
    status: 'success',
    data: newBlogPost
  });
});

exports.filterBlockedUsers = factory.blocksHandler(BlockedUser, 'user_ids');
exports.filterBlockedPosts = factory.blocksHandler(BlockedPost, 'blog_post_ids');
exports.getAllBlogPosts = factory.getAll(Blog, 'user_ids', 'blog_post_ids');

exports.getBlogPost = factory.getOne(Blog, [
  { path: 'reviews' },
  { path: 'likedBy' },
  { path: 'savedBy' },
  { path: 'comments' },
  { path: 'categories' },
  { path: 'operatingSystem' },
  { path: 'programmingLanguages' },
  { path: 'zoneOfInterests' }
]);

exports.updateBolgPost = factory.updateOne(Blog);

exports.deleteBlogPost = catchAsync(async (req, res, next) => {
  const doc = await Blog.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(appError('No document found with that ID! ', 404));
  }

  await User.findByIdAndUpdate(req.user.id, { $inc: { blogPostCount: -1 } });

  res.status(200).json({
    status: 'success',
    data: null
  });
});
