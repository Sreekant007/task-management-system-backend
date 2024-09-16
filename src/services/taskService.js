const { Promise } = require("bluebird");
const TaskQueries = require("../db/queries/taskQueries");
const ResponseHelper = require("../helpers/responseHelper");
async function createTaskService(task) {
  try {
    const isTaskExists = await TaskQueries.findTaskByTitle(task.title);

    if (!isTaskExists) {
      return TaskQueries.creatTask(task);
    } else {
      throw {
        type: ResponseHelper.DUPLICATE_ERROR_KEY,
        message: "Task Already Exists",
      };
    }
  } catch (error) {
    throw error;
  }
}

async function deleteTaskService(taskId) {
  try {
    if (!taskId)
      throw {
        type: ResponseHelper.NOT_FOUND_ERROR_KEY,
        message: "Please provide task id",
      };
    const task = await TaskQueries.findTaskById(taskId);
    if (task) {
      return task.destroy();
    } else {
      throw {
        type: ResponseHelper.NOT_FOUND_ERROR_KEY,
        message: "Task Does Not  Exist",
      };
    }
  } catch (error) {
    throw error;
  }
}

async function updateTaskService(taskId, task) {
  const isTaskExists = await TaskQueries.findTaskById(taskId);
  console.log(isTaskExists);

  if (!isTaskExists) {
    throw {
      type: ResponseHelper.NOT_FOUND_ERROR_KEY,
      message: "Task not found",
    };
  } else {
    isTaskExists.title = task.title;
    isTaskExists.description = task.description;
    isTaskExists.dueDate = task.dueDate;
    isTaskExists.status = task.status;
    isTaskExists.userId = task.userId;

    return TaskQueries.updateTask(isTaskExists);
  }
}

module.exports = {
  createTaskService,
  deleteTaskService,
  updateTaskService,
};
