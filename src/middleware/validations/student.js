import Joi from '@hapi/joi';

export const validateStudent = (req, res, next) => {
  const schema = Joi.object({
    regNo: Joi.string().required().messages({
      'string.base': 'Registration number must be string',
      'string.empty': 'Please fill the Registration number',
      'any.required': 'Registration number is required',
    }),
    name: Joi.string().required().messages({
      'string.base': 'Name must be string',
      'string.empty': 'Please fill the Name',
      'any.required': 'Name is required',
    }),
    department: Joi.string().required().messages({
      'string.base': 'Department must be string',
      'string.empty': 'Please fill the Department',
      'any.required': 'Department is required',
    }),
    level: Joi.string().required().messages({
      'string.base': 'Level must be string',
      'string.empty': 'Please fill the Level',
      'any.required': 'Level is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
