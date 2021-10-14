module.exports = (sequelize, Sequelize) => {
  const ClassTime = sequelize.define(
    'classtime',
    {
      idclasstime: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      idclass: {
        type: Sequelize.INTEGER,
      },
      dayofweek: {
        type: Sequelize.INTEGER,
      },
      starttime: {
        type: Sequelize.TIME,
      },
      endtime: {
        type: Sequelize.TIME,
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
