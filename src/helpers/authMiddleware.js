const express = require("express");
const {
  NOT_AUTHORIZED_ERROR_KEY,
  NOT_AUTHORIZED_USER_KEY,
  createErrorHandler,
} = require("./responseHelper");
const jwt = require("jsonwebtoken");
const UserQueries = require("../db/queries/userQueries");
const SECRET = process.env.JWT_SECRET_KEY;
/**
 * @author Shrikant Govande
 *  @description task create api
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
async function authMiddleware(request, response, next) {
  let token = "";
  const handleError = createErrorHandler(request, response, next);

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        const userDetail = await jwt.verify(token, SECRET);
        const isUser = await UserQueries.findOneUserById(userDetail.id);
        request.body.userId = userDetail.id;
        if (!isUser) {
          handleError({
            type: NOT_AUTHORIZED_USER_KEY,
            message: "User not found .Please login with valid user",
          });
        }
        next();
      } catch (error) {
        handleError({
          type: NOT_AUTHORIZED_USER_KEY,
          message: error.message,
        });
      }
    } else {
      handleError({
        type: NOT_AUTHORIZED_USER_KEY,
        message: "Auth token not found .Please Login",
      });
    }
  } else {
    handleError({
      type: NOT_AUTHORIZED_USER_KEY,
      message: "Auth token is invalid.Please Login",
    });
  }
}

module.exports = {
  authMiddleware,
};
