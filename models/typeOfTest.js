module.exports = (sequelize, Sequelize) => {
  const TypeOfTest = sequelize.define(
    'TypeOfTest',
    {
      idTypeOfTest: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idtypeoftest',
      },
      nameOfType: {
        type: Sequelize.STRING,
        field: 'nameoftype',
        unique: true,
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  TypeOfTest.associate = models => {
    TypeOfTest.hasMany(models.Exam, {
      foreignKey: 'idTypeOfTest',
    });
  };
  return TypeOfTest;
};
