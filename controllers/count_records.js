import { Student, Room, Course, AssignedCourse } from '../models';

class CountRecord {
  async countStudents(req, res) {
    const students = await Student.findAndCountAll();
    res.status(200).json({
      message: 'Number of students retrieved successfully',
      number: students.count,
    });
  }
  async countRooms(req, res) {
    const rooms = await Room.findAndCountAll();
    res.status(200).json({
      message: 'Number of rooms retrieved successfully',
      number: rooms.count,
    });
  }
  async countCourses(req, res) {
    const courses = await Course.findAndCountAll();
    res.status(200).json({
      message: 'Number of courses retrieved successfully',
      number: courses.count,
    });
  }
  async countAssignedCourses(req, res) {
    const assigned_courses = await AssignedCourse.findAndCountAll();
    res.status(200).json({
      message: 'Number of assigned rooms retrieved successfully',
      number: assigned_courses.count,
    });
  }
}
export default CountRecord;
