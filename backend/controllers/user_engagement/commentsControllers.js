const appError = require('../../utils/appError');
const Comment = require('../../models/user_engagement/commentModel');
const BlockedPost = require('../../models/restrictions/blockedPostModel');
const factory = require('../handlerFactory');
const catchAsync = require('../../utils/catchAsync');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('user', req.user.id);
  setIfUndefined('bugReport_', req.params.bug_id);
  setIfUndefined('bugFix_', req.params.bug_fixes_id);
  setIfUndefined('reusableCode_', req.params.reusable_code_id);
  setIfUndefined('blogPost_', req.params.blog_post_id);

  next();
};

exports.createComment = catchAsync(async (req, res, next) => {
  const { user, bugReport_, bugFix_, reusableCode_, comment, blogPost_ } = req.body;
  // id is the parent comment unique identifier
  const { id } = req.params;
  if (!id) {
    let dataField;

    if (bugFix_) {
      dataField = bugFix_;
    } else if (reusableCode_) {
      dataField = reusableCode_;
    } else if (blogPost_) {
      dataField = blogPost_;
    } else if (bugReport_) {
      dataField = bugReport_;
    }

    if (!dataField) {
      return next(appError('You are not allowed to perform this action!', 405));
    }

    const createComment = await Comment.create({
      comment: comment,
      user: user,
      bugReport: bugReport_,
      bugFix: bugFix_,
      reusableCode: reusableCode_,
      blogPost: blogPost_
    });

    res.status(201).json({
      status: 'success',
      data: createComment
    });
  }

  if (id) {
    const targetComment = await Comment.findById(id);

    if (!targetComment) {
      return next(appError('Parent comment does not exist!', 405));
    }

    const { bugReport, bugFix, reusableCode, blogPost } = targetComment;

    const createComment = await Comment.create({
      comment: comment,
      parentComment: id,
      user: user,
      bugReport: bugReport && bugReport.valueOf(),
      bugFix: bugFix && bugFix.valueOf(),
      reusableCode: reusableCode && reusableCode.valueOf(),
      blogPost: blogPost && blogPost.valueOf()
    });

    res.status(201).json({
      status: 'success',
      data: createComment
    });
  }
});

exports.filterBlockedComments = factory.blocksHandler(BlockedPost, 'blog_post_ids');
exports.getAllComments = factory.getAll(Comment, null, [
  ({ path: 'likedBy' }, { path: 'savedBy' }, { path: 'images' }, { path: 'viewers' })
]);
exports.getComment = factory.getOne(Comment, [
  { path: 'likedBy' },
  { path: 'savedBy' },
  { path: 'images' },
  { path: 'viewers' }
]);

exports.getPostComment = catchAsync(async (req, res, next) => {});

exports.deleteComment = factory.deleteOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteMultipleBugFixesCommentsById = factory.deleteMany(Comment, 'bugFix');

exports.deleteMultipleBugReportsCommentsById = factory.deleteMany(Comment, 'bugReport');

exports.deleteMultipleBugFixesCommentsByArraysOfIds = factory.deleteArray(Comment, 'bugFix');
