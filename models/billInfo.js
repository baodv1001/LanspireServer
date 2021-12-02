module.exports = (sequelize, Sequelize) => {
  const BillInfo = sequelize.define(
    'BillInfo',
    {
      idBill: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idbill',
      },
      idClass: {
        type: Sequelize.UUID,
        field: 'idclass',
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
