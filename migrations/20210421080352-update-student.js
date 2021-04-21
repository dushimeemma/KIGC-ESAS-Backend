module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'assigned_room', {
      type: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'assigned_room', {
      type: Sequelize.INTEGER,
    });
  },
};
