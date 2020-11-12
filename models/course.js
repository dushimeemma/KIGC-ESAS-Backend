const CourseModel = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      name: { type: DataTypes.STRING },
    },
    {}
  );
  Course.associate = (models) => {
    Course.hasMany(models.Student, { foreignKey: 'course' });
  };
  return Course;
};

export default CourseModel;
