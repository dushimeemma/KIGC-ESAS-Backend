import Joi from '@hapi/joi';

export const validateCourse = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be string',
      'string.empty': 'Please fill the Name',
      'any.required': 'Name is required',
    }),
    start_date: Joi.date().iso().required().messages({
      'date.base': 'Start Date must be of type date',
      'date.empty': 'Please fill the Start Date',
      'any.required': 'Start Date is required',
    }),
    end_date: Joi.date()
      .iso()
      .greater(Joi.ref('start_date'))
      .required()
      .messages({
        'date.base': 'Start Date must be of type date',
        'date.empty': 'Please fill the Start Date',
        'any.required': 'Start Date is required',
      }),
    session: Joi.string().required().messages({
      'string.base': 'Session must be string',
      'string.empty': 'Please fill the Session',
      'any.required': 'Session is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
