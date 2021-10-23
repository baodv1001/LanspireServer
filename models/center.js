module.exports = (sequelize, Sequelize) => {
  const Center = sequelize.define(
    'Center',
    {
      idCenter: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcenter',
      },
      nameOfCenter: {
        type: Sequelize.STRING,
        field: 'nameofcenter',
      },
      location: {
        type: Sequelize.STRING,
        field: 'location',
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
    Center.hasMany(models.Class);
  };

  return Center;
};
