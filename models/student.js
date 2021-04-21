const StudentModel = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      regNo: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      department: { type: DataTypes.STRING },
      level: { type: DataTypes.STRING },
      attendance: {
        type: DataTypes.INTEGER,
        references: { model: 'Attendance', key: 'id' },
      },
      finance: {
        type: DataTypes.INTEGER,
        references: { model: 'Finance', key: 'id' },
      },
      course: {
        type: DataTypes.INTEGER,
        references: { model: 'Course', key: 'id' },
      },
      seat: {
        type: DataTypes.INTEGER,
        references: { model: 'Seat', key: 'id' },
      },
      assigned_room: {
        type: DataTypes.INTEGER,
        references: { model: 'Room', key: 'id' },
      },
    },
    {}
  );
  Student.associate = (models) => {
    Student.belongsTo(models.Finance, {
      foreignKey: 'finance',
      onDelete: 'CASCADE',
    });
    Student.belongsTo(models.Attendance, {
      foreignKey: 'attendance',
      onDelete: 'CASCADE',
    });
    Student.belongsTo(models.Course, {
      foreignKey: 'course',
      onDelete: 'CASCADE',
    });
    Student.belongsTo(models.Seat, {
      foreignKey: 'seat',
      onDelete: 'CASCADE',
    });
    Student.belongsTo(models.Room, {
      foreignKey: 'assigned_room',
      onDelete: 'CASCADE',
    });
  };
  return Student;
};

export default StudentModel;
