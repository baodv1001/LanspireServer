module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    'employee',
    {
      idEmployee: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idemployee',
      },
      idPersionalInfo: {
        type: Sequelize.INTEGER,
        field: 'idpersionalinfo',
      },
      idAccount: {
        type: Sequelize.INTEGER,
        field: 'idaccount',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Employee;
};
