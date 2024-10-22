const mongoose = require('mongoose');

const blockedUserSchema = new mongoose.Schema({
  blockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The blocker is required!']
  },
  blockedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'the blocked user is required!']
  },
  reason: {
    type: String,
    default: 'No reason provided'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

blockedUserSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'blockedUser',
    select: 'username firstName lastName'
  });

  next();
});

const BlockedUser = mongoose.model('BlockedUser', blockedUserSchema);

module.exports = BlockedUser;
