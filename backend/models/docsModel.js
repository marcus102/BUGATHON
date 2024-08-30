const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    documentUrl: {
      type: String,
      required: [true, 'Document URL not provided!']
    },
    title: {
      type: String,
      required: [true, 'Document title is required!']
    },
    description: {
      type: String,
      default: null
    },
    tags: {
      type: [
        {
          type: String,
          enum: [
            'Work',
            'School',
            'Personal',
            'Legal',
            'Technical',
            'Finance',
            'Health',
            'Project',
            'Presentation',
            'Report',
            'Essay',
            'Proposal',
            'Contract',
            'Manual',
            'Guide',
            'Spreadsheet',
            'Memo',
            'Letter',
            'Invoice',
            'Resume',
            'CV',
            'CoverLetter',
            'Thesis',
            'Research',
            'Analysis',
            'Plan',
            'Policy',
            'Strategy',
            'Brochure',
            'Newsletter',
            'Book',
            'WhitePaper',
            'Manual',
            'Agreement',
            'MeetingNotes'
          ]
        }
      ],
      default: []
    },
    privacy: {
      type: String,
      enum: ['public', 'private', 'shared'],
      default: 'private'
    },
    fileFormat: {
      type: String,
      validate: {
        validator: function(value) {
          // Define the accepted document formats
          const acceptedFormats = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'odt'];

          // Extract the file extension from the value
          const fileExtension = this.documentUrl
            .toLowerCase()
            .split('.')
            .pop();

          // Check if the file extension is in the accepted formats
          return acceptedFormats.includes(fileExtension);
        },
        message: 'Invalid file format. Accepted formats: pdf, doc, docx, xls, xlsx, ppt, pptx, txt, odt'
      }
    },
    size: Number,
    downloads: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User must be provided!']
    },
    username: String,
    bugReport: {
      type: mongoose.Schema.ObjectId,
      ref: 'BugReport'
    },
    reusableCode: {
      type: mongoose.Schema.ObjectId,
      ref: 'ReusableCode'
    },
    bugFix: {
      type: mongoose.Schema.ObjectId,
      ref: 'BugFixes'
    },
    blogPost: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog'
    },
    comment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: null
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

documentSchema.pre('findOneAndUpdate', function(next) {
  this.getUpdate().updatedAt = Date.now();

  next();
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
