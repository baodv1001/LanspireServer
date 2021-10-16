module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define(
    'course',
    {
      idCourse: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idcourse',
      },
      nameOfCourse: {
        type: Sequelize.STRING,
        field: 'nameofcourse',
      },
      idLevel: {
        type: Sequelize.INTEGER,
        field: 'idlevel',
      },
      idTypeOfCourse: {
        type: Sequelize.INTEGER,
        field: 'idtypeofcourse',
      },
      startDate: {
        type: Sequelize.DATE,
        field: 'startdate',
      },
      endDate: {
        type: Sequelize.DATE,
        field: 'enddate',
      },
      fee: {
        type: Sequelize.BIGINT,
        field: 'fee',
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'isdeleted',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Course;
};
