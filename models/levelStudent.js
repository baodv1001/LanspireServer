module.exports = (sequelize, Sequelize) => {
  const LevelStudent = sequelize.define(
    'levelstudent',
    {
      idStudent: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idstudent',
      },
      idLevel: {
        type: Sequelize.INTEGER,
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
