import { Course, Student } from '../models';

class CourseController {
  async getAll(req, res) {
    const courses = await Course.findAll();
    res.status(200).json({
      status: 'ok',
      message: 'Courses retrieved success',
      courses,
    });
  }
  async getOne(req, res) {
    const course = await Course.findOne({ where: { id: req.params.id } });
    if (!course) {
      return res.status(400).json({
        error: 'Course not found',
      });
    }
    res.status(200).json({
      status: 'ok',
      message: 'Courses retrieved success',
      course,
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

  async create(req, res) {
    const { name, start_date, end_date, session } = req.body;
    const newCourse = {
      name,
      start_date,
      end_date,
      session,
      students_number: 0,
    };
    const newModule = await Course.create(newCourse);
    res.status(200).json({
      message: 'Module created successfully',
      module: newModule,
    });
  }

  async clearCourses(req, res) {
    await Course.destroy({ where: {}, truncate: true });
    res.status(200).json({
      message: 'Course cleared successfully',
    });
  }
}
export default CourseController;
