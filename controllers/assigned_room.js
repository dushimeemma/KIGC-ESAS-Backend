import { Room, Course, Student } from '../models';

class AssignedRoomController {
  async assign(req, res) {
    const { course_id, room_id } = req.body;

    const checkRoomExists = await Room.findOne({ where: { id: room_id } });

    if (!checkRoomExists) {
      return res.status(400).json({
        error: "Room doesn't exists",
      });
    }

    const checkCourseExists = await Course.findOne({
      where: { id: course_id },
    });

    if (!checkCourseExists) {
      return res.status(400).json({
        error: "Course doesn't exists",
      });
    }

    const students = await Student.findAll({
      where: { course: course_id, assigned_room: null },
    });
    if (!students.length) {
      return res.status(400).json({
        error: `All Students in ${checkCourseExists.name} Have Rooms`,
      });
    }

    let students_number = checkCourseExists.students_number;
    let room_capacity = checkRoomExists.capacity;

    if (students_number > parseInt((1 / 2) * room_capacity)) {
      students_number = parseInt(students_number - (1 / 2) * room_capacity);
      room_capacity = parseInt((1 / 2) * room_capacity);
      if (room_capacity === 0) {
        await Room.update({ status: 'filled' }, { where: { id: room_id } });
      }
      await Room.update(
        { capacity: room_capacity },
        { where: { id: room_id } }
      );
      await Course.update({ students_number }, { where: { id: course_id } });
      for (let i = 0; i < room_capacity; i++) {
        await students[i].update(
          { assigned_room: room_id },
          { where: { course: course_id, assigned_room: null } }
        );
      }
      return res.status(200).json({
        message: `remains ${students_number} students in ${checkCourseExists.name} assign them to another room please`,
      });
    } else if (students_number < parseInt((1 / 2) * room_capacity)) {
      room_capacity =
        parseInt((1 / 2) * room_capacity) -
        students_number +
        parseInt((1 / 2) * room_capacity);
      if (room_capacity === 0) {
        await Room.update({ status: 'filled' }, { where: { id: room_id } });
      }
      await Room.update(
        { capacity: room_capacity },
        { where: { id: room_id } }
      );
      await Course.update({ students_number: 0 }, { where: { id: course_id } });
      const students = await Student.findAll({
        where: { course: course_id, assigned_room: null },
      });

      for (let i = 0; i < students.length; i++) {
        await students[i].update(
          { assigned_room: room_id },
          { where: { course: course_id, assigned_room: null } }
        );
      }
      return res.status(200).json({
        message: `All Students in ${checkCourseExists.name} Got Rooms`,
      });
    } else if (students_number === parseInt((1 / 2) * room_capacity)) {
      room_capacity = parseInt((1 / 2) * room_capacity);
      if (room_capacity === 0) {
        await Room.update({ status: 'filled' }, { where: { id: room_id } });
      }
      await Room.update(
        { capacity: room_capacity },
        { where: { id: room_id } }
      );
      await Course.update({ students_number: 0 }, { where: { id: course_id } });

      for (let i = 0; i < students.length; i++) {
        await students[i].update(
          { assigned_room: room_id },
          { where: { course: course_id, assigned_room: null } }
        );
      }
      return res.status(200).json({
        message: `All Students in ${checkCourseExists.name} Got Rooms`,
      });
    } else if (room_capacity === 0 || checkRoomExists.status === 'filled') {
      await Room.update({ status: 'filled' }, { where: { id: room_id } });
      return res.status(400).json({
        error: 'Room is full',
      });
    }
  }
}
export default AssignedRoomController;
