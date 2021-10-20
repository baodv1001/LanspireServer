module.exports = (sequelize, Sequelize) => {
  const Notifications = sequelize.define(
    'Notifications',
    {
      idNotification: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idnotification',
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        field: 'title',
      },
      content: {
        type: Sequelize.STRING,
        field: 'title',
      },
      createDate: {
        type: Sequelize.DATE,
        field: 'createdate',
      },
      toEmployee: {
        type: Sequelize.BOOLEAN,
        field: 'toemployee',
      },
      toLecturer: {
        type: Sequelize.BOOLEAN,
        field: 'tolecturer',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Notifications;
};
