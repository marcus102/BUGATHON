const BugReport = require('../../models/bugReportModel');
const BugFixes = require('../../models/bugFixesModel');
const ReusableCode = require('../../models/reusableCodeModel');
const Blog = require('../../models/blogPostModel');
const Comment = require('../../models/user_engagement/commentModel');
const catchAsync = require('../../utils/catchAsync');
const appError = require('../../utils/appError');

exports.createViews = catchAsync(async (req, res, next) => {
  const { bug_fixes_id, blog_post_id, reusable_code_id, comment_id, bug_report_id } = req.params;

  if (!(bug_fixes_id || reusable_code_id || blog_post_id || bug_report_id || comment_id)) {
    return next(appError('This operation cannot be performed!', 401));
  }

  let model;
  let id;

  if (bug_report_id) {
    model = BugReport;
    id = bug_report_id;
  } else if (bug_fixes_id) {
    model = BugFixes;
    id = bug_fixes_id;
  } else if (blog_post_id) {
    model = Blog;
    id = blog_post_id;
  } else if (reusable_code_id) {
    model = ReusableCode;
    id = reusable_code_id;
  } else if (comment_id) {
    model = Comment;
    id = comment_id;
  }

  await model.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

  return res.status(200).json({
    status: 'success'
  });
});

// const Viewer = require('../../models/user_engagement/viewersModel');
// const BugReport = require('../../models/bugReportModel');
// const BugFixes = require('../../models/bugFixesModel');
// const ReusableCode = require('../../models/reusableCodeModel');
// const Blog = require('../../models/blogPostModel');
// const Comment = require('../../models/user_engagement/commentModel');
// const catchAsync = require('../../utils/catchAsync');
// const factory = require('../handlerFactory');

// exports.setRequiredIds = (req, res, next) => {
//   const setIfUndefined = (field, value) => {
//     if (!req.body[field]) req.body[field] = value;
//   };
//   setIfUndefined('user', req.user.id);
//   setIfUndefined('bugFix', req.params.bug_fixes_id);
//   setIfUndefined('blogPost', req.params.blog_post_id);
//   setIfUndefined('reusableCode', req.params.reusable_code_id);
//   setIfUndefined('comment', req.params.comment_id);
//   setIfUndefined('bugReport', req.params.bug_report_id);

//   next();
// };

// exports.createViewer = catchAsync(async (req, res, next) => {
//   const { user, bugFix, blogPost, reusableCode, comment, bugReport } = req.body;

//   if (!(bugFix || reusableCode || blogPost || bugReport || comment)) {
//     return next(appError('This operation cannot be performed!', 401));
//   }

//   let model;
//   let id;

//   if (bugReport) {
//     model = BugReport;
//     id = bugReport;
//   } else if (bugFix) {
//     model = BugFixes;
//     id = bugFix;
//   } else if (blogPost) {
//     model = Blog;
//     id = blogPost;
//   } else if (reusableCode) {
//     model = ReusableCode;
//     id = reusableCode;
//   } else if (comment) {
//     model = Comment;
//     id = comment;
//   }

//   const newViewer = await Viewer.create({
//     user: user,
//     bugFix: bugFix,
//     blogPost: blogPost,
//     reusableCode: reusableCode,
//     comment: comment,
//     bugReport: bugReport
//   });

//   await model.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

//   return res.status(200).json({
//     status: 'success',
//     data: newViewer
//   });
// });

// exports.getAllViewers = factory.getAll(Viewer);
// exports.getViewer = factory.getOne(Viewer);
// exports.deleteViewer = factory.deleteOne(Viewer);
// exports.updateViewer = factory.updateOne(Viewer);
// exports.deleteMultiplebugFixesViewersById = factory.deleteMany(Viewer, 'bugFix');

// exports.deleteMultiplebugFixesViewersByArrayOfIds = factory.deleteArray(Viewer, 'bugFix');
