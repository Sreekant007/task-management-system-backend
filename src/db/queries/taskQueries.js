const { Promise } = require("bluebird");
const Task = require("../models/task");
const User = require("../models/user");
const Op = require("sequelize").Op;

function findTaskByTitle(title) {
  return Task.findOne({
    where: { [Op.or]: [{ title: title }], deletedAt: null },
  });
}

function findTaskById(id) {
  return Task.findOne({
    where: { id: id },
  });
}

function creatTask(task) {
  return Task.create(task);
}
function deleteTask(task) {
  return Task.destroy(task);
}

async function getAllTask(id, limit, offset) {
  let allTask;
  if (limit && offset) {
    allTask = await Task.findAndCountAll({
      where: { userId: id },
      limit: limit,
      offset: offset,
      include: { model: User, as: "User" },
      order: [["updatedAt", "DESC"]],
    });
  } else {
    allTask = await Task.findAndCountAll({
      where: { userId: id },
      include: { model: User, as: "User" },
      order: [["updatedAt", "DESC"]],
    });
  }
  return allTask;
}
function getTaskById(id) {
  return Task.findOne({
    where: { id: id },
  });
}
function updateTask(task) {
  return task.save();
}
module.exports = {
  findTaskByTitle,
  findTaskById,
  creatTask,
  getAllTask,
  getTaskById,
  deleteTask,
  updateTask,
};
