const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  blockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The blocker is required!']
  },
  blockedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bugFix: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BugFixes'
  },
  bugReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BugReport'
  },
  reusableCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReusableCode'
  },
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  reason: { type: String, default: 'no reason' },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Block = mongoose.model('Block', blockSchema);

module.exports = Block;

///////////////////////////////////////////////////////////////////////////

// const mongoose = require('mongoose');

// const blockedUserSchema = new mongoose.Schema({
//   blockedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'The blocker is required!']
//   },
//   blockedUser: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'the blocked user is required!']
//   },
//   reason: String,
//   createdAt: {
//     type: Date,
//     default: Date.now()
//   }
// });

// const BlockedUser = mongoose.model('BlockedUser', blockedUserSchema);

// module.exports = BlockedUser;
