module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'Role',
    {
      idRole: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
  Role.associate = models => {
    Role.hasMany(models.Account, {
      foreignKey: 'idRole',
    });
  };

  return Role;
};
