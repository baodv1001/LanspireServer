module.exports = (sequelize, Sequelize) => {
  const CourseType = sequelize.define(
    'CourseType',
    {
      idCourseType: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idcoursetype',
      },
      typeName: {
        type: Sequelize.STRING,
        field: 'typename',
      },
      description: {
        type: Sequelize.STRING,
        field: 'description',
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
  CourseType.associate = function (models) {
    CourseType.hasMany(models.Course, {
      foreignKey: 'idCourseType',
    });
  };
  return CourseType;
};
