module.exports = (sequelize, Sequelize) => {
  const Noti_Account = sequelize.define(
    'Noti_Account',
    {
      idNotification: {
        type: Sequelize.INTEGER,
        field: 'idnotification',
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

  return Noti_Account;
};
