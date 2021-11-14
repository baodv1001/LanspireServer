module.exports = (sequelize, Sequelize) => {
  const Exam = sequelize.define(
    'Exam',
    {
      idExam: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
        type: Sequelize.UUID,
        field: 'idtypeoftest',
      },
      idColumn: {
        type: Sequelize.UUID,
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
  Exam.associate = models => {
    Exam.belongsTo(models.Column_Transcript, {
      foreignKey: 'idColumn',
      sourceKey: 'idExam',
      onDelete: 'CASCADE',
    });
    Exam.belongsTo(models.TypeOfTest, {
      foreignKey: 'idTypeOfTest',
      sourceKey: 'idExam',
      onDelete: 'CASCADE',
    });
    // Exam.belongsToMany(models.Class, {
    //   through: models.Learning,
    //   foreignKey: 'idExam',
    // });
    // Exam.belongsToMany(models.Student, {
    //   through: models.Learning,
    //   foreignKey: 'idExam',
    // });
    Exam.hasMany(models.Learning, {
      foreignKey: 'idExam',
      onDelete: 'SET NULL',
    });
  };
  return Exam;
};
