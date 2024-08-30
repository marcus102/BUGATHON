const express = require('express');
const docsController = require('../controllers/docsController');
const authenticatioController = require('../controllers/authenticatioController');

const router = express.Router({ mergeParams: true });

router.use(authenticatioController.protect);

router.post(
  '/upload_doc',
  docsController.uploadDocument,
  docsController.setRequiredIds,
  authenticatioController.signUp
);

router
  .route('/')
  .get(docsController.getAllDocuments)
  .post(
    docsController.setRequiredIds,
    docsController.checkInfo,
    docsController.uploadDocument,
    docsController.setRequiredIds,
    docsController.createDocument
  );

router
  .route('/:id')
  .patch(docsController.uploadDocument, docsController.setRequiredIds, docsController.updateDocument)
  .delete(docsController.deleteDocument)
  .get(docsController.getDocument);

module.exports = router;
