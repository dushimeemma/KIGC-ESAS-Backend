import Joi from '@hapi/joi';

export const validateRoom = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be string',
      'string.empty': 'Please fill the Name',
      'any.required': 'Name is required',
    }),
    capacity: Joi.number().required().messages({
      'number.base': 'Capacity must be number',
      'number.empty': 'Please fill the Capacity',
      'any.required': 'Capacity is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
