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
      idCourse: {
        type: Sequelize.UUID,
        field: 'idcourse',
      },
      room: {
        type: Sequelize.STRING,
        field: 'room',
      },
      idCenter: {
        type: Sequelize.UUID,
        field: 'idcenter',
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
    });
  };
  return Class;
};
