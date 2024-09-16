const Joi = require("joi");
const ResponseHelper = require("../helpers/responseHelper");
const promise = require("bluebird").Promise;

function taskCreateValidator(task) {
  const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    status: Joi.string(),
    userId: Joi.number().required(),
  });
  const isValidTask = taskSchema.validate(task);
  if (isValidTask.error) {
    return createValidatorError(isValidTask.error);
  } else {
    return new promise.resolve(task);
  }
}

function createValidatorError(error) {
  return promise.reject(
    ResponseHelper.wrapValidationError({
      validationError: [error.details[0].message],
    })
  );
}

module.exports = {
  taskCreateValidator,
};
