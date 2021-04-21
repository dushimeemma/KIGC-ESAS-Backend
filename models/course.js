const CourseModel = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      name: { type: DataTypes.STRING },
      start_date: { type: DataTypes.DATEONLY },
      end_date: { type: DataTypes.DATEONLY },
      session: { type: DataTypes.STRING },
      students_number: { type: DataTypes.INTEGER },
    },
    {}
  );
  Course.associate = (models) => {
    Course.hasMany(models.Student, { foreignKey: 'course' });
    Course.hasMany(models.AssignedCourse, { foreignKey: 'course_id' });
  };
  return Course;
};

export default CourseModel;
