const RoleModel = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
    },
    {}
  );
  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: 'role' });
  };
  return Role;
};

export default RoleModel;
