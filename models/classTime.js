module.exports = (sequelize, Sequelize) => {
  const ClassTime = sequelize.define(
    'ClassTime',
    {
      idClassTime: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idclasstime',
      },
      idClass: {
        type: Sequelize.UUID,
        field: 'idclass',
      },
      dayOfWeek: {
        type: Sequelize.INTEGER,
        field: 'dayofweek',
      },
      idTimeFrame: {
        type: Sequelize.UUID,
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
  ClassTime.associate = function (models) {
    // associations can be defined here
    ClassTime.belongsToMany(models.Student, {
      through: models.Attendance,
      foreignKey: 'idClassTime',
      onDelete: 'SET NULL',
    });
    ClassTime.belongsTo(models.Class, {
      foreignKey: 'idClass',
      onDelete: 'SET NULL',
    });
    ClassTime.belongsTo(models.TimeFrame, {
      foreignKey: 'idTimeFrame',
      onDelete: 'SET NULL',
    });
  };
  return ClassTime;
};
