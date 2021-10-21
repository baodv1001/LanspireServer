module.exports = (sequelize, Sequelize) => {
  const TypeOfCourse = sequelize.define(
    'TypeOfCourse',
    {
      idTypeOfCourse: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  TypeOfCourse.associate = function (models) {
    TypeOfCourse.hasMany(models.Course, {
      foreignKey: 'idTypeOfCourse',
      as: 'course',
    });
  };
  return TypeOfCourse;
};
