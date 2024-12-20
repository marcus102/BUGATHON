const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const emailSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'User must have an email address!'],
    unique: [true, 'Sorry, email already exists! Try another one!'],
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email!'
    }
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    required: [true, 'Email visibility must be specified!'],
    default: 'public'
  }
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'User must have a first name!']
    },
    lastName: {
      type: String,
      required: [true, 'User must have a last name!']
    },
    username: {
      type: String,
      required: [true, 'User must have a username!'],
      lowercase: true,
      unique: [true, 'Sorry, the username is already in use. Please choose another one!'],
      trim: true
    },
    email: emailSchema,
    phone: {
      type: String,
      validate: {
        validator: function(value) {
          return validator.isMobilePhone(value, 'any', { strictMode: false });
        },
        message: 'Please provide a valid phone number!'
      }
    },
    followersCount: {
      type: Number,
      default: 0
    },
    followingCount: {
      type: Number,
      default: 0
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'collaborator', 'admin'],
      default: 'user'
    },
    profession: {
      type: String
    },
    link1: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: 'Please provide a valid URL!'
      }
    },
    link2: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: 'Please provide a valid URL!'
      }
    },
    link3: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: 'Please provide a valid URL!'
      }
    },
    link4: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: 'Please provide a valid URL!'
      }
    },
    bio: String,
    location: String,
    starCount: {
      type: Number,
      default: 0
    },
    bugReportCount: {
      type: Number,
      default: 0
    },
    bugFixesCount: {
      type: Number,
      default: 0
    },
    reusableCodeCount: {
      type: Number,
      default: 0
    },
    blogPostCount: {
      type: Number,
      default: 0
    },
    reportCount: {
      type: Number,
      default: 0
    },
    accountAppealsCount: {
      type: Number,
      default: 0
    },
    password: {
      type: String,
      required: [true, 'User must have a password!'],
      minlength: [8, 'Your password must have a minimum of 8 characters!'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'User must have a password!'],
      validate: {
        //only works on CREATE and SAVE
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are differents!'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    lastLogin: {
      type: Date
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    acountSatus: {
      type: String,
      enum: ['healthy', 'warning', 'banned'],
      default: 'healthy'
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual('image', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('zoneOfInterests', {
  ref: 'ZoneOfInterest',
  localField: 'username',
  foreignField: 'username'
});

userSchema.virtual('categories', {
  ref: 'Category',
  localField: 'username',
  foreignField: 'username'
});

userSchema.virtual('operatingSystem', {
  ref: 'OperatingSystem',
  localField: 'username',
  foreignField: 'username'
});

userSchema.virtual('programmingLanguages', {
  ref: 'Language',
  localField: 'username',
  foreignField: 'username'
});

userSchema.virtual('followers', {
  ref: 'Follower',
  localField: '_id',
  foreignField: 'followingId',
});

userSchema.virtual('followings', {
  ref: 'Follower',
  localField: '_id',
  foreignField: 'followerId',
  justOne: false
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1500;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
