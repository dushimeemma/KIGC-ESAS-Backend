import Joi from '@hapi/joi';

export const validateAssignedCourse = (req, res, next) => {
  const schema = Joi.object({
    student_reg: Joi.string().required().messages({
      'string.base': 'Student reg number must be number',
      'string.empty': 'Please fill the Student reg number',
      'any.required': 'Student reg number is required',
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

export const validateAssignedCourseByClass = (req, res, next) => {
  const schema = Joi.object({
    course: Joi.number().required().messages({
      'number.base': 'Course must be string',
      'number.empty': 'Please fill the Course',
      'any.required': 'Course is required',
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
