module.exports = (sequelize, Sequelize) => {
  const BillInfo = sequelize.define(
    'billinfo',
    {
      idBill: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idbill',
      },
      idCourse: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idcourse',
      },
      fee: {
        type: Sequelize.BIGINT,
        field: 'fee',
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
