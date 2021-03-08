const Joi = require("joi");

const schemaCreateNewUser = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string().required(),
}).min(3);

const schemaLogIn = Joi.object({
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
