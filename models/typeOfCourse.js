module.exports = (sequelize, Sequelize) => {
  const TypeOfCourse = sequelize.define(
    'typeofcourse',
    {
      idtypeofcourse: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idtypeofcourse',
      },
      nameOfType: {
        type: Sequelize.STRING,
        field: 'nameoftype',
      },
      language: {
        type: Sequelize.STRING,
        field: 'language',
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        field: 'tags',
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

  return TypeOfCourse;
};
