module.exports = (sequelize, Sequelize) => {
  const Learning = sequelize.define(
    'learning',
    {
      idStudent: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idstudent',
      },
      idClass: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idclass',
      },
      idExam: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idexam',
      },
      score: {
        type: Sequelize.FLOAT,
        field: 'score',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Learning;
};
