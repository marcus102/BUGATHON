const express = require('express');
const commentsRouter = require('./user_engagement/commentsRoutes');
const imageRouter = require('./imagesRoutes');
const bugFixRouter = require('./bugFixesRoutes');
const categoriesRouter = require('./filtering/categoriesRoutes');
const operatingSystemRouter = require('./filtering/operatingSystemRoutes');
const programmingLanguagesRouter = require('./filtering/programmingLanguagesRoutes');
const zoneOfInterestRouter = require('./filtering/zoneOfInterestRoutes');
const reportHubRouter = require('./restrictions/reportHubRoutes');
const blockedPostRouter = require('./restrictions/blockedPostRoutes');
const viewersRouter = require('./user_engagement/viewersRoutes');
const bugFixesController = require('../controllers/bugFixesController');
const contributorsController = require('../controllers/user_engagement/contributorsController');
const imagesController = require('../controllers/imagesController');
const likesController = require('../controllers/user_engagement/likesController');
const authenticatioController = require('../controllers/authenticatioController');
const commentsController = require('../controllers/user_engagement/commentsControllers');
const bugReportController = require('../controllers/bugReportController');
const reviewsController = require('../controllers/user_engagement/reviewsController');
const categoriesController = require('../controllers/filtering/categoriesController');
const operatingSystemController = require('../controllers/filtering/operatingSystemController');
const programmingLanguagesController = require('../controllers/filtering/programmingLanguagesController');
const zoneOfInterestController = require('../controllers/filtering/zoneOfInterestController');
const likesRouter = require('./user_engagement/likeRoutes');
const savesRouter = require('./user_engagement/savesRoutes');

const router = express.Router({ mergeParams: true });

//engagement
router.use('/:bug_id/comments', commentsRouter);
router.use('/:bug_id/image', imageRouter);
router.use('/:bug_id/bug_fix', bugFixRouter);
router.use('/:bug_report_id/likes', likesRouter);
router.use('/:bug_report_id/save', savesRouter);
router.use('/:bug_report_id/viewers', viewersRouter);
//filtering
router.use('/:bug_id/category', categoriesRouter);
router.use('/:bug_id/operating_system', operatingSystemRouter);
router.use('/:bug_id/language', programmingLanguagesRouter);
router.use('/:bug_id/zone_of_interest', zoneOfInterestRouter);
//restrictions
router.use('/:bug_id/report_bug_report', reportHubRouter);
router.use('/:bug_id/blocked_bug_report', blockedPostRouter);

router.use(authenticatioController.protect);

router
  .route('/')
  .get(bugReportController.filterBlockedPosts, bugReportController.filterBlockedUsers, bugReportController.getAllBugs)
  .post(bugReportController.createBug);

router
  .route('/:id')
  .get(bugReportController.getBug)
  .patch(bugReportController.updateBug)
  .delete(
    commentsController.deleteMultipleBugReportsCommentsById,
    imagesController.deletMultipleBugReportsImagesById,
    contributorsController.deleteMultipleContributionsById,
    bugFixesController.deleteMultipleBugFixesById,
    commentsController.deleteMultipleBugFixesCommentsByArraysOfIds,
    likesController.deleteMultiplebugFixesLikesByArraysOfIds,
    imagesController.deletMultipleBugFixesImagesByArraysOfIds,
    reviewsController.deleteMultiplebugFixesReviewsByArrayOfIds,
    categoriesController.deleteMultipleBugReportCategoriesById,
    operatingSystemController.deleteMultipleBugReportOsPlatformById,
    programmingLanguagesController.deleteMultipleBugReportLanguageById,
    zoneOfInterestController.deleteMultipleBugReportZoneOfInterestById,
    bugReportController.deleteBug
  );

router.patch('/:id/assignBugTo/:assigneeId', bugReportController.assignBugToUser);

router.patch('/:id/deassignBugTo/:assigneeId', bugReportController.deassignBugFromUser);

module.exports = router;
