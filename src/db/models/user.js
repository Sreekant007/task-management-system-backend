const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const bcrypt = require("bcrypt");
const Task = require("./task");

const User = sequelize.define(
  "Users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        if (value) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashPassword);
        } else {
          throw new Error("Password is not valid");
        }
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
  },
  {
    freezeTableName: true,
    modelName: "Users",
  }
);
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = User;
