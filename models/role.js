module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'role',
    {
      idRole: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'idrole',
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Role;
};
