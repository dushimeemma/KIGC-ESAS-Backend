const SeatModel = (sequelize, DataTypes) => {
  const Seat = sequelize.define(
    'Seat',
    {
      room: { type: DataTypes.STRING },
      seatNumber: { type: DataTypes.STRING },
    },
    {}
  );
  Seat.associate = (models) => {
    Seat.hasMany(models.Student, { foreignKey: 'seat' });
  };
  return Seat;
};

export default SeatModel;
