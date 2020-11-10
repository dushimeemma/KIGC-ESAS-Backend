import Joi from '@hapi/joi';

export const signup = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be string',
      'string.empty': 'Please fill the Name',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email should look like example@example.com',
      'any.required': 'Please fill the email',
      'string.empty': 'Email field can not be empty',
    }),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/^[a-z]{4,}\d+/i)
      .messages({
        'string.base': 'Password must be string',
        'string.empty': 'Please fill in your Password',
        'string.min': 'Password must be atleast {#limit} characters long',
        'any.required': 'Password is required',
        'string.pattern.base':
          'Password must be at least 5 characters including 4 letters and numbers',
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
