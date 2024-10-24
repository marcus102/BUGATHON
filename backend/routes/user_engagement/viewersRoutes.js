const express = require('express');
const viewersController = require('../../controllers/user_engagement/likesController');
const authenticatioController = require('../../controllers/authenticatioController');

const router = express.Router({ mergeParams: true });

router.use(authenticatioController.protect);

router
  .route('/')
  .post(likesController.setRequiredIds, likesController.toggleLike)
  .get(authenticatioController.restrictTo('admin', 'user'), likesController.getAllUsersThatLikePosts);

router.get('/:id', authenticatioController.restrictTo('admin'), likesController.getUserThatLikePosts);

module.exports = router;
