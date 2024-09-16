"use strict";
const express = require("express");
const TaskValidator = require("../validators/taskValidators");
const TaskService = require("../services/taskService");
const ResponseHelper = require("../helpers/responseHelper");
const TaskQueries = require("../db/queries/taskQueries");
/**
 * @author Shrikant Govande
 *  @description task create api
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
function createTask(request, response, next) {
  const task = request.body;
  const handleError = ResponseHelper.createErrorHandler(request, response, 400);
  const sendResponse = ResponseHelper.createResponseHandler(
    request,
    response,
    200
  );

  return TaskValidator.taskCreateValidator(task)
    .then(TaskService.createTaskService)
    .then(responseOnTaskCreate)
    .then(sendResponse)
    .catch(handleError);
}
function responseOnTaskCreate(task) {
  const taskObj = task.toJSON();
  return {
    status: "Success",
    message: "Task Created Successfully",
    task: taskObj,
  };
}

/**
 * @author Shrikant Govande
 *  @description task create api
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */

function getAllTask(request, response, next) {
  const handleError = ResponseHelper.createErrorHandler(request, response, 400);
  const sendResponse = ResponseHelper.createResponseHandler(
    request,
    response,
    200
  );
  const { limit, pageNum } = request.query;
  const userId = request.body.userId;
  console.log(userId);
  return TaskQueries.getAllTask(userId, limit, pageNum)
    .then(responseOnGetAllTask)
    .then(sendResponse)
    .catch(handleError);
}

function responseOnGetAllTask(taskResponse) {
  // const userObj = taskResponse.toJSON();
  console.log(taskResponse.count);
  return {
    count: taskResponse.count,
    task: taskResponse.rows,
  };
}

/**
 * @author Shrikant Govande
 *  @description task create api
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */

function deleteTask(request, response, next) {
  const handleError = ResponseHelper.createErrorHandler(request, response, 400);
  const sendResponse = ResponseHelper.createResponseHandler(
    request,
    response,
    200
  );
  const taskId = request.query?.id;
  return TaskService.deleteTaskService(taskId)
    .then(responseOnDeletTask)
    .then(sendResponse)
    .catch(handleError);
}

function responseOnDeletTask(task) {
  return {
    status: "Success",
    message: "Task Deleted Successfully",
    task,
  };
}

/**
 * @author Shrikant Govande
 *  @description Get task  by id
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
function getAllTaskBy(request, response, next) {
  const handleError = ResponseHelper.createErrorHandler(request, response, 400);
  const sendResponse = ResponseHelper.createResponseHandler(
    request,
    response,
    200
  );
  const taskId = request.query?.id;
  return TaskQueries.getTaskById(taskId).then(sendResponse).catch(handleError);
}
/**
 * @author Shrikant Govande
 *  @description Update task  by id
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
function updateTask(request, response, next) {
  const handleError = ResponseHelper.createErrorHandler(request, response, 400);
  const sendResponse = ResponseHelper.createResponseHandler(
    request,
    response,
    200
  );
  const taskId = request.query?.id;
  const task = request.body;
  return TaskValidator.taskCreateValidator(task)
    .then(TaskService.updateTaskService(taskId, task))
    .then(responseOnUpdateTask)
    .then(sendResponse)
    .catch(handleError);
}

function responseOnUpdateTask(task) {
  return {
    status: "Success",
    message: "Task Updated Successfully",
    task,
  };
}
module.exports = {
  CreateTask: createTask,
  GetAllTask: getAllTask,
  DeleteTask: deleteTask,
  GetAllTaskBy: getAllTaskBy,
  UpdateTask: updateTask,
};
