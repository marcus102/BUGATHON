const validator = require('validator');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('../utils/appError');
const factory = require('./handlerFactory');
const filterParams = require('./../utils/filterParams');

exports.setRequiredIds = (req, res, next) => {
  const setIfUndefined = (field, value) => {
    if (!req.body[field]) req.body[field] = value;
  };
  setIfUndefined('targetUserId', req.params.user_id);
  setIfUndefined('user', req.user.id);

  next();
};

exports.createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Cannot create a user with this url! Please Sigup'
  });
});

exports.assignUserRole = catchAsync(async (req, res, next) => {
  const targetUser = await User.findById(req.body.targetUserId);

  if (!targetUser) {
    return next(appError('The target user for the role has not been found!', 404));
  }

  const filteredBody = filterParams.allowedFields(req.body, 'role');

  const assignRole = await User.findByIdAndUpdate(req.body.targetUserId, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: assignRole
    }
  });
});

exports.getAllUsers = factory.getAll(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
exports.getUser = factory.getOne(User, [
  { path: 'image' },
  { path: 'zoneOfInterests' },
  { path: 'categories' },
  { path: 'operatingSystem' },
  { path: 'programmingLanguages' }
]);

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user post password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(appError('This route is not for password update!', 400));
  }

  // Normalize and validate fields
  const normalizeAndValidate = (field, validatorFn, errorMsg) => {
    if (req.body[field] && !Array.isArray(req.body[field])) {
      req.body[field] = [req.body[field]];
    }
    if (req.body[field]) {
      const invalidItems = req.body[field].filter(item => !validatorFn(item));
      if (invalidItems.length > 0) {
        return next(appError(errorMsg, 400));
      }
    }
  };

  normalizeAndValidate('professions', item => typeof item === 'string', 'Professions should be an array of strings!');
  normalizeAndValidate('links', validator.isURL, 'One or more links are invalid URLs!');

  // Fetch the current user data if professions or links are provided
  let user;
  if (req.body.professions || req.body.links) {
    user = await User.findById(req.user.id);
  }

  // Append professions and links to the existing arrays
  if (req.body.professions) {
    user.professions.push(...req.body.professions);
  }
  if (req.body.links) {
    user.links.push(...req.body.links);
  }

  const filteredBody = filterParams.allowedFields(
    req.body,
    'firstName',
    'lastName',
    'username',
    'professions',
    'profile',
    'email',
    'website',
    'bio',
    'location',
    'links'
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
