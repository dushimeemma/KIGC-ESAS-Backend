const FinanceModel = (sequelize, DataTypes) => {
  const Finance = sequelize.define(
    'Finance',
    {
      status: { type: DataTypes.STRING },
      amount: { type: DataTypes.INTEGER },
    },
    {}
  );
  Finance.associate = (models) => {
    Finance.hasMany(models.Student, { foreignKey: 'finance' });
  };
  return Finance;
};

export default FinanceModel;
