module.exports = (sequelize, Sequelize) => {
  //Cột điểm
  const Column_Transcript = sequelize.define(
    'Column_Transcript',
    {
      idColumn: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idcolumn',
      },
      columnName: {
        type: Sequelize.STRING,
        field: 'columnname',
        unique: true,
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

  Column_Transcript.associate = models => {
    Column_Transcript.belongsToMany(models.Course, {
      through: models.Column_Course,
      foreignKey: 'idColumn',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Column_Transcript.hasOne(models.Exam, {
      foreignKey: 'idColumn',
      onDelete: 'CASCADE',
    });
  };
  return Column_Transcript;
};
