module.exports = (sequelize, Sequelize) => {
  const Parameter = sequelize.define(
    'parameter',
    {
      idParameter: {
        type: Sequelize.INTEGER,
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
