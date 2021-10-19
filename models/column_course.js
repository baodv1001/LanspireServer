module.exports = (sequelize, Sequelize) => {
  const Column_Course = sequelize.define(
    'column_course',
    {
      idColumn: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idcolumn',
      },
      idCourse: {
        type: Sequelize.INTEGER,
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

  return Column_Course;
};
