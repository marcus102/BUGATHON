const mongoose = require('mongoose');
const appError = require('../utils/appError');
const BugFixes = require('../models/bugFixesModel');
const BugReport = require('../models/bugReportModel');
const Contributor = require('../models/user_engagement/contributorsModel');
const Category = require('./../models/filtering/categoriesModel');
const OperatingSystem = require('./../models/filtering/operatingSystemModel');
const Language = require('./../models/filtering/programmingLanguagesModel');
const User = require('./../models/userModel');
const BlockedUser = require('../models/restrictions/blockedUserModel');
const BlockedPost = require('../models/restrictions/blockedPostModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const filterParams = require('../utils/filterParams');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('user', req.user.id);
  setIfUndefined('bugReport_', req.params.bug_id);

  next();
};

exports.createBugFix = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    user,
    bugReport_,
    bugFix_,
    frameworkVersions,
    category,
    language,
    operatingSystem
  } = req.body;

  let bugFix;
  let bugReportValue;

  if (bugFix_) {
    bugFix = await BugFixes.findById(bugFix_);

    if (!bugFix) {
      return next(appError('Bug fix does not exist!', 404));
    }

    const { bugReport } = bugFix;
    bugReportValue = bugReport.valueOf();
  } else {
    bugReportValue = bugReport_;
  }

  const targetBugReport = await BugReport.findById(bugReportValue);

  if (!targetBugReport) {
    return next(appError('Bug does not exist!', 404));
  }

  if (bugFix_) {
    await BugFixes.findByIdAndUpdate(bugFix_, { $inc: { totalAttempts: 1 } });
  }

  await BugReport.findByIdAndUpdate(bugReportValue, { $inc: { totalAttempts: 1 } });

  const newBugFix = await BugFixes.create({
    title: title,
    description: description,
    user: user,
    bugReport: bugReportValue,
    parentSolution: bugFix_ ? bugFix_ : null,
    frameworkVersions: frameworkVersions
  });

  const { _id } = newBugFix;

  await Contributor.create({
    user: user,
    bugFix: _id,
    parentBugFix: bugFix_,
    bugReport: bugReportValue
  });

  if (category) {
    await Category.create({
      category: category,
      user: req.user.id,
      username: req.user.username,
      bugFix: _id
    });
  }

  if (language) {
    await Language.create({
      language: language,
      user: req.user.id,
      username: req.user.username,
      bugFix: _id
    });
  }

  if (operatingSystem) {
    await OperatingSystem.create({
      operatingSystem: operatingSystem,
      user: req.user.id,
      username: req.user.username,
      bugFix: _id
    });
  }

  await User.findByIdAndUpdate(bugFix_, { $inc: { bugFixesCount: 1 } });

  res.status(201).json({
    status: 'success',
    data: newBugFix
  });
});

exports.filterBlockedUsers = factory.blocksHandler(BlockedUser, 'user_ids');
exports.filterBlockedPosts = factory.blocksHandler(BlockedPost, 'bug_fix_ids');

exports.getALLBugFixes = factory.getAll(BugFixes, 'user_ids', 'bug_fix_ids', [
  { path: 'image' },
  { path: 'reviews' },
  { path: 'likedBy' },
  { path: 'savedBy' },
  { path: 'comments' },
  { path: 'childSolutions' },
  { path: 'contributors' },
  { path: 'categories' },
  { path: 'operatingSystem' },
  { path: 'programmingLanguages' },
  { path: 'zoneOfInterests' },
  { path: 'viewers' }
]);

exports.getBugFix = factory.getOne(BugFixes, [
  { path: 'image' },
  { path: 'reviews' },
  { path: 'likedBy' },
  { path: 'savedBy' },
  { path: 'comments' },
  { path: 'childSolutions' },
  { path: 'contributors' },
  { path: 'categories' },
  { path: 'operatingSystem' },
  { path: 'programmingLanguages' },
  { path: 'zoneOfInterests' },
  { path: 'viewers' }
]);

exports.updateBugFix = catchAsync(async (req, res, next) => {
  const bugFix = await BugFixes.findById(req.params.id);

  if (!bugFix) {
    return next(appError('Bug Fix not found!', 404));
  }

  const filteredBody = filterParams.excludedFields(req.body, 'status');

  const updatedBugFix = await BugFixes.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    status: 'success',
    data: updatedBugFix
  });
});

exports.deleteBugFix = catchAsync(async (req, res, next) => {
  const doc = await BugFixes.findById(req.params.id);

  if (!doc) {
    return next(appError('No document found with that ID! ', 404));
  }

  const { parentSolution, bugReport } = doc;
  const parentSolutionValue = parentSolution?.valueOf();
  const bugReportValue = bugReport?.valueOf();

  const parrentBugFix = await BugFixes.findById(parentSolutionValue);

  if (parrentBugFix) {
    const { _id } = parrentBugFix;
    const parentBugFixIdValue = _id?.valueOf();

    await BugFixes.findByIdAndUpdate(parentBugFixIdValue, { $inc: { totalAttempts: -1 } });
  }

  await BugReport.findByIdAndUpdate(bugReportValue, { $inc: { totalAttempts: -1 } });
  await User.findByIdAndUpdate(req.user.id, { $inc: { bugFixesCount: -1 } });

  await BugFixes.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    data: null
  });
});

exports.deleteMultipleBugFixesById = factory.deleteMany(BugFixes, 'bugReport', true, true);

exports.getUserTotalBugFixes = catchAsync(async (req, res, next) => {
  const userId = req.body.user;

  const result = await BugFixes.aggregate([
    {
      $match: { user: new mongoose.Types.ObjectId(userId) }
    },
    {
      $group: {
        _id: null,
        totalAttempts: { $sum: 1 },
        bugIds: { $push: '$_id' }
      }
    },
    {
      $project: {
        _id: 0,
        totalAttempts: 1,
        bugIds: 1
      }
    }
  ]);

  if (result.length === 0) {
    return next(appError('User not found or no bug fixes for the user.', 404));
  }

  const userBugFixes = result[0];
  res.status(200).json({
    status: 'success',
    data: userBugFixes
  });
});
