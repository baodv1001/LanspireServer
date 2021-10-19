module.exports = (sequelize, Sequelize) => {
  const TypeOfTest = sequelize.define(
    'typeoftest',
    {
      idTypeOfTest: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idtypeoftest',
      },
      nameOfType: {
        type: Sequelize.STRING,
        field: 'nameoftype',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return TypeOfTest;
};
