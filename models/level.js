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
      idTypeOfCourse: {
        type: Sequelize.UUID,
        field: 'idtypeofcourse',
      },
      point: {
        type: Sequelize.FLOAT,
        field: 'point',
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
    Level.belongsToMany(models.Lecturer, {
      through: models.LevelLecturer,
      foreignKey: 'idLevel',
      onDelete: 'SET NULL',
    });
    Level.belongsToMany(models.Student, {
      through: models.LevelStudent,
      foreignKey: 'idLevel',
      onDelete: 'SET NULL',
    });
    Level.hasMany(models.Course, {
      foreignKey: 'idLevel',
    });
    Level.belongsTo(models.CourseType, {
      foreignKey: 'idCourseType',
    });
  };
  return Level;
};
