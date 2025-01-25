const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose schema definition
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: [true, 'Avatar URL is required'],
    }
  }
);

// Create Joi validation schema
const userValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
      'string.email': 'Електронна пошта повинна бути дійсною адресою.',
      'string.empty': 'Електронна пошта є обов’язковою.',
      'any.required': 'Електронна пошта є обов’язковою.',
  }),
  password: Joi.string().min(6).required().messages({
      'string.min': 'Пароль повинен містити щонайменше 6 символів.',
      'string.empty': 'Пароль є обов’язковим.',
      'any.required': 'Пароль є обов’язковим.',
  }),
  name: Joi.string().required().messages({
      'string.empty': 'Ім’я є обов’язковим.',
  }),
  token: Joi.string().optional().allow(null),
});



const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
      'string.min': 'Password should be at least 6 characters long.',
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.',
  }),
  email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.',
  }),
  token: Joi.string().optional().allow(null),
});


async function validateUser(data) {
  try {
    await userValidationSchema.validateAsync(data);
    console.log('Validation successful');
  } catch (error) {
    throw new Error(error.details[0].message);
  }
}

// Apply validation on User creation
const User = mongoose.model('User', UserSchema);

// Example of how to use the validation method
async function createUser(data) {
  try {
    await validateUser(data);
    
    // Create and save user to the database
    const user = new User(data);
    await user.save();
    console.log('User created successfully');
  } catch (error) {
    console.error('Validation failed:', error.message);
  }
}


module.exports = {
  User,
  userLoginSchema,
  userValidationSchema
}