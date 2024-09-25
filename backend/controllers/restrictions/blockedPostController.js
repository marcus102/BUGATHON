const User = require('./../../models/userModel');
const BlockedPost = require('./../../models/restrictions/blockedPostModel');
const BugReport = require('./../../models/bugReportModel');
const BugFixes = require('../../models/bugFixesModel');
const ReusableCode = require('../../models/reusableCodeModel');
const Blog = require('../../models/blogPostModel');
const Comment = require('./../../models/user_engagement/commentModel');
const catchAsync = require('../../utils/catchAsync');
const appError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };

  setIfUndefined('user', req.user.id);
  setIfUndefined('reusableCode', req.params.reusable_code_id);
  setIfUndefined('bugFix', req.params.bug_fixes_id);
  setIfUndefined('blogPost', req.params.blog_post_id);
  setIfUndefined('comment', req.params.comment_id);

  next();
};

exports.blockPostHandler = catchAsync(async (req, res, next) => {
  const { bugFix, reusableCode, blogPost, bugReport, user, comment } = req.body;
  if (!(bugFix || reusableCode || blogPost || bugReport || comment)) {
    return next(appError('This operation cannot be performed!', 401));
  }

  let dataField;
  let DB;

  if (bugFix) {
    dataField = 'bugFix';
    DB = BugFixes;
  } else if (reusableCode) {
    dataField = 'reusableCode';
    DB = ReusableCode;
  } else if (bugReport) {
    dataField = 'bugReport';
    DB = BugReport;
  } else if (blogPost) {
    dataField = 'blogPost';
    DB = Blog;
  } else if (comment) {
    dataField = 'comment';
    DB = Comment;
  }

  const targetPost = await DB.findById(req.body[dataField]);
  if (!targetPost) {
    return next(appError('The post you are trying to block does not exist!', 405));
  }


  const isTargetPostBlocked = await BlockedPost.findOne({
    user: user,
    [dataField]: req.body[dataField]
  });

  if (isTargetPostBlocked) {
    return next(appError('You have already blocked this post!', 405));
  }

  const newBlockedPost = new BlockedPost({
    user: user,
    [dataField]: req.body[dataField]
   
  });

  await newBlockedPost.save();

  res.status(201).json({
    status: 'success',
    data: newBlockedPost
  });
});

exports.getAllBlockedPosts = factory.getAll(BlockedPost);
exports.getBlockedPost = factory.getOne(BlockedPost);
// exports.updateBlockedUser = factory.updateOne(BlockedUser);
// exports.unblockedPostrHandler = catchAsync(async (req, res, next) => {
//   const blockedUserDoc = await BlockedUser.findById(req.params.id);

//   if (!blockedUserDoc) {
//     return next(appError('Document with that ID does not exist!', 405));
//   }

//   const { blockedBy } = blockedUserDoc;

//   if (!blockedBy.valueOf() === req.user.id) {
//     return next(appError('You cannot unblock a user that you have not blocked!', 401));
//   }

//   await BlockedUser.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     status: 'success',
//     data: null
//   });
// });
