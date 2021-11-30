module.exports = (sequelize, Sequelize) => {
  const TimeFrame = sequelize.define(
    'TimeFrame',
    {
      idTimeFrame: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      activate: {
        type: Sequelize.BOOLEAN,
        field: 'activate',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  TimeFrame.associate = function (models) {
    TimeFrame.belongsToMany(models.Class, {
      through: models.ClassTime,
      foreignKey: 'idTimeFrame',
    });
    TimeFrame.hasMany(models.ClassTime, {
      foreignKey: 'idTimeFrame',
      onDelete: 'SET NULL',
    });
  };
  return TimeFrame;
};
