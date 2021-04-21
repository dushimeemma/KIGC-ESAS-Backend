import { Student, Course, AssignedCourse } from '../models';

class AssignedCourseController {
  async assign(req, res) {
    const { student_id, course_id } = req.body;
    const checkStudentExists = await Student.findOne({
      where: { id: student_id },
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
      student_id,
      course_id,
    };

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
}
export default AssignedCourseController;
