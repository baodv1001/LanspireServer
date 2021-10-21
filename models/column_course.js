const Column_Transcript = require('./column_transcript.js');
const Course = require('./course.js');

module.exports = (sequelize, Sequelize) => {
  const Column_Course = sequelize.define(
    'Column_Course',
    {
      idColumn: {
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'idcolumn',
      },
      idCourse: {
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'idcourse',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  Column_Course.associate = models => {};
  return Column_Course;
};
