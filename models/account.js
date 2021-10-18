module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define(
    'account',
    {
      idAccount: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idaccount',
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        field: 'username',
      },
      password: {
        type: Sequelize.STRING,
        field: 'password',
      },
      idRole: {
        type: Sequelize.INTEGER,
        field: 'idrole',
      },
      isDeleted: {
        type: Sequelize.Boolean,
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

  return Account;
};
