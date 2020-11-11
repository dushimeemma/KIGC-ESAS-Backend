const LogoutModel = (sequelize, DataTypes) => {
  const Logout = sequelize.define(
    'Logout',
    {
      token: { type: DataTypes.STRING },
    },
    {}
  );
  Logout.associate = (models) => {};
  return Logout;
};

export default LogoutModel;
