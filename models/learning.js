module.exports = (sequelize, Sequelize) => {
  const Learning = sequelize.define(
    'Learning',
    {
      idStudent: {
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'idstudent',
      },
      idClass: {
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'idclass',
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
  Learning.associate = models => {
    Learning.belongsTo(models.Student, {
      foreignKey: 'idStudent',
    });
    Learning.belongsTo(models.Class, {
      foreignKey: 'idClass',
    });
    Learning.belongsTo(models.Exam, {
      foreignKey: 'idExam',
      onDelete: 'SET NULL',
    });
  };
  return Learning;
};
