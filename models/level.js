module.exports = (sequelize, Sequelize) => {
  const Level = sequelize.define(
    'Level',
    {
      idLevel: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idlevel',
      },
      idTypeOfCourse: {
        type: Sequelize.INTEGER,
        field: 'idtypeofcourse',
      },
      point: {
        type: Sequelize.INTEGER,
        field: 'point',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  return Level;
};
