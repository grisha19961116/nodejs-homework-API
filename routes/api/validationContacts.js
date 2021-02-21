const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().trim(),
  email: Joi.string().email().min(3).max(20).required(),
  phone: Joi.number().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional().trim(),
  email: Joi.string().email().min(3).max(20).optional(),
  phone: Joi.number().optional(),
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
