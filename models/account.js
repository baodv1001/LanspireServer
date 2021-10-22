module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define(
    'Account',
    {
      idAccount: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idaccount',
      },
      username: {
        type: Sequelize.STRING,
        field: 'username',
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        field: 'password',
      },
      idRole: {
        type: Sequelize.UUID,
        field: 'idrole',
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
  Account.associate = models => {
    Account.belongsTo(models.Role, {
      foreignKey: 'idRole',
    });
  };

  return Account;
};
