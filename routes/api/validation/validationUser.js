const Joi = require("joi");

const schemaCreateNewUser = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string().required(),
}).min(2);

const schemaLogIn = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string().required(),
}).min(2);

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.registration = (req, _res, next) => {
  return validate(schemaCreateNewUser, req.body, next);
};
module.exports.logIn = (req, _res, next) => {
  return validate(schemaLogIn, req.body, next);
};
module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Field of avatar with file not found",
    });
  }
  next();
};
