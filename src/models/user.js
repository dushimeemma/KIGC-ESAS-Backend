const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      role: {
        type: DataTypes.INTEGER,
        references: { model: 'Role', key: 'id' },
      },
    },
    {}
  );
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: 'role',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

export default UserModel;
