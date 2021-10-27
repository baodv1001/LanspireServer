module.exports = (sequelize, Sequelize) => {
  const Level = sequelize.define(
    'Level',
    {
      idLevel: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        field: 'idlevel',
      },
      levelName: {
        type: Sequelize.STRING,
        field: 'levelname',
      },
      point: {
        type: Sequelize.INTEGER,
        field: 'point',
      },
      language: {
        type: Sequelize.STRING,
        field: 'language',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  Level.associate = models => {
    Level.hasMany(models.Course, {
      foreignKey: 'idLevel',
    });
  };
  return Level;
};
