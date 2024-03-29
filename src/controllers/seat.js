import { Seat, Student, Course, Finance, Attendance } from '../models';

class seatController {
  async assign(req, res) {
    const { room, seat } = req.body;
    let newSeat;
    let newStudent;
    const student = await Student.findOne({ where: { id: req.params.id } });
    if (!student)
      return res.status(404).json({
        status: 'failed',
        msg: 'Student not found',
      });
    const checkSeat = await Seat.findOne({ where: { room, seatNumber: seat } });

    if (!checkSeat) {
      newSeat = await Seat.create({ room, seatNumber: seat });
    } else {
      newSeat = {
        id: checkSeat.id,
        room: checkSeat.room,
        seatNumber: checkSeat.seatNumber,
        updatedAt: checkSeat.updatedAt,
        createdAt: checkSeat.createdAt,
      };
    }

    const checkStudent = await Student.findOne({ where: { seat: newSeat.id } });
    if (checkStudent) {
      res.status(400).json({
        status: 'ok',
        msg: 'Seat already taken by another student',
      });
    } else {
      newStudent = await Student.update(
        { seat: newSeat.id },
        {
          where: { id: req.params.id },
          returning: true,
        }
      );
      res.status(200).json({
        status: 'ok',
        msg: 'Seat assigned success',
        seat: newSeat,
        student: newStudent,
      });
    }
  }
  async view(req, res) {
    const { reg } = req.body;
    const student = await Student.findOne({
      where: { regNo: reg },
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
        {
          model: Seat,
          attributes: ['room', 'seatNumber'],
        },
      ],
    });
    if (!student)
      return res.status(404).json({
        status: 'failed',
        msg: 'You did not register for any module',
      });
    const seat = {
      id: student.id,
      regNo: student.regNo,
      name: student.name,
      department: student.department,
      level: student.level,
      attendance: student.Attendance,
      finance: student.Finance,
      course: student.Course,
      seat: student.Seat,
    };
    if (seat.attendance.status === 'unattended')
      return res.status(400).json({
        status: 'failed',
        msg: `Your attendance is ${seat.attendance.percentage}%. Not allowed to attend ${seat.course.name} exam`,
      });
    if (seat.finance.status === 'unpaid')
      return res.status(400).json({
        status: 'failed',
        msg: `Your payment is ${seat.finance.amount}Rwfs. Not allowed to attend ${seat.course.name} exam`,
      });
    res.status(200).json({
      status: 'ok',
      msg: 'Seat retrieved success',
      seat,
    });
  }
}
export default seatController;
