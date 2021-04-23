import { Student, Course, AssignedCourse } from '../models';

class AssignedCourseController {
  async assign(req, res) {
    const { student_reg, course_id } = req.body;
    const checkStudentExists = await Student.findOne({
      where: { regNo: student_reg },
    });
    if (!checkStudentExists) {
      return res.status(400).json({
        error: "Student doesn't exits",
      });
    }
    const checkCourseExists = await Course.findOne({
      where: { id: course_id },
    });
    if (!checkCourseExists) {
      return res.status(400).json({
        error: "Course doesn't exits",
      });
    }
    const newAssignedCourse = {
      student_id: checkStudentExists.id,
      course_id,
    };

    const checkCourses = await Course.findOne({ where: { id: course_id } });
    const students_number = checkCourses.students_number + 1;
    const update_students_number = await Course.update(
      { students_number },
      { where: { id: course_id }, returning: true }
    );
    const update_student_course = await Student.update(
      { course: course_id },
      { where: { id: newAssignedCourse.student_id }, returning: true }
    );
    const assigned_course = await AssignedCourse.create(newAssignedCourse);

    res.status(200).json({
      message: 'Course assigned successfully',
      assigned_course,
    });
  }

  async getAll(req, res) {
    const assigned_courses = await AssignedCourse.findAll({
      include: [
        {
          model: Student,
        },
        {
          model: Course,
        },
      ],
    });
    res.status(200).json({
      message: 'Assigned Courses Retrieved successfully',
      assigned_courses,
    });
  }

  async getOneByCourseId(req, res) {
    const assigned_course = await AssignedCourse.findAll({
      where: { course_id: req.params.id },
      include: [
        {
          model: Student,
        },
        {
          model: Course,
        },
      ],
    });
    if (!assigned_course) {
      return res.status(400).json({
        error: 'Record not found',
      });
    }
    res.status(200).json({
      message: 'Assigned Courses Retrieved successfully',
      assigned_course,
    });
  }
}
export default AssignedCourseController;
