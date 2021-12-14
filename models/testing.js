module.exports = (sequelize, Sequelize) => {
  const Testing = sequelize.define(
    'Testing',
    {
      idStudent: {
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'idstudent',
      },
      idExam: {
        type: Sequelize.UUID,
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
  return Testing;
};
