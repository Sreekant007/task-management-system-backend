"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Task = sequelize.define(
  "Tasks",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    dueDate: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      defaultValue: "0",
      type: DataTypes.ENUM("0", "1", "2", "3"),
      comment: "0-Created , 1-In_Progress , 2-Completed , 3-Deleted",
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "Tasks",
  }
);

module.exports = Task;
