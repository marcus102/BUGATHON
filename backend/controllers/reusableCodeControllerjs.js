const ReusableCode = require('../models/reusableCodeModel');
const User = require('./../models/userModel');
const BlockedUser = require('../models/restrictions/blockedUserModel');
const BlockedPost = require('../models/restrictions/blockedPostModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.createReusableCode = catchAsync(async (req, res, next) => {
  const {
    securityInfo,
    codeQualityMetrics,
    deploymentInfo,
    usageStatistics,
    frameworkVersions,
    repositoryLink,
    versionControl,
    testingInfo,
    documentationLink,
    license,
    codeSnippet,
    description,
    title
  } = req.body;

  const newBlogPost = new ReusableCode({
    title: title,
    description: description,
    codeSnippet: codeSnippet,
    license: license,
    documentationLink: documentationLink,
    testingInfo: testingInfo,
    versionControl: versionControl,
    repositoryLink: repositoryLink,
    frameworkVersions: frameworkVersions,
    usageStatistics: usageStatistics,
    deploymentInfo: deploymentInfo,
    codeQualityMetrics: codeQualityMetrics,
    securityInfo: securityInfo,
    user: req.user.id
  });

  await newBlogPost.save();

  await User.findByIdAndUpdate(req.user.id, { $inc: { reusableCodeCount: 1 } });

  res.status(201).json({
    status: 'success',
    data: newBlogPost
  });
});

exports.filterBlockedUsers = factory.blocksHandler(BlockedUser, 'user_ids');
exports.filterBlockedPosts = factory.blocksHandler(BlockedPost,'reusable_code_ids');

exports.getAllReusableCodes = factory.getAll(ReusableCode, 'user_ids', 'reusable_code_ids', [
  { path: 'image' },
  { path: 'contributors' },
  { path: 'likedBy' },
  { path: 'comments' }
]);
exports.getReusableCode = factory.getOne(ReusableCode, [
  { path: 'image' },
  { path: 'contributors' },
  { path: 'likedBy' },
  { path: 'comments' }
]);
exports.updateReusableCode = factory.updateOne(ReusableCode);

exports.deleteReusableCode = catchAsync(async (req, res, next) => {
  const doc = await ReusableCode.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(appError('No document found with that ID! ', 404));
  }

  await User.findByIdAndUpdate(req.user.id, { $inc: { reusableCodeCount: -1 } });

  res.status(200).json({
    status: 'success',
    data: null
  });
});
