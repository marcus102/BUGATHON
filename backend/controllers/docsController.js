const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Document = require('./../models/docsModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const appError = require('../utils/appError');

// Middleware to set required IDs
exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('user', req.user.id);
  setIfUndefined('username', req.user.username);
  setIfUndefined('documentId', req.params.document_id);

  next();
};

// Multer storage configuration for documents
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './../backend/assets/documents');
  },
  filename: function(req, file, cb) {
    // Use the original name with a timestamp to avoid name collisions
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to only accept specific document types (e.g., PDFs, Word files)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new appError('Invalid file type, only PDF and Word documents are allowed!', 400), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 } // Limit file size to 10MB
});

exports.uploadDocument = upload.single('document');

// Middleware to check if the document exists
exports.checkInfo = catchAsync(async (req, res, next) => {
  const { documentId } = req.body;

  if (documentId) {
    const targetDoc = await Document.findById(documentId);

    if (!targetDoc) {
      return next(appError('You cannot perform this action', 405));
    }
  }

  next();
});

// Create a new document entry
exports.createDocument = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    tags,
    user,
    username,
    documentId
  } = req.body;
  const { mimetype, size } = req.file;

  if (!req.file) {
    return next(appError('No document file provided', 400));
  }

  const newDocument = await Document.create({
    documentUrl: `${req.protocol}://${req.get('host')}/assets/documents/${req.file.filename}`,
    title,
    description,
    tags,
    size,
    fileFormat: mimetype,
    user,
    username,
    documentId
  });

  res.status(201).json({
    status: 'success',
    data: {
      newDocument
    }
  });
});

// Update an existing document entry
exports.updateDocument = catchAsync(async (req, res, next) => {
  const { documentId } = req.params;

  const documentData = await Document.findById(documentId);

  if (!documentData) {
    return next(appError('Document not found', 404));
  }

  if (!req.file) {
    return next(appError('No new document file provided for update', 400));
  }

  const { title, description, tags } = req.body;
  const { size, mimetype, filename } = req.file;

  const oldDocumentPath = path.join(__dirname, '..', 'assets', 'documents', path.basename(documentData.documentUrl));

  await fs.unlink(oldDocumentPath, err => {
    if (err) throw err;
  });

  documentData.documentUrl = `${req.protocol}://${req.get('host')}/assets/documents/${filename}`;
  documentData.title = title || documentData.title;
  documentData.description = description || documentData.description;
  documentData.tags = tags || documentData.tags;
  documentData.size = size || documentData.size;
  documentData.fileFormat = mimetype || documentData.fileFormat;

  await documentData.save({ validateBeforeSave: true });

  res.status(200).json({
    status: 'success',
    data: {
      documentData
    }
  });
});

// Delete a document entry
exports.deleteDocument = catchAsync(async (req, res, next) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return next(appError('Document not found', 404));
  }

  await fs.unlink(document.documentUrl, err => {
    if (err) throw err;
  });

  await Document.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Factory methods for managing documents
exports.getAllDocuments = factory.getAll(Document);
exports.getDocument = factory.getOne(Document);
