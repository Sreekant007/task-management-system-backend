const User = require("../models/user");
const Op = require("sequelize").Op;

function findOneUserByEmail(email) {
  return User.findOne({
    where: { [Op.or]: [{ email: email }] },
  });
}
function findOneUserById(id) {
  return User.findOne({
    where: { id: id },
  });
}
function createUser(user) {
  return User.create(user);
}

module.exports = {
  findOneUserByEmail,
  createUser,
  findOneUserById,
};
