const express = require('express');
const viewersController = require('../../controllers/user_engagement/viewersController');
const authenticatioController = require('../../controllers/authenticatioController');

const router = express.Router({ mergeParams: true });

router.use(authenticatioController.protect);

router.route('/').post(viewersController.createViews);
// .get(authenticatioController.restrictTo('admin', 'user'), viewersController.getAllViewers);

// router
//   .route('/:id')
//   .get(authenticatioController.restrictTo('admin', 'user'), viewersController.getViewer)
//   .delete(viewersController.deleteViewer)
//   .patch(viewersController.updateViewer);

module.exports = router;
