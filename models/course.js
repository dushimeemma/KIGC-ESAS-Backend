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
  };
  return Course;
};

export default CourseModel;
