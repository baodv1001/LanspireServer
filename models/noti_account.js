module.exports = (sequelize, Sequelize) => {
  const Noti_Account = sequelize.define(
    'Noti_Account',
    {
      idNotification: {
        type: Sequelize.UUID,
        field: 'idnotification',
      },
      idUser: {
        type: Sequelize.UUID,
        field: 'iduser',
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
