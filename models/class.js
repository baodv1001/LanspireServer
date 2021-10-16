module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define(
    'class',
    {
      idClass: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idclass',
      },
      idCourse: {
        type: Sequelize.INTEGER,
        field: 'idcourse',
      },
      room: {
        type: Sequelize.STRING,
        field: 'room',
      },
      idCenter: {
        type: Sequelize.INTEGER,
        field: 'idcenter',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Class;
};
