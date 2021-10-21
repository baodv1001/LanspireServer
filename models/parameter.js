module.exports = (sequelize, Sequelize) => {
  const Parameter = sequelize.define(
    'Parameter',
    {
      idParameter: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idparameter',
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
      },
      value: {
        type: Sequelize.STRING,
        field: 'value',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Parameter;
};
