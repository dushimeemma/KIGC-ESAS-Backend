import Joi from '@hapi/joi';

export const seatValidation = (req, res, next) => {
  const schema = Joi.object({
    room: Joi.string().required().messages({
      'string.base': 'Room must be string',
      'string.empty': 'Please fill the Room',
      'any.required': 'Room is required',
    }),
    seat: Joi.string().required().messages({
      'string.base': 'Seat must be string',
      'string.empty': 'Please fill the Seat',
      'any.required': 'Seat is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
