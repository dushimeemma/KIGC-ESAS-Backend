import Joi from '@hapi/joi';

export const validateAssignedRoom = (req, res, next) => {
  const schema = Joi.object({
    course_id: Joi.number().required().messages({
      'number.base': 'Course id must be number',
      'number.empty': 'Please fill the Course id',
      'any.required': 'Course id is required',
    }),
    room_id: Joi.number().required().messages({
      'number.base': 'Room id must be number',
      'number.empty': 'Please fill the Room id',
      'any.required': 'Room id is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
