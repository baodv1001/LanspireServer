module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define(
    'Class',
    {
      idClass: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idclass',
      },
      className: {
        type: Sequelize.STRING,
        field: 'classname',
      },
      idCourse: {
        type: Sequelize.UUID,
        field: 'idcourse',
      },
      room: {
        type: Sequelize.STRING,
        field: 'room',
      },
      // idCenter: {
      //   type: Sequelize.UUID,
      //   field: 'idcenter',
      // },
      startDate: {
        type: Sequelize.DATE,
        field: 'startdate',
      },
      endDate: {
        type: Sequelize.DATE,
        field: 'enddate',
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
  Class.associate = function (models) {
    Class.belongsToMany(models.TimeFrame, {
      through: models.ClassTime,
      as: 'timeFrame',
      foreignKey: 'idClass',
      onDelete: 'SET NULL',
    });
    // Class.belongsToMany(models.Student, {
    //   through: models.Learning,
    //   foreignKey: 'idClass',
    //   onDelete: 'SET NULL',
    // });
    Class.belongsToMany(models.Lecturer, {
      through: models.Teaching,
      foreignKey: 'idClass',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Class.hasMany(models.Learning, {
      foreignKey: 'idClass',
      onDelete: 'SET NULL',
    });
    Class.hasMany(models.ClassTime, {
      foreignKey: 'idClass',
      onDelete: 'SET NULL',
    });

    Class.belongsTo(models.Course, {
      foreignKey: 'idCourse',
      onDelete: 'SET NULL',
    });

    // Class.belongsTo(models.Center, {
    //   foreignKey: 'idCenter',
    // });
  };
  return Class;
};
