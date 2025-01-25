const Joi = require("joi");

const changePasswordValidationSchema = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

module.exports = { changePasswordValidationSchema };