import Joi from '@hapi/joi';

export const validateRole = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be string',
      'string.empty': 'Please fill the Name',
      'any.required': 'Name is required',
    }),
    description: Joi.string().required().messages({
      'string.base': 'Description must be string',
      'string.empty': 'Please fill the Description',
      'any.required': 'Description is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
