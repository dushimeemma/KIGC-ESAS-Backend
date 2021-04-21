const AssignedCourseModel = (sequelize, DataTypes) => {
  const AssignedCourse = sequelize.define(
    'AssignedCourse',
    {
      student_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Student', key: 'id' },
      },
      course_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Course', key: 'id' },
      },
    },
    {}
  );
  AssignedCourse.associate = (models) => {
    AssignedCourse.belongsTo(models.Student, {
      foreignKey: 'student_id',
      onDelete: 'CASCADE',
    });
    AssignedCourse.belongsTo(models.Course, {
      foreignKey: 'course_id',
      onDelete: 'CASCADE',
    });
  };
  return AssignedCourse;
};

export default AssignedCourseModel;
