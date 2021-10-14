module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define(
    'class',
    {
      idclass: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      idcourse: {
        type: Sequelize.INTEGER,
      },
      room: {
        type: Sequelize.STRING,
      },
      idcenter: {
        type: Sequelize.INTEGER,
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
