const express = require('express');
const imageRouter = require('./imagesRoutes');
const commentRouter = require('./user_engagement/commentsRoutes');
const reviewRouter = require('../routes/user_engagement/reviewsRoutes');
const likesRouter = require('./user_engagement/likeRoutes');
const savesRouter = require('./user_engagement/savesRoutes');
const categoriesRouter = require('./filtering/categoriesRoutes');
const operatingSystemRouter = require('./filtering/operatingSystemRoutes');
const programmingLanguagesRouter = require('./filtering/programmingLanguagesRoutes');
const zoneOfInterestRouter = require('./filtering/zoneOfInterestRoutes');
const reportHubRouter = require('./restrictions/reportHubRoutes');
const blockedPostRouter = require('./restrictions/blockedPostRoutes');
const viewersRouter = require('./user_engagement/viewersRoutes');
const reusableCodeController = require('../controllers/reusableCodeControllerjs');
const contributorsController = require('../controllers/user_engagement/contributorsController');
const imagesController = require('../controllers/imagesController');
const likesController = require('../controllers/user_engagement/likesController');
const authenticatioController = require('../controllers/authenticatioController');
const commentsController = require('../controllers/user_engagement/commentsControllers');
const contributionsController = require('../controllers/user_engagement/contributorsController');
const reviewsController = require('../controllers/user_engagement/reviewsController');
const categoriesController = require('../controllers/filtering/categoriesController');
const operatingSystemController = require('../controllers/filtering/operatingSystemController');
const programmingLanguagesController = require('../controllers/filtering/programmingLanguagesController');
const zoneOfInterestController = require('../controllers/filtering/zoneOfInterestController');

const router = express.Router({ mergeParams: true });

//engagement
router.use('/:reusable_code_id/image', imageRouter);
router.use('/:reusable_code_id/comments', commentRouter);
router.use('/:reusable_code_id/likes', likesRouter);
router.use('/:reusable_code_id/save', savesRouter);
router.use('/:reusable_code_id/review', reviewRouter);
router.use('/:reusable_code_id/viewers', viewersRouter);
//filtering
router.use('/:reusable_code_id/category', categoriesRouter);
router.use('/:reusable_code_id/platform', operatingSystemRouter);
router.use('/:reusable_code_id/language', programmingLanguagesRouter);
router.use('/:reusable_code_id/zone_of_interest', zoneOfInterestRouter);
//restrictions
router.use('/:reusable_code_id/report_reusable_code', reportHubRouter);
router.use('/:reusable_code_id/blocked_reusable_code', blockedPostRouter);

router.use(authenticatioController.protect);

router
  .route('/')
  .get(
    reusableCodeController.filterBlockedPosts,
    reusableCodeController.filterBlockedUsers,
    reusableCodeController.getAllReusableCodes
  )
  .post(reusableCodeController.createReusableCode);
router
  .route('/:id')
  .get(reusableCodeController.getReusableCode)
  .patch(reusableCodeController.updateReusableCode)
  .delete(
    commentsController.deleteMultipleBugReportsCommentsById,
    contributionsController.deleteMultipleReusableCodesContributionsById,
    imagesController.deletMultipleBugReportsImagesById,
    contributorsController.deleteMultipleContributionsById,
    likesController.deleteMultiplebugFixesLikesByArraysOfIds,
    reviewsController.deleteMultiplebugFixesReviewsByArrayOfIds,
    categoriesController.deleteMultipleReusableCodeCategoriesById,
    operatingSystemController.deleteMultipleReusableCodeOsPlatformById,
    programmingLanguagesController.deleteMultipleReusableCodeLanguageById,
    zoneOfInterestController.deleteMultipleReusableCodeZoneOfInterestById,
    reusableCodeController.deleteReusableCode
  );

module.exports = router;
