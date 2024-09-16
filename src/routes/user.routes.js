const express = require("express");
const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../helpers/authMiddleware");
const router = express.Router();
/**
 * @author Shrikant Govande
 * @param {express.Application} app
 */

module.exports = function (app) {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get a list of users
   *     description: Retrieve a list of users from the database.
   *     responses:
   *       200:
   *         description: Successful response with a list of users.
   */
  app.post("/users/registration", UserController.UserRegister);
  app.post("/users/login", UserController.UserLogin);
};
