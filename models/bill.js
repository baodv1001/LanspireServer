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
      idUser: {
        type: Sequelize.UUID,
        field: 'iduser',
      },
      idStudent: {
        type: Sequelize.UUID,
        field: 'idstudent',
      },
      createdDate: {
        type: Sequelize.DATEONLY,
        field: 'createddate',
      },
      totalFee: {
        type: Sequelize.BIGINT,
        field: 'totalfee',
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'isdeleted',
        defaultValue: false,
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
    Bill.belongsToMany(models.Class, {
      through: models.BillInfo,
      foreignKey: 'idBill',
      onDelete: 'CASCADE',
    });
    Bill.belongsTo(models.Student, {
      foreignKey: 'idStudent',
    });
    Bill.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
  };
  return Bill;
};
