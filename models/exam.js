module.exports = (sequelize, Sequelize) => {
  const Exam = sequelize.define(
    'exam',
    {
      idExam: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idexam',
      },
      nameOfExam: {
        type: Sequelize.STRING,
        field: 'nameofexam',
      },
      fileUrl: {
        type: Sequelize.STRING,
        field: 'fileurl',
      },
      postedDate: {
        type: Sequelize.DATE,
        field: 'posteddate',
      },
      idTypeOfTest: {
        type: Sequelize.INTEGER,
        field: 'idtypeoftest',
      },
      idColumn: {
        type: Sequelize.INTEGER,
        field: 'idcolumn',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Exam;
};
