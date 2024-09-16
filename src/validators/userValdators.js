const { Promise } = require("bluebird");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const ResponseHelper = require("../helpers/responseHelper");

function userRegistrationValidator(user, response) {
  const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const isValidUser = userSchema.validate(user);
  if (isValidUser.error) {
    return createValidatorError(isValidUser.error);
  } else {
    return new Promise.resolve(user);
  }
}

function createValidatorError(error) {
  return Promise.reject(
    ResponseHelper.wrapValidationError({
      validationError: [error.details[0].message],
    })
  );
}

function checkUserForLogin(user) {
  const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const isValidLogin = userLoginSchema.validate(user);

  if (isValidLogin.error) {
    return createValidatorError(isValidLogin.error);
  } else {
    return new Promise.resolve(user);
  }
}

async function isValideCredentials(password, hash) {
  const isValidPassword = await bcrypt.compare(password, hash);
  return isValidPassword;
}
module.exports = {
  UserRegistrationValidator: userRegistrationValidator,
  CheckUserForLogin: checkUserForLogin,
  IsValideCreadential: isValideCredentials,
};
