module.exports = (sequelize, Sequelize) => {
  const Bill = sequelize.define(
    'Bill',
    {
      idBill: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idbill',
      },
      idAccount: {
        type: Sequelize.UUID,
        field: 'idaccount',
      },
      idStudent: {
        type: Sequelize.UUID,
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
    Bill.belongsTo(models.Student, {
      foreignKey: 'idStudent',
    });
  };
  return Bill;
};
