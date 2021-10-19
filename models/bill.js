module.exports = (sequelize, Sequelize) => {
  const Bill = sequelize.define(
    'Bill',
    {
      idBill: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idbill',
        autoIncrement: true,
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
  Bill.associate = function (models) {
    Bill.belongsToMany(models.Course, {
      through: models.BillInfo,
      as: 'course',
      foreignKey: 'idBill',
      onDelete: 'CASCADE',
    });
  };
  return Bill;
};
