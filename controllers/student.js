import { Student, Finance, Attendance, Course } from '../models';

class StudentController {
  async create(req, res) {
    const student = req.body;
    const checkExist = await Student.findOne({
      where: { regNo: student.regNo },
    });
    if (checkExist) {
      return res.status(400).json({
        status: 'failed',
        msg: 'Registration number already taken',
      });
    }
    const newStudent = await Student.create(student);
    res.status(200).json({
      status: 'ok',
      msg: 'Student successfully created',
      student: newStudent,
    });
  }
  async getAll(req, res) {
    const students = await Student.findAll({
      include: [
        {
          model: Finance,
          attributes: ['status', 'amount'],
        },
        {
          model: Attendance,
          attributes: ['status', 'percentage'],
        },
        {
          model: Course,
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json({
      status: 'ok',
      msg: 'Students retrieved successfully',
      students,
    });
  }
  async getOne(req, res) {
    const student = await Student.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Finance,
          attributes: ['status', 'amount'],
        },
        {
          model: Attendance,
          attributes: ['status', 'percentage'],
        },
        {
          model: Course,
          attributes: ['name'],
        },
      ],
    });
    if (!student) {
      return res.status(404).json({
        status: 'failed',
        msg: 'Student not found',
      });
    }
    res.status(200).json({
      status: 'ok',
      msg: 'Student retrieved successfully',
      student,
    });
  }
  async getDpt(req, res) {
    const { department, level } = req.body;
    const students = await Student.findAll({
      where: { department, level },
    });

    res.status(200).json({
      status: 'ok',
      msg: 'Students retrieved successfully',
      students,
    });
  }
  async update(req, res) {
    const updtStd = req.body;
    const student = await Student.findOne({ where: { id: req.params.id } });
    if (!student) {
      return res.status(404).json({
        status: 'failed',
        msg: 'Student not found',
      });
    }
    const newStudent = await Student.update(updtStd, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json({
      status: 'ok',
      msg: 'Student updated successfully',
      student: newStudent,
    });
  }
  async delete(req, res) {
    const student = await Student.findOne({ where: { id: req.params.id } });
    if (!student) {
      return res.status(404).json({
        status: 'failed',
        msg: 'Student not found',
      });
    }
    await student.destroy();
    res.status(200).json({
      status: 'ok',
      msg: 'Student deleted successfully',
    });
  }
}
export default StudentController;
