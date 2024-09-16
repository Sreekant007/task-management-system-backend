const jwt = require("jsonwebtoken");
function genrateAuthToken(payload) {
  return jwt.sign({ id: payload.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

module.exports = {
  genrateAuthToken,
};
