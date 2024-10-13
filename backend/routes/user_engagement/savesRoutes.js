const express = require('express');
const savesController = require('../../controllers/user_engagement/savesController');
const authenticatioController = require('../../controllers/authenticatioController');

const router = express.Router({ mergeParams: true });

router.use(authenticatioController.protect);

router
  .route('/')
  .post(savesController.setRequiredIds, savesController.toggleSave)
  .get(authenticatioController.restrictTo('admin', 'user'), savesController.getAllUsersThatSavePosts);

router.get('/:id', authenticatioController.restrictTo('admin'), savesController.getUserThatSavePosts);

module.exports = router;
