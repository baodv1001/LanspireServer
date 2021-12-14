module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    'Employee',
    {
      idEmployee: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idemployee',
      },
      idUser: {
        type: Sequelize.UUID,
        field: 'iduser',
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'isdeleted',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  Employee.associate = models => {
    Employee.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
  };

  return Employee;
};
