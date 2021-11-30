module.exports = (sequelize, Sequelize) => {
  const TestType = sequelize.define(
    'TestType',
    {
      idTestType: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idtesttype',
      },
      typeName: {
        type: Sequelize.STRING,
        field: 'typename',
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

  TestType.associate = models => {
    TestType.hasMany(models.Exam, {
      foreignKey: 'idTestType',
    });
  };
  return TestType;
};
