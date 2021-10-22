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
      nameOfCourse: {
        type: Sequelize.STRING,
        field: 'nameofcourse',
      },
      idLevel: {
        type: Sequelize.UUID,
        field: 'idlevel',
      },
      idTypeOfCourse: {
        type: Sequelize.UUID,
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
    Course.belongsTo(models.TypeOfCourse, {
      foreignKey: 'idTypeOfCourse',
      sourceKey: 'idCourse',
      as: 'typeofcourse',
      onDelete: 'CASCADE',
    });
    Course.belongsToMany(models.Column_Transcript, {
      through: models.Column_Course,
      foreignKey: 'idCourse',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Course;
};
