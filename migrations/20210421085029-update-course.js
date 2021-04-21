module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Courses', 'start_date', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.addColumn('Courses', 'end_date', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.addColumn('Courses', 'session', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Courses', 'students_number', {
      type: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Courses', 'start_date', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.removeColumn('Courses', 'end_date', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.removeColumn('Courses', 'session', {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn('Courses', 'students_number', {
      type: Sequelize.INTEGER,
    });
  },
};
