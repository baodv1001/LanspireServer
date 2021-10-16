module.exports = (sequelize, Sequelize) => {
  const Bill = sequelize.define(
    'bill',
    {
      idBill: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idbill',
      },
      idAccount: {
        type: Sequelize.INTEGER,
        field: 'idaccount',
      },
      idStudent: {
        type: Sequelize.INTEGER,
        field: 'idstudent',
      },
      createdDate: {
        type: Sequelize.DATE,
        field: 'createddate',
      },
      totalFee: {
        type: Sequelize.BIGINT,
        field: 'totalfee',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Bill;
};
