module.exports = (sequelize, Sequelize) => {
  const Teaching = sequelize.define(
    'Teaching',
    {
      idLecturer: {
        type: Sequelize.UUID,
        primaryKey: true,
        field: 'idlecturer',
      },
      idClass: {
        type: Sequelize.UUID,
        primaryKey: true,
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
