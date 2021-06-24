const Joi = require("joi");

const validate = require("./validate");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).trim().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": `Phone number must have 10 digits and only numbers characters.`,
    })
    .required(),
  subscription: Joi.string().optional(),
}).min(3);

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional().trim().optional(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": `Phone number must have 10 digits and only numbers characters.`,
    })
    .optional(),
  subscription: Joi.string().optional(),
}).min(1);

module.exports.createContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.update = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
