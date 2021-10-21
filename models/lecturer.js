module.exports = (sequelize, Sequelize) => {
  const Lecturer = sequelize.define(
    'Lecturer',
    {
      idLecturer: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        field: 'idlecturer',
      },
      idUser: {
        type: Sequelize.UUID,
        field: 'iduser',
      },
      idAccount: {
        type: Sequelize.UUID,
        field: 'idaccount',
      },
    },
    {
      freezeTableName: true,

      timestamps: false,

      createdAt: false,

      updatedAt: false,
    }
  );
  Lecturer.associate = models => {
    Lecturer.belongsTo(models.Account, {
      foreignKey: 'idAccount',
    });
    Lecturer.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
  };

  return Lecturer;
};
