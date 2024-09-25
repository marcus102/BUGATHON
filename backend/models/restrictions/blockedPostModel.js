// const mongoose = require('mongoose');

// const blockedPostSchema = new mongoose.Schema({
//   reason: { type: String, default: 'no reason' },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'The blocker is required!']
//   },
//   bugFix: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'BugFixes'
//   },
//   bugReport: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'BugReport'
//   },
//   reusableCode: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'ReusableCode'
//   },
//   blogPost: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Blog'
//   },
//   comment: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comment'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now()
//   }
// });

// const BlockedPost = mongoose.model('BlockedPost', blockedPostSchema);

// module.exports = BlockedPost;
