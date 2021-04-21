const RoomModel = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      name: { type: DataTypes.STRING },
      capacity: { type: DataTypes.INTEGER },
      status: { type: DataTypes.STRING },
    },
    {}
  );
  Room.associate = (models) => {
    Room.hasMany(models.Student, { foreignKey: 'assigned_room' });
  };
  return Room;
};

export default RoomModel;
