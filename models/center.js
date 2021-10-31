module.exports = (sequelize, Sequelize) => {
  const Center = sequelize.define(
    'Center',
    {
      idCenter: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idcenter',
      },
      centerName: {
        type: Sequelize.STRING,
        field: 'centername',
      },
      address: {
        type: Sequelize.STRING,
        field: 'address',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  Center.associate = models => {
    Center.hasMany(models.Class, {
      foreignKey: 'idCenter',
    });
  };

  return Center;
};
