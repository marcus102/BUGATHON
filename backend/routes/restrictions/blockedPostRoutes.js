const express = require('express');
const authenticatioController = require('../../controllers/authenticatioController');
const blockedPostController = require('../../controllers/restrictions/blockedPostController');

const router = express.Router({ mergeParams: true });

router.use(authenticatioController.protect);

router.post('/', blockedPostController.setRequiredIds, blockedPostController.blockPostHandler);

router.use(authenticatioController.restrictTo('admin'));

router.get('/', blockedPostController.getAllBlockedPosts);
router.get('/:id', blockedPostController.getBlockedPost);

module.exports = router;
