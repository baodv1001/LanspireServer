module.exports = (sequelize, Sequelize) => {
  const Teaching = sequelize.define(
    'Teaching',
    {
      idLecturer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idlecturer',
      },
      idClass: {
        type: Sequelize.INTEGER,
        field: 'idclass',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  return Teaching;
};
