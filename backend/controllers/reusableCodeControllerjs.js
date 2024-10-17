const ReusableCode = require('../models/reusableCodeModel');
const User = require('./../models/userModel');
const BlockedUser = require('../models/restrictions/blockedUserModel');
const BlockedPost = require('../models/restrictions/blockedPostModel');
const Category = require('./../models/filtering/categoriesModel');
const OperatingSystem = require('./../models/filtering/operatingSystemModel');
const Language = require('./../models/filtering/programmingLanguagesModel');
const factory = require('./handlerFactory');
const Contributor = require('../models/user_engagement/contributorsModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.createReusableCode = catchAsync(async (req, res, next) => {
  const { frameworkVersions, description, title, reusableCode_, category, language, operatingSystem } = req.body;

  const newReusableCode = await ReusableCode.create({
    title: title,
    description: description,
    parentSolution: reusableCode_,
    frameworkVersions: frameworkVersions,
    user: req.user.id
  });

  const { _id } = newReusableCode;

  if (reusableCode_) {
    await ReusableCode.findByIdAndUpdate(reusableCode_, { $inc: { totalAttempts: 1 } });

    await Contributor.create({
      user: req.user.id,
      parentReusableCode: reusableCode_,
      reusableCode: _id
    });
  }

  if (category) {
    await Category.create({
      category: category,
      user: req.user.id,
      username: req.user.username,
      reusableCode: _id
    });
  }

  if (language) {
    await Language.create({
      language: language,
      user: req.user.id,
      username: req.user.username,
      reusableCode: _id
    });
  }

  if (operatingSystem) {
    await OperatingSystem.create({
      operatingSystem: operatingSystem,
      user: req.user.id,
      username: req.user.username,
      reusableCode: _id
    });
  }

  await User.findByIdAndUpdate(req.user.id, { $inc: { reusableCodeCount: 1 } });

  res.status(201).json({
    status: 'success',
    data: newReusableCode
  });
});

exports.filterBlockedUsers = factory.blocksHandler(BlockedUser, 'user_ids');
exports.filterBlockedPosts = factory.blocksHandler(BlockedPost, 'reusable_code_ids');

exports.getAllReusableCodes = factory.getAll(ReusableCode, 'user_ids', 'reusable_code_ids', [
  { path: 'image' },
  { path: 'contributors' },
  { path: 'likedBy' },
  { path: 'savedBy' },
  { path: 'comments' },
  { path: 'categories' },
  { path: 'operatingSystem' },
  { path: 'programmingLanguages' },
  { path: 'zoneOfInterests' }
]);
exports.getReusableCode = factory.getOne(ReusableCode, [
  { path: 'image' },
  { path: 'contributors' },
  { path: 'likedBy' },
  { path: 'savedBy' },
  { path: 'comments' },
  { path: 'categories' },
  { path: 'operatingSystem' },
  { path: 'programmingLanguages' },
  { path: 'zoneOfInterests' }
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
