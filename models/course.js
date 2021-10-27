module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define(
    'Course',
    {
      idCourse: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idcourse',
      },
      courseName: {
        type: Sequelize.STRING,
        field: 'coursename',
      },
      fee: {
        type: Sequelize.BIGINT,
        field: 'fee',
      },
      description: {
        type: Sequelize.STRING,
        field: 'description',
      },
      idLevel: {
        type: Sequelize.UUID,
        field: 'idlevel',
      },
      idCourseType: {
        type: Sequelize.UUID,
        field: 'idcoursetype',
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
  Course.associate = function (models) {
    Course.belongsToMany(models.Bill, {
      through: models.BillInfo,
      as: 'bill',
      foreignKey: 'idCourse',
      onDelete: 'CASCADE',
    });
    Course.belongsTo(models.CourseType, {
      foreignKey: 'idCourseType',
    });
    Course.belongsToMany(models.Column_Transcript, {
      through: models.Column_Course,
      foreignKey: 'idCourse',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Course.belongsTo(models.Level, {
      foreignKey: 'idLevel',
    });
  };
  return Course;
};
