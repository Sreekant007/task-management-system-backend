"use strict";

module.exports = configureCorsHeaders;

/**
 * @author Shrikant Govande
 * @description Here configure the cors header value to resolve cors issue on request api.
 * @param {*} app
 */
function configureCorsHeaders(app) {
  app.all("*", function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Content-Type, X-Requested-With, Authorization"
    );
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
}
