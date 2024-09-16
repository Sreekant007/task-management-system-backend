const User = require("../db/models/user");
const UserQueries = require("../db/queries/userQueries");

const {
  DUPLICATE_ERROR_KEY,
  NOT_AUTHORIZED_ERROR_KEY,
} = require("../helpers/responseHelper");
const { IsValideCreadential } = require("../validators/userValdators");
const Op = require("sequelize").Op;
async function registerUserService(user) {
  try {
    const isUserExist = await UserQueries.findOneUserByEmail(user.email);
    if (isUserExist) {
      throw {
        type: DUPLICATE_ERROR_KEY,
        message: "User already registered.",
      };
    } else {
      return UserQueries.createUser(user);
    }
  } catch (error) {
    throw error;
  }
}

async function loginUserService(user) {
  try {
    const loginUser = await UserQueries.findOneUserByEmail(user.email);
    if (loginUser) {
      const isValideCredentials = await IsValideCreadential(
        user.password,
        loginUser.password
      );
      console.log(isValideCredentials);
      if (isValideCredentials) {
        return loginUser;
      } else {
        throw {
          type: NOT_AUTHORIZED_ERROR_KEY,
          message: "Invalide Login Credentials.Please try again",
        };
      }
    } else {
      throw {
        type: NOT_AUTHORIZED_ERROR_KEY,
        message: "User not Found ",
      };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  RegisterUserService: registerUserService,
  LoginUserService: loginUserService,
};
