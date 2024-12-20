const express = require('express');
const commentsController = require('../../controllers/user_engagement/commentsControllers');
const authenticatioController = require('../../controllers/authenticatioController');
const reportHubRouter = require('./../restrictions/reportHubRoutes');
const blockedPostRouter = require('./../restrictions/blockedPostRoutes');
const likesRouter = require('./../user_engagement/likeRoutes');
const viewersRouter = require('./viewersRoutes');

const router = express.Router({ mergeParams: true });

//user engagement
router.use('/:comment_id/likes', likesRouter);
router.use('/:comment_id/viewers', viewersRouter);
//restrictions
router.use('/:comment_id/report_comment', reportHubRouter);
router.use('/:comment_id/blocked_comment', blockedPostRouter);

router.use(authenticatioController.protect);

router
  .route('/')
  .get(commentsController.filterBlockedComments, commentsController.getAllComments)
  .post(commentsController.setRequiredIds, commentsController.createComment);
router
  .route('/:id')
  .post(commentsController.setRequiredIds, commentsController.createComment)
  .get(commentsController.setRequiredIds, commentsController.getComment)
  .patch(commentsController.updateComment)
  .delete(commentsController.deleteComment);

module.exports = router;
