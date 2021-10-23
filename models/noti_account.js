module.exports = (sequelize, Sequelize) => {
  const Noti_Account = sequelize.define(
    'Noti_Account',
    {
      idNotification: {
        type: Sequelize.UUID,
        field: 'idnotification',
      },
      idAccount: {
        type: Sequelize.UUID,
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

  return Noti_Account;
};
