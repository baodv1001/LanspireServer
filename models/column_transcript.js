module.exports = (sequelize, Sequelize) => {
  //Cột điểm
  const Column_Transcript = sequelize.define(
    'column_transcript',
    {
      idColumn: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcolumn',
      },
      nameOfColumn: {
        type: Sequelize.STRING,
        field: 'nameofcolumn',
      },
      min: {
        type: Sequelize.FLOAT,
        field: 'min',
      },
      max: {
        type: Sequelize.FLOAT,
        field: 'max',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );

  return Column_Transcript;
};
