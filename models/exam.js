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
      examName: {
        type: Sequelize.STRING,
        field: 'examname',
      },
      fileUrl: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: 'fileurl',
      },
      postedDate: {
        type: Sequelize.DATE,
        field: 'posteddate',
      },
      testTime: {
        type: Sequelize.TIME,
        field: 'testtime',
      },
      testDate: {
        type: Sequelize.DATE,
        field: 'testdate',
      },
      idClass: {
        type: Sequelize.UUID,
        field: 'idclass',
      },
      idTestType: {
        type: Sequelize.UUID,
        field: 'idtesttype',
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
      as: 'Columns',
      foreignKey: 'idColumn',
      sourceKey: 'idExam',
      onDelete: 'CASCADE',
    });
    Exam.belongsTo(models.TestType, {
      foreignKey: 'idTestType',
      sourceKey: 'idExam',
      onDelete: 'CASCADE',
    });
    Exam.belongsTo(models.Class, {
      foreignKey: 'idClass',
    });
    Exam.belongsToMany(models.Student, {
      through: models.Testing,
      foreignKey: 'idExam',
    });
  };
  return Exam;
};
