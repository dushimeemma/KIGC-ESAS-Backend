const AttendanceModel = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    'Attendance',
    {
      status: { type: DataTypes.STRING },
      percentage: { type: DataTypes.INTEGER },
    },
    {}
  );
  Attendance.associate = (models) => {
    Attendance.hasMany(models.Student, { foreignKey: 'attendance' });
  };
  return Attendance;
};

export default AttendanceModel;
