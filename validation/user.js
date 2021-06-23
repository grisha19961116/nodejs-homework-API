const Joi = require("joi");

const validate = require("./validate");

const schemaCreateNewUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional().trim().optional(),
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string().required(),
  token: Joi.string().optional(),
}).min(2);

const schemaLogIn = Joi.object({
  email: Joi.string().email().min(3).max(30).required(),
  password: Joi.string().required(),
  token: Joi.string().optional(),
}).min(2);

module.exports.registration = (req, _res, next) => {
  return validate(schemaCreateNewUser, req.body, next);
};
module.exports.logIn = (req, _res, next) => {
  return validate(schemaLogIn, req.body, next);
};
