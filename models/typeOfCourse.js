module.exports = (sequelize, Sequelize) => {
  const TypeOfCourse = sequelize.define(
    'typeofcourse',
    {
      idtypeofcourse: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nameoftype: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return TypeOfCourse;
};
