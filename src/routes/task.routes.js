const express = require("express");
const TaskController = require("../controllers/task.controller");
const AuthMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
/**
 * @author Shrikant Govande
 * @description routes for task
 * @param {express.Application} app
 */

module.exports = function (app) {
  app.post("/task/create", TaskController.CreateTask);
  app.patch("/task/update", TaskController.UpdateTask);
  app.get("/task", AuthMiddleware.authMiddleware, TaskController.GetAllTask);
  app.get("/taskDetail", TaskController.GetAllTaskBy);
  app.delete("/task", TaskController.DeleteTask);
};
