const Viewer = require('../../models/user_engagement/viewersModel');
const factory = require('../handlerFactory');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('user', req.user.id);
  setIfUndefined('bugFix', req.params.bug_fixes_id);
  setIfUndefined('blogPost', req.params.blog_post_id);

  next();
};

exports.createViewer = factory.createOne(Viewer);

exports.getAllViewers = factory.getAll(Viewer);
exports.getViewer = factory.getOne(Viewer);
exports.deleteViewer = factory.deleteOne(Viewer);
exports.updateViewers = factory.updateOne(Viewer);
exports.deleteMultiplebugFixesViewersById = factory.deleteMany(Viewer, 'bugFix');

exports.deleteMultiplebugFixesViewersByArrayOfIds = factory.deleteArray(Viewer, 'bugFix');
