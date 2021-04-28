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

    const room_capacity = checkRoomExists.capacity / 2;

    const un_assigned_students = await Student.findAll({
      where: { course: course_id, assigned_room: null },
    });

    let un_updated_students;
    let student_to_update;
    let check_students_to_update;

    if (un_assigned_students.length === 0) {
      return res.status(400).json({
        error: 'All Students Have Rooms',
      });
    }

    if (checkRoomExists.status === 'filled') {
      return res.status(400).json({
        error: 'The Room is Full',
      });
    }

    if (room_capacity > un_assigned_students.length) {
      un_updated_students = room_capacity - un_assigned_students.length;
      if (un_updated_students === 0) {
        await Room.update({ status: 'filled' }, { where: { id: course_id } });
      }
      student_to_update = room_capacity - un_updated_students;
      check_students_to_update = await Student.findAll({
        limit: student_to_update,
        where: { course: course_id, assigned_room: null },
      });

      for (let i = 0; i < check_students_to_update.length; i++) {
        await check_students_to_update[i].update(
          { assigned_room: room_id },
          { where: { course: course_id, assigned_room: null } }
        );
      }

      const capacity = parseInt(room_capacity + student_to_update);

      await Room.update({ capacity }, { where: { id: room_id } });

      return res.status(200).json({
        message: 'Room assigned successfully',
      });
    }
  }
}
export default AssignedRoomController;
