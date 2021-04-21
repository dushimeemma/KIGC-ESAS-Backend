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
}

export default RoomController;
