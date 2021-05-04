import { Seat, Student, Course, Finance, Attendance, Room } from '../models';

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
          model: Room,
          attributes: ['name'],
        },
      ],
    });
    if (!student || !student.Course)
      return res.status(404).json({
        error: 'You did not register for any module',
      });

    const seat = {
      id: student.id,
      regNo: student.regNo,
      name: student.name,
      department: student.department,
      level: student.level,
      attendance: student.Attendance ? student.Attendance : 'not recorded',
      finance: student.Finance ? student.Finance : 'not recorded',
      course: student.Course ? student.Course.name : 'not recorded',
      room: student.Room ? student.Room.name : 'not recorded',
    };

    if (!student.Attendance) {
      return res.status(404).json({
        error: `Your attendance for ${seat.course} is not recorded please reach out to your department`,
      });
    }
    if (!student.Finance) {
      return res.status(404).json({
        error: `Your financial status for ${seat.course} is not recorded please reach out to finance`,
      });
    }
    if (seat.attendance.status === 'unattended')
      return res.status(400).json({
        error: `Your attendance is ${seat.attendance.percentage}%. Not allowed to attend ${seat.course} exam`,
      });
    if (seat.finance.status === 'unpaid')
      return res.status(400).json({
        error: `Your payment is ${seat.finance.amount}Rwfs. Not allowed to attend ${seat.course} exam`,
      });
    res.status(200).json({
      message: 'Seat retrieved success',
      seat,
    });
  }
}
export default seatController;
