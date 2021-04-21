import Joi from '@hapi/joi';

export const validateAssignedCourse = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.number().required().messages({
      'number.base': 'Student id must be number',
      'number.empty': 'Please fill the Student id',
      'any.required': 'Student id is required',
    }),
    course_id: Joi.number().required().messages({
      'number.base': 'Course id must be number',
      'number.empty': 'Please fill the Course id',
      'any.required': 'Course id is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
