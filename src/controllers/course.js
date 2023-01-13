import { Course, Student } from '../models';

class CourseController {
  async getAll(req, res) {
    const courses = await Course.findAll();
    res.status(200).json({
      status: 'ok',
      msg: 'Courses retrieved success',
      courses,
    });
  }
  async record(req, res) {
    const { name } = req.body;
    let newCourse;
    let newStudent;
    const checkCourse = await Course.findOne({ where: { name } });
    const checkStudent = await Student.findOne({
      where: { id: req.params.id },
    });
    if (!checkStudent)
      return res.status(404).json({
        status: 'failed',
        msg: 'Student not found',
      });
    if (!checkCourse) {
      newCourse = await Course.create({ name });
      newStudent = await Student.update(
        { course: newCourse.id },
        {
          where: { id: req.params.id },
          returning: true,
        }
      );
    }
    newStudent = await Student.update(
      { course: checkCourse.id },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).json({
      status: 'ok',
      msg: 'Course assigned success',
      name,
      student: newStudent,
    });
  }
}
export default CourseController;
