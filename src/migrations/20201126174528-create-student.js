module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      regNo: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      department: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.STRING,
      },
      attendance: {
        type: Sequelize.INTEGER,
      },
      finance: {
        type: Sequelize.INTEGER,
      },
      course: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  },
};
