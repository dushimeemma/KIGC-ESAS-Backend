import { Room } from '../models';

class RoomController {
  async create(req, res) {
    const { name, capacity } = req.body;
    const newRoom = {
      name,
      capacity,
      status: 'unfilled',
    };

    const room = await Room.create(newRoom);

    res.status(200).json({
      message: 'Room created successfully',
      room,
    });
  }

  async getAll(req, res) {
    const rooms = await Room.findAll({});
    res.status(200).json({
      message: 'Retrieved successfully',
      rooms,
    });
  }

  async getOne(req, res) {
    const room = await Room.findOne({ where: { id: req.params.id } });
    if (!room) {
      return res.status(404).json({
        error: 'Room not found',
      });
    }
    res.status(200).json({
      message: 'Room retrieved successfully',
      room,
    });
  }

  async update(req, res) {
    const { name, capacity } = req.body;

    const findRoomToUpdate = await Room.findOne({
      where: { id: req.params.id },
    });

    if (!findRoomToUpdate) {
      return res.status(404).json({
        error: 'Room not found',
      });
    }

    const newRoom = {
      name,
      capacity,
    };

    const room = await Room.update(newRoom, {
      where: { id: req.params.id },
      returning: true,
    });

    res.status(200).json({
      message: 'Room updated successfully',
      room: room[1][0],
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const room = await Room.findOne({ where: { id } });

    if (!room) {
      return res.status(404).json({
        error: 'Room not found',
      });
    }

    await room.destroy();

    res.status(200).json({
      message: 'Room deleted successfully',
    });
  }

  async clearRooms(req, res) {
    await Room.destroy({ where: {}, truncate: true });
    res.status(200).json({
      message: 'Room cleared successfully',
    });
  }
}

export default RoomController;
