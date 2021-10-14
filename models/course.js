module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define(
    'course',
    {
      idcourse: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nameofcourse: {
        type: Sequelize.STRING,
      },
      idlevel: {
        type: Sequelize.INTEGER,
      },
      startdate: {
        type: Sequelize.DATE,
      },
      enddate: {
        type: Sequelize.DATE,
      },
      fee: {
        type: Sequelize.BIGINT,
      },
      isdeleted: {
        type: Sequelize.BOOLEAN,
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
