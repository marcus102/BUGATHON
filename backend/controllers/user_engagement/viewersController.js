const Viewer = require('../../models/user_engagement/viewersModel');
const BugReport = require('../../models/bugReportModel');
const BugFixes = require('../../models/bugFixesModel');
const ReusableCode = require('../../models/reusableCodeModel');
const Blog = require('../../models/blogPostModel');
const Comment = require('../../models/user_engagement/commentModel');
const catchAsync = require('../../utils/catchAsync');
const appError = require('../../utils/appError');
const factory = require('../handlerFactory');

exports.createViews = catchAsync(async (req, res, next) => {
  const { bug_fixes_id, blog_post_id, reusable_code_id, comment_id, bug_report_id } = req.params;

  if (!(bug_fixes_id || reusable_code_id || blog_post_id || bug_report_id || comment_id)) {
    return next(appError('This operation cannot be performed!', 401));
  }

  let model;
  let idField;
  let idValue;

  if (bug_report_id) {
    model = BugReport;
    idField = 'bugReport';
    idValue = bug_report_id;
  } else if (bug_fixes_id) {
    model = BugFixes;
    idField = 'bugFix';
    idValue = bug_fixes_id;
  } else if (blog_post_id) {
    model = Blog;
    idField = 'blogPost';
    idValue = blog_post_id;
  } else if (reusable_code_id) {
    model = ReusableCode;
    idField = 'reusableCode';
    idValue = reusable_code_id;
  } else if (comment_id) {
    model = Comment;
    idField = 'comment';
    idValue = comment_id;
  }

  const query = {
    user: req.user.id,
    [idField]: idValue
  };

  const existingViewer = await Viewer.findOne(query);

  if (existingViewer) {
    return next();
  }

  const newViewer = await Viewer.create({
    user: req.user.id,
    [idField]: idValue
  });

  await model.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

  return res.status(200).json({
    status: 'success',
    data: newViewer
  });
});

exports.getAllViewers = factory.getAll(Viewer);
exports.getViewer = factory.getOne(Viewer);
exports.deleteViewer = factory.deleteOne(Viewer);
exports.updateViewer = factory.updateOne(Viewer);
exports.deleteMultiplebugFixesViewersById = factory.deleteMany(Viewer, 'bugFix');
exports.deleteMultiplebugFixesViewersByArrayOfIds = factory.deleteArray(Viewer, 'bugFix');
