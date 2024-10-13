const express = require('express');
const commentsRouter = require('./user_engagement/commentsRoutes');
const reviewRouter = require('./user_engagement/reviewsRoutes');
const imageRouter = require('./imagesRoutes');
const likesRouter = require('./user_engagement/likeRoutes');
const savesRouter = require('./user_engagement/savesRoutes');
const reportHubRouter = require('./restrictions/reportHubRoutes');
const blockedPostRouter = require('./restrictions/blockedPostRoutes');
const commentsController = require('../controllers/user_engagement/commentsControllers');
const contributionsController = require('../controllers/user_engagement/contributorsController');
const authenticatioController = require('../controllers/authenticatioController');
const bugFixesController = require('../controllers/bugFixesController');
const likesController = require('../controllers/user_engagement/likesController');
const imagesController = require('./../controllers/imagesController');
const reviewsController = require('../controllers/user_engagement/reviewsController');

const router = express.Router({ mergeParams: true });

//engagement
router.use('/:bug_fixes_id/comments', commentsRouter);
router.use('/:bug_fixes_id/reviews', reviewRouter);
router.use('/:bug_fixes_id/image', imageRouter);
router.use('/:bug_fixes_id/likes', likesRouter);
router.use('/:bug_fixes_id/save', savesRouter);
//restricitions
router.use('/:bug_fixes_id/report_bug_fix', reportHubRouter);
router.use('/:bug_fixes_id/blocked_bug_fix', blockedPostRouter);

router.use(authenticatioController.protect);

router.get(
  '/userTotalAttempts',
  bugFixesController.setRequiredIds,
  bugFixesController.filterBlockedPosts,
  bugFixesController.filterBlockedUsers,
  bugFixesController.getUserTotalBugFixes
);

router
  .route('/')
  .get(bugFixesController.getALLBugFixes)
  .post(bugFixesController.setRequiredIds, bugFixesController.createBugFix);

router
  .route('/:id')
  .get(bugFixesController.getBugFix)
  .patch(bugFixesController.updateBugFix)
  .delete(
    commentsController.deleteMultipleBugFixesCommentsById,
    contributionsController.deleteMultipleBugFixesContributionsById,
    reviewsController.deleteMultiplebugFixesReviewsById,
    likesController.deleteMultiplebugFixesLikesById,
    imagesController.deletMultipleBugFixesImagesById,
    bugFixesController.deleteBugFix
  );

module.exports = router;
