const BugReport = require('./../models/bugReportModel');
const User = require('./../models/userModel');
const Category = require('./../models/filtering/categoriesModel');
const OperatingSystem = require('./../models/filtering/operatingSystemModel');
const Language = require('./../models/filtering/programmingLanguagesModel');
const BlockedUser = require('./../models/restrictions/blockedUserModel');
const BlockedPost = require('../models/restrictions/blockedPostModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');

exports.assignBugToUser = factory.handleBugAssignment('assign', User, BugReport);
exports.deassignBugFromUser = factory.handleBugAssignment('deassign', User, BugReport);

exports.createBug = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    stepsToReproduce,
    expectedBehavior,
    actualBehavior,
    codeSnippet,
    severity,
    category,
    language,
    operatingSystem
  } = req.body;

  const newBugReport = new BugReport({
    title: title,
    description: description,
    stepsToReproduce: stepsToReproduce,
    expectedBehavior: expectedBehavior,
    actualBehavior: actualBehavior,
    codeSnippet: codeSnippet,
    severity: severity,
    user: req.user.id
  });

  await newBugReport.save();

  const { _id } = newBugReport;

  if (category) {
    await Category.create({
      category: category,
      user: req.user.id,
      username: req.user.username,
      bugReport: _id
    });
  }

  if (language) {
    await Language.create({
      language: language,
      user: req.user.id,
      username: req.user.username,
      bugReport: _id
    });
  }

  if (operatingSystem) {
    await OperatingSystem.create({
      operatingSystem: operatingSystem,
      user: req.user.id,
      username: req.user.username,
      bugReport: _id
    });
  }

  await User.findByIdAndUpdate(req.user.id, { $inc: { bugReportCount: 1 } });

  res.status(201).json({
    status: 'success',
    data: newBugReport
  });
});

exports.updateBug = factory.updateOne(BugReport);

exports.deleteBug = catchAsync(async (req, res, next) => {
  const doc = await BugReport.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(appError('No document found with that ID! ', 404));
  }

  await User.findByIdAndUpdate(req.user.id, { $inc: { bugReportCount: -1 } });

  res.status(200).json({
    status: 'success',
    data: null
  });
});

exports.filterBlockedUsers = factory.blocksHandler(BlockedUser, 'user_ids');
exports.filterBlockedPosts = factory.blocksHandler(BlockedPost, 'bug_report_ids');

exports.getAllBugs = factory.getAll(BugReport, 'user_ids', 'bug_report_ids', [
  { path: 'bugFixes' },
  { path: 'image' },
  { path: 'contributors' },
  { path: 'likedBy' },
  { path: 'comments' },
  { path: 'categories' },
  { path: 'operatingSystem' },
  { path: 'programmingLanguages' },
  { path: 'zoneOfInterests' }
]);
exports.getBug = factory.getOne(BugReport, [
  { path: 'bugFixes' },
  { path: 'image' },
  { path: 'contributors' },
  { path: 'likedBy' },
  { path: 'comments' },
  { path: 'categories' },
  { path: 'operatingSystem' },
  { path: 'programmingLanguages' },
  { path: 'zoneOfInterests' }
]);
