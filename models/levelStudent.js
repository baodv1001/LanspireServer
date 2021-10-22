module.exports = (sequelize, Sequelize) => {
  const LevelStudent = sequelize.define(
    'LevelStudent',
    {
      idStudent: {
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'idstudent',
      },
      idLevel: {
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'idlevel',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return LevelStudent;
};
