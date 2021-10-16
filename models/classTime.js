module.exports = (sequelize, Sequelize) => {
  const ClassTime = sequelize.define(
    'classtime',
    {
      idClassTime: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idclasstime',
      },
      idClass: {
        type: Sequelize.INTEGER,
        field: 'idclass',
      },
      dayOfWeek: {
        type: Sequelize.INTEGER,
        field: 'dayofweek',
      },
      idTimeFrame: {
        type: Sequelize.INTEGER,
        field: 'idtimeframe',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return ClassTime;
};
