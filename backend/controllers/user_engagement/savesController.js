const Save = require('../../models/user_engagement/savesModel');
const BugFixes = require('../../models/bugFixesModel');
const ReusableCode = require('../../models/reusableCodeModel');
const BugReport = require('../../models/bugReportModel');
const Blog = require('../../models/blogPostModel');
const Comment = require('../../models/user_engagement/commentModel');
const catchAsync = require('../../utils/catchAsync');
const factory = require('../handlerFactory');
const appError = require('../../utils/appError');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };

  setIfUndefined('user', req.user.id);
  setIfUndefined('reusableCode', req.params.reusable_code_id);
  setIfUndefined('bugFix', req.params.bug_fixes_id);
  setIfUndefined('blogPost', req.params.blog_post_id);
  setIfUndefined('comment', req.params.comment_id);
  setIfUndefined('bugReport', req.params.bug_report_id);

  next();
};

exports.toggleSave = catchAsync(async (req, res, next) => {
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

  const query = { user: user, [dataField]: req.body[dataField] };
  const existingSave = await Save.findOne(query);

  if (existingSave) {
    await Save.findOneAndDelete(query);
    await DB.findByIdAndUpdate(req.body[dataField], {
      $inc: { savesCount: -1 }
    });
  } else {
    const saveData = { user: user, [dataField]: req.body[dataField] };
    const newSave = new Like(saveData);
    await newSave.save();
    await DB.findByIdAndUpdate(req.body[dataField], { $inc: { savesCount: 1 } });
  }

  res.status(200).json({ status: 'success' });
});

exports.getAllUsersThatSavePosts = factory.getAll(Save);
exports.getUserThatSavePosts = factory.getOne(Save);
exports.deleteMultiplebugFixesSavesById = factory.deleteMany(Save, 'bugFix');
exports.deleteMultiplebugFixesSavesByArraysOfIds = factory.deleteArray(Save, 'bugFix');
