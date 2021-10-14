module.exports = (sequelize, Sequelize) => {
  const BillInfo = sequelize.define(
    'billinfo',
    {
      idbill: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      idcourse: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      fee: {
        type: Sequelize.BIGINT,
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return BillInfo;
};
