const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().trim(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": `Phone number must have 10 digits and only numbers characters.`,
    })
    .required(),
}).min(2);

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional().trim(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": `Phone number must have 10 digits and only numbers characters.`,
    })
    .optional(),
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

module.exports.update = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
