const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().trim(),
  email: Joi.string().email().min(3).max(30).required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": `Phone number must have 10 digits and only numbers characters.`,
    })
    .required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().required(),
}).min(6);

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional().trim(),
  email: Joi.string().email().min(3).max(30).optional(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": `Phone number must have 10 digits and only numbers characters.`,
    })
    .optional(),
  subscription: Joi.string().optional(),
  password: Joi.string().optional(),
  token: Joi.string().optional(),
}).min(1);

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

module.exports.createContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.updateUpdate = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
