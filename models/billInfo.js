const Bill = require('./bill');
const Course = require('./course');
module.exports = (sequelize, Sequelize) => {
  const BillInfo = sequelize.define(
    'BillInfo',
    {
      idBill: {
        type: Sequelize.INTEGER,
        field: 'idbill',
      },
      idCourse: {
        type: Sequelize.INTEGER,
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
  BillInfo.associate = function (models) {
    // associations can be defined here
  };
  return BillInfo;
};
