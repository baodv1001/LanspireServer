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
      isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'isdeleted',
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
    Lecturer.belongsTo(models.User, {
      foreignKey: 'idUser',
    });

    Lecturer.belongsToMany(models.Class, {
      through: models.Teaching,
      foreignKey: 'idLecturer',
      onDelete: 'SET NULL',
    });
  };

  return Lecturer;
};
