module.exports = (sequelize, Sequelize) => {
  const TimeFrame = sequelize.define(
    'timeframe',
    {
      idTimeFrame: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idtimeframe',
      },
      startingTime: {
        type: Sequelize.TIME,
        field: 'startingtime',
      },
      endingTime: {
        type: Sequelize.TIME,
        field: 'endingtime',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return TimeFrame;
};
