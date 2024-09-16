const ResponseHelper = require("../helpers/responseHelper");
const express = require("express");
const {
  UserRegistrationValidator,
  CheckUserForLogin,
} = require("../validators/userValdators");
const UserService = require("../services/userServices");
const { genrateAuthToken } = require("../helpers/genrateToken");

/**
 * @author Shrikant Govande
 *  @description usesr Registration API
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */

function registerUser(request, response, next) {
  var handleError = ResponseHelper.createErrorHandler(request, response, next);
  var sendResponse = ResponseHelper.createResponseHandler(
    request,
    response,
    200
  );
  const user = request.body;
  return UserRegistrationValidator(user, sendResponse)
    .then(UserService.RegisterUserService)
    .then(responseOnRegistration)
    .then(sendResponse)
    .catch(handleError);
}

function responseOnRegistration(user) {
  const userObj = user.toJSON();
  delete userObj.password;
  userObj.token = genrateAuthToken(user);
  return {
    status: "Success",
    message: "User Register Successfully",
    user: userObj,
  };
}

/**
 * @author Shrikant Govande
 * @description uses login API
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
function userLogin(request, response, next) {
  var handleError = ResponseHelper.createErrorHandler(request, response, next);
  var sendResponse = ResponseHelper.createResponseHandler(
    request,
    response,
    200
  );
  const user = request.body;
  return CheckUserForLogin(user)
    .then(UserService.LoginUserService)
    .then(responseOnRegistration)
    .then(sendResponse)
    .catch(handleError);
}
module.exports = {
  UserRegister: registerUser,
  UserLogin: userLogin,
};
