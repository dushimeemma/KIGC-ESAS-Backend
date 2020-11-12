import { Attendance, Student } from '../models';

class AttendanceController {
  async record(req, res) {
    const { percentage } = req.body;
    let newAttendance;
    if (percentage >= 85) {
      newAttendance = {
        percentage,
        status: 'attended',
      };
    } else {
      newAttendance = {
        percentage,
        status: 'unattended',
      };
    }
    const attendance = await Attendance.create(newAttendance);
    const student = await Student.findOne({ where: { id: req.params.id } });
    if (!student)
      return res.status(404).json({
        status: 'failed',
        msg: 'Student not found',
      });
    const newStudent = {
      attendance: attendance.id,
    };
    const updateStudent = await Student.update(newStudent, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json({
      status: 'ok',
      msg: 'Attendance recorded success',
      attendance,
      student: updateStudent,
    });
  }
}
export default AttendanceController;
